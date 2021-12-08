## Data stream wrappers

A *meta-data model* (or ontology) is a database describing properties
of a particular kind of data. The sa.engine system has a built in
*sensor meta-data model* called the *sensor ontology* that describes
properties common to all kinds of sensors.

Sensor data sources continuously produce *raw data streams*. A raw
data stream consists of *raw data stream objects* generated over time
as sensors produce new measurements (observations) of its physical
environment. A raw data stream object is a data structure holding one
or several measured variable values called **signals**.

The OSQL type `Signal` represents data streams extracted from a raw
data stream source. A signal stream can be seen as a variable *V* that
continuously gets new values $ V_t $ over time *t*. Each signal object
`s` has the following general meta-data properties:

- `name(s)`: The signal's name; i.e. the name of the variable it
  represents, e.g. `'temperature'`. Signal names are unique.

- `doc(s)`: Documentation of the signal.

- `options(s)`: Additional descriptions of the signal represented as a
  record (JSON object).

- `signal_stream(s)`: A stream of objects of measurements from the
  signal.

- `ts_signal_stream(s)`: A stream of timestamped objects of
  measurements from the signal.

A **data stream wrapper** is a meta-model (ontology) representing
properties of a particular kind of sensor data source. A data stream
wrapper maps raw data streams into meaningful signal streams. The
models are defined by OSQL types and functions.

For example, the [CANBUS](https://en.wikipedia.org/wiki/CAN_bus)
interface standard is commonly used for extracting different kinds of
data streams from vehicles and machinery. In this tutorial we will
show how to define a *CANBUS wrapper* describing streams produced by a
CANBUS interface for a particular kind of equipment.

The signals defined in a particular data stream wrapper are defined as
subtypes of type `Signal`.  For example, CANBUS signals are described
by objects of type `Can:signal` under type `Signal`.

## The CANBUS wrapper

Data sources based on the CANBUS interface standard produce raw data
streams of *CANBUS frames* represented as vectors `[ts, cid, fid, pl]` where:

- `ts` is a *time stamp* for the frame.

- `cid` is an integer *CANBUS identifier* for the CANBUS interface on
  the device producing the frame. There may be several such
  interfaces enumerated from 0 and up.
 
 - `fid` is an integer *frame identifier*. The frame identifier
   uniquely identifies frames per CANBUS interface. The same `fid` can
   represent different measurements in different CANBUS interfaces.
 
 - `pl` is the *payload* of the frame. It contains values of one or
   several measurements (i.e. signals) produced by the frame. The
   payload is represented as an 8-byte binary field. A single payload
   may contain values of several signals packed into the same 8-byte
   field.

> [exercise] **Exercise:** Load the CANBUS wrapper into the database by clicking
`<>` -> `System models` -> `canbus` -> <img
src="/docs/images/load.png" height="20">.


The CANBUS wrapper includes a CANBUS simulator function
`can:simulated_bus()` that produces a random raw CANBUS stream at a
predefined pace of 10HZ. 

*Example:*
```LIVE
can:simulated_bus()
```
> [exercise] **Exercise:** Inspect the source code of `can:simulatedstream` to
understand how it works.


Meta-data for signals from CANBUS data sources are represented as
objects of type `Can:signal`. The following functions are defined for
describing CANBUS signals in addition to the properties of its
super-type `Signal`:

- `cid(s)` is the CANBUS interface identifier used for producing the
  raw CANBUS stream where signal `s` is extracted.
    
- `fid(s)` is the identifier of the CANBUS frame whose payload is
  producing values of `s`.

- `decoder(s)` in an OSQL function `dec(pl,param)` used for computing
  the signal's value from the frame's payload `pl` and an optional
  parameter `param` stored in `params(s)`.

To describe a particular CANBUS data source on some device you have to
create new objects of type `Can:signal` and set the values of its
properties. This is done with the `create Can:signal` statement.

*Example:*
```LIVE
create Can:signal(name, doc, cid, fid, decoder) instances
('s', 'Speed of vehicle', 1, 3, #'can:whole');

```

> [note]   **Note:** The notation `#'can:whole'` represents the unique function
named `can:whole`. An error is raised if no such function exists. 

Now we can observe how the signal varies over time based on the
simulated CANBUS stream:

```LIVE
ts_signal_stream(signal_named('s'))

```

> [exercise] **Exercise:** How do you get the corresponding non-timestamped stream?


> [note]   **Note:** If there are errors in your code you can use the `rollback`
command to undo all database updates so far in the session. Then you
can correct and re-run the model definitions. However, in the free web
based *sandbox* version of sa.studio you must first issue the call
`autocommit(false)` to enable `rollback` (see [Undo
changes](/docs/md/tutorial/save-database.md#transactions)). 

You can define several CANBUS signals with the same `create
Can:signal` statement.

*Example:*
```LIVE
create Can:signal(name, doc, cid, fid, decoder, params) instances
('t', 'Engine temperature', 0, 2, #'can:unpack', 'i06'),
('p', 'Engine pressure',    0, 2, #'can:unpack', 'z06u08');

```
The decoder function `can_unpack(pl,f)` extract a signal's value from
payload `pl` according to format `f`. For example, format `'i06'`
means that the value is an signed integer occupying 6 bits, while
`'z06u08` picks bits 7-15 as an unsigned integer.

The function `can:signal_bus(sigs)` returns for a given names `sigs` a
stream of vectors `[ts,ns,v]` where `v` is the measured value of a
signal named `ns` in `sigs` at time `ts`.

*Example:*
```LIVE
can:signal_bus(['t','p','s']);
```

We call this kind of stream of time stamped signals with corresponding values a
*bus stream*.

You can also get a *signal stream* as a stream of vectors of the
latest values of signals `t`, `p`, and `s` by the query:

```LIVE
can:signal_stream(['t','p','s']);

```

A time stamped signal stream is produced by:

```LIVE
can:ts_signal_stream(['t','p','s']);
```

To find the names of all signals in your model call:
```LIVE
signals()

```


The default source of the CANBUS wrapper is defined as the function
`can:simulated_bus` that simulates the raw CANBUS stream. You can
change it by resetting the value of function `bus(wt)` for the signal
type `Can:signal`.

*Example:*
```
set bus(typenamed('Can:signal')) = #'can:my_simulated_bus';

```

Here the function `can:my_simulated_bus()->Vector` can implement, e.g. an
interface to a customized CANBUS interface.


> [exercise] **Exercise:** Make your own `my_simulated_bus` to fit your
application and assign as source to "Can:signal".



Physical CANBUS interfaces are hooked up to the CANBUS wrapper by
defining their implementation as functions reading physical CANBUS
interfaces.

In the [next tutorial](/docs/md/tutorial/audiostream.md) it is shown how
continuous queries can be used for analyzing microphone streams.
