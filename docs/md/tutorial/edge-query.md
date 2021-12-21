# Analytics on edge devices

So far the OSQL models in the tutorial were developed and run on an
sa.engine **stream server (SAS)** running on some computer accessed
from sa.studio. If you are running sa.studio Desktop the SAS will run
on your PC. If you are running the sa.studio 'sandbox' it will run in
a Docker container in some cloud. The computer where your SAS is
running is called the **server computer**.

> [note]   **Note:** Do not mix up the abbreviation *SAS* with the contemporary
concept [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service). A
SAS is simply an sa.engine server to which other sa.engine clients and
servers are connected. 

This tutorial will show how to develop and run models locally on edge
devices. To do this you need to first install an **edge client (EC)** on
your device. An EC is also an sa.engine system, but with more
limited capabilities than a SAS.

Once installed and started the EC can be **registered** in a
SAS so that sa.engine users and applications know about its
existence. The communication protocol between ECs and SASes
is internal to sa.engine so that users need not know any details.

The system supports a TCP based communication protocol out-of-the-box.
However, sa.engine is agnostic to the communication infrastructure and
several other communication protocols are available as
plug-ins. Furthermore, plug-ins for new ones can be implemented.

An EC can send up internal messages *north* to its SAS for evaluation,
thus acting as a client to the SAS. In particular it can send up a
message to register itself. It can also send up a message indicating
that it is ready to process local tasks from the server, in which case
the *state* of the EC is said to be **active**. Edge clients can also
be **inactive**, which means that they currently will not be able to
execute messages from the server, but they still can execute CQs
locally. They can also be **busy** when they cannot accept any new
tasks, usually because other tasks use all their resources.

We will first show how to run the model named `my_c_to_f` in [Saving
data and models](/docs/md/tutorial/save-database.md) in your SAS on
the server computer. Then we will do the same for an edge client
installed on an Android device.

Finally, we will develop a new model called `detect-shake` that uses
the accelerometer on the Android device.

## Edge clients on PCs

As a first step, we ship the model `my_c_to_f` to an edge client
running on the server computer.

In sa.engine Desktop the function call `start_edge('edge1')` will
start and register a new edge analyzer peer named `edge1` on your
server computer. However, this call is not allowed when you run the
'sandbox' in studio.streamanalyze.com. We have therefore already
started an edge named `edge1` there.

Now we can deploy the model `my_c_to_f` on `edge1` by evaluating:
```LIVE
deploy_model(["edge1"],"my_c_to_f");
```
The function returns the string `"EDGE1"` when the system has
successfully deployed the model `my_c_to_f` in the edge client named
`edge1`.

Now, if you click `server >` in sa.studio you get a pull-down menu to
choose which peer to send the CQs to. In this case the peer is either
the SAS (`server`) on your server computer or the new edge client
`edge1`. Choose `edge1` to drill down to `edge1`.

The function `this_peerid()` returns the name of the peer:
```LIVE {"peer":"Edge1"}
this_peerid()
```
It should return `"EDGE1"` if you have successfully drilled down to
the edge client `edge1` and `"SERVER"` is you are connected to your SAS.

Let's try running `ctof()` on `edge1`:
```LIVE {"peer":"Edge1"}
ctof(32)
```
You can also ship queries to edges from the stream server (or even
from other edges) by using the built-in function `edge_cq(Charstring
edge, Charstring cq) -> Stream`, which evaluates the CQ string `cq` on
`edge`.

For example, run this in the server:
```LIVE
edge_cq('edge1','ctof(72)')
```
Here the query `ctof(72)` is shipped to `edge1` for
evaluation and the result stream is shipped back
to the stream server for real-time visualization by sa.studio.

## Registering an Android edge client

This part of the tutorial needs an edge-device with audio
capabilities. The easiest way to get this is to download and run the
[Android Edge Client app](/docs/md/edge_devices/README.md) and
register it in your SAS under the name `android1`. You can
also install an edge client app on some other kind of device having
audio capabilities such as a laptop or a Raspberry pi. To learn how to
install on different devices take a look at [Edge
devices](/docs/md/edge_devices/README.md).

> [note]   **Note:** If you are running this tutorial in the 'sandbox' you should
go back to [Querying the microphone](/docs/md/tutorial/audiostream.md)
now and go through the steps there. 

We are now ready to deploy the `audio` model on your Android device.

In sa.studio on your PC drill down to the `android1` edge client and
evaluate:
```LIVE {"peer":"Android1"}
this_peerid()
```
The query will return the string `"ANDROID1"` if the device runs
the edge client app on your Android device.

You can now deploy the `audio` model on `android1` by calling the
function `deploy_model()` in your SAS:
```LIVE
deploy_model(["android1"],"audio")
```
It will return the string `"ANDROID1"` when the model has been
successfully deployed on the device. The `audio` model is now
permanently installed in the local edge client database on your
Android device.

You can now run `audio_band()` on your Android device by calling:
```LIVE {"peer": "android1", "vis":"showLine"}
audio_band(70, 700)
```
> [exercise] **Exercise:** Restart the edge client on your device and verify
 that the function `audio_band()` works as before.


# Developing the detect-shake model

In this section we will develop a model directly on your edge device.
The following will be covered:

- Finding out what signals an edge device has and what registered edge
  devices have a specific signal.

- Running a CQ producing a stream of raw data from a
  signal on an edge device.

- Using the raw signal stream in a model running on the device
  to detect whether it is shaking or not.


## Device Signals

Before defining a model on an edge device to analyze signal readings,
we first need to obtain information about what signals are available
on your device. Then we can use this information to formulate CQs and
define models analyzing signals on it.

Run the following query to get the available signals on you Android
device:

```LIVE {"peer":"android1"}
signals()
```
The query returns a set of the names of all signals on the device.

Here one of the signals is named "accelerometer". To ask what devices
have an accelerometer you can issue this query to the SAS:

```LIVE
edges_with_signal("accelerometer")
```
It returns a vector of all registered edges having an accelerometer.

## Analyzing the accelerometer stream

In order to get a stream of data from a signal on a device the
function `signal_stream(Charstring sn) -> Stream of Vector` is called.  It
returns a stream of measurements for the signal named `sn` on the
device.  For example, to retrieve the accelerometer readings on edge
`android1` we can send it this CQ visualized as a line plot:

```LIVE {"vis":"showLine","peer":"android1"}
signal_stream("accelerometer")
```
A stream of 3D gravitation vectors are returned. Test it by 
rotating the device. 

> [exercise] **Exercise:** Use the gyroscope instead of the accelerometer.


The gravitational acceleration can be calculated by taking the
magnitude of each gravitation vector in the stream from the
accelerometer:
```LIVE {"vis":"showLine","peer":"android1"}
select Stream of sqrt(sum(g .^ 2))
  from Vector of Number g
 where g in signal_stream("accelerometer")
```
> [note]   **Note:** When the device is resting the query returns numbers close
to the earth's gravitational acceleration (9.81). How close depends on
the precision of the sensor. 

The CQ above will be used in the `detect-shake` model. First we
define a helping function `gravity_acceleration()`:
```LIVE {"peer":"android1"}
create function gravity_acceleration() -> Stream of Number 
  as select Stream of sqrt(sum(g .^ 2))
       from Vector of Number g
      where g in signal_stream("accelerometer")
```
One way to get a sense on how much a device is shaking is by
calculating a stream of running standard deviations over sliding
windows in `gravity_acceleration()`.

*Example:*
```LIVE {"vis":"showLine","peer":"android1"}
stdev(winagg(gravity_acceleration(),50,5))
```
The more the device is shaking, the larger standard deviation.

This stream of standard deviations will serve as the main part of the
`detect-shake` model. The following CQ returns the **shake state** `1`
when the device shakes (standard deviation larger than 5) and `0`
otherwise, visualized as a line plot:
```LIVE {"vis":"showLine","peer":"android1"}
select Stream of shakes
  from Number shakes, Number elem
 where elem in stdev(winagg(gravity_acceleration(),50,5))
   and shakes = case when elem > 5 then 1 
                     else 0 end
```
To investigate how the shake state depends on parameter settings, we
define a function `shake_state()` taking the standard deviation
threshold, window size, and window slide as arguments:
```LIVE {"peer":"android1"}
create function shake_state(Number threshold, Number size, Number stride)
                          -> Stream of Number
  as select Stream of shakes
       from Number shakes, Number elem
      where elem in stdev(winagg(gravity_acceleration(),size,stride))
        and shakes = case when elem > threshold then 1 
                          else 0 end
```
*Example:*
```LIVE {"vis":"showLine","peer":"android1"}
shake_state(5, 50, 5)
```
We only need to know when the shake state changes, which will
drastically reduce the stream volume by only emitting values when it
changes. For this we can use the system function:

```
changed(Stream s) -> Stream
```

It removes from stream `s` elements that are equal to their
predecessors.

*Example:*
```LIVE {"vis":"showLine","peer":"android1"}
changed(shake_state(5, 50, 5))
```
> [exercise] **Exercise:** Investigate how `shake_state(threshold,size,stride)`
behaves with varying `threshold`, `size`, and `stride`. What is the
effect of a smaller window? What is the effect of a larger stride?


After some experiments we define the final function
`shakes(threshold)` with fixed size and stride as:
```LIVE {"peer":"android1"}
create function shakes(Number threshold) -> Stream of Number
  as changed(shake_state(threshold, 50, 5));
```
We are now ready with the local shake detection model running on a single 
Android device! 

Try it:
```LIVE {"peer":"android1"}
shakes(5)
```





> [exercise] **Exercise:** Create a model named `detect-shake`
and store in its master file the functions `gravity_acceleration`,
`shake_state`, and `shakes`.


In the [next tutorial](/docs/md/tutorial/database.md) we show how to store and query
data in the built-in object-oriented database system.
