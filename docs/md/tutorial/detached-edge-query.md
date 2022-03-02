# Detached analytics on edge devices

In the tutorial [Analytics on edge devices](edge-query.md) you learned
how to run *edge queries* on edge devices.

In this section you will learn how to run edge queries in **store and
forward (SNF)** mode. When running in SNF mode an edge device doesn't
need to be connected to the server at all times. It will buffer up
locally to a configurable number of elements over a configurable time
period. When the time period expires it will attempt to connect to the
server and try to forward these values through a configurable function
on the server.

In addition, store and forward can be configured to never send
streams to the server allowing for a fully detached execution of
queries.

To understand SNF you will now learn how to configure an edge device
to run edge queries on start.

> [note]   **Note:** This section assumes that you have at least one edge named
**edge1** connected. If you are running 'sandbox' in
studio.streamanalyze.com you always have a prestarted edge named
**edge1** connected; in sa.studio Desktop you have to start **edge1**
explicitly.

## Configuring store and forward

Store and forward has the following configurable options:

* `store-and-forward` (Required) - Name of the registered store and
  forward query, which is used for identifying the task for
  accessing data and for stopping the query.

* `store-and-forward-interval` - Number of Seconds
  between each forward attempt *north* to the SAS where the edge is
  registered. If not set then edge will attempt to forward once `buffer-size/2`
  elements are buffered.

* `buffer-size` (Default 1000) - Maximum number of elements to buffer
  between each forward attempt. If the stream produces more than
  `buffer-size` elements with the `store-and-forward-interval` the
  oldest values will be dropped. If `store-and-forward-interval` is
  not set edge will attempt to forward elements once `buffer-size/2`
  elements are buffered.

* `store-and-forward-storefn` (Default
  `stream.charstring.charstring.record.snf_publish_storer->boolean`) -
  The OSQL function to call in the server when requesting pending
  stored data from the edge.

* `store-and-forward-params` - Optional record with further parameters
to the `store-and-forward-storefn`.

* `store-and-forward-local` - true or false, when true the edge will
never try to forward streams to the server, i.e. it will only run in
the background locally. When set, only the `store-and-forward` option
has any effect.

These options are set in a record as the third argument to
`edge_cq`. For example, the following query declares a record that
will start an SNF named **forward1**, which uploads data every third
second and stores up to 100 elements
```LIVE
set :forward1 = {
  "store-and-forward": "forward1",
  "store-and-forward-interval": 3,
  "buffer-size": 100
}
```
We can use `:forward1` as SNF parameter `opts` to
`edge_cq(edge,cq,opts)`. For example, the following SNF query will
start `simstream(1)` and store up to 100 elements before sending them north
every 3 seconds:

> [note] **Note:** Unlike the regular behavior of `edge_cq()`, results
> from a store-and-forward query will not be visible until you subscribe to it.
> How to do this is described in the next section.

```LIVE
edge_cq("edge1","select simstream(1) limit 1000", :forward1);
```
### Access data from store and forward.

By default store and forward will simply publish the data on a
server-side *subscription* with the name
`<edgeid>-SNF-<store-and-forward-name>` in all uppercase. Let's look
at the data coming from our store and forward query:
```LIVE {"vis":"showLine"}
subscribe("EDGE1-SNF-FORWARD1");
```
The following CQ views the stream in real-time from the SAS:
```LIVE {"vis":"showLine"}
subscribe('edge1','forward1')
```
The following query returns all queries currently running on `edge1`
```LIVE
select r["requests"]
  from Record r
 where r in edge_status()
   and r["id"]="EDGE1"
```
You can stop an edge CQ using `cancel_edge_cq()`:
```LIVE
cancel_edge_cq("edge1","forward1");
```
Now look at the running queries again:
```LIVE
select r["requests"]
  from Record r
 where r in edge_status()
   and r["id"]="EDGE1"
```
## Changing the function used to forward the data to the server

By default the SNF publisher does not persist the data forwarded to
the server.  It is possible to create a CQ that runs a stream, does
some analytics over it, and finally stores the resulted events in an
stored OSQL function. However, usually you just want to save the data
on disk in a log file, or forward it on a **Kafka** or **MQTT**
topic. To control what to do with the output events from a CQ running
as SNF, you can specify a *storer function* via the
`store-and-forward-storefn` property. A storer function `snf` must
have the signature `snf(Stream s,Charstring edgeid, Charstring
flowname, Record params)->Object`. The result is ignored; the storer
function is a *sink*.


> [exercise] **Exercise:** Look at the source code for the function named
`snf_publish_storer`



### Using the built-in CSV storer function

Let's try using the built-in **CSV storer function**. Start by
creating a new option record:
```LIVE
set :forward2 = {
  "store-and-forward": "forward2",
  "store-and-forward-interval": 3,
  "store-and-forward-storefn": "snf_csv_storer",
  "buffer-size": 100
};
```
When using the CSV storer function each forward from the edge will
create a file under `sa_home()+"/logs/snf/<EDGE-ID>` for each forward
from the edge. To get the folder for `edge1` run:
```LIVE
get_snf_folder("edge1")
```
There is also a utility function where you can get all available files
using `get_snf_files`:
```LIVE
get_snf_files("edge1","forward1")
```
Let's start a store and forward with the CSV storer function:
```LIVE
edge_cq("edge1","select simstream(0.3) limit 1000", :forward2);
```
After a few seconds you should start getting some files from the
following call:
```LIVE
get_snf_files("edge1","forward2")
```
Each forward is tagged with a time stamp at the end of the filename.
To view the entire store and forward log for **forward2** on **edge1**
run:
```LIVE {"vis":"showLine"}
select vector of x
  from Vector x
 where x in get_snf_log("edge1","forward2");
```
As before you can cancel the store and forward query using
`cancel_edge_cq`:
```LIVE
cancel_edge_cq("edge1","forward2");
```
# Local store and forward

Sometimes it is desirable to run a query that never tries to forward
the data to a server. You might have a sink on the edge that will take
care of the data streams by storing them locally, sending them in a
queue to other programs or simply discards the output if your
query updates the local edge database.

Since you can always register a sink function that handles the output
of a CQ as the result of the query itself a local SNF query does not
need a storer function. However, you do need to add a field
`store-and-forward-local` to your options record. This option will
tell the edge to run this query and simply throw away the result. If
you wish to save the result to disk as a log file you can use
functions like `csv:write_file()` or `json:write_file()` as a sink in
the query to store the result.


### A local store and forward example

Start by creating a new option-record; now we only set the
`store-and-forward` identifier and set `store-and-forward-local` to true:
```LIVE
set :localForward = {
    "store-and-forward": "local-forward1",
    "store-and-forward-local": true
}
```
As an example, we produce a data flow named `my-flow` by a `publish`
sink for the edge query `simstream(0.02)` with SNF options
`:localForward`:
```LIVE
edge_cq("edge1", "select publish(simstream(0.02),'my-flow') limit 10000",
        :localForward);
```
On the SAS we can now subscribe to the published flow `my-flow` from `edge1`
by using `subscribe(Charstring edge, Charstring flow)`:
```LIVE {"vis":"showLine"}
subscribe("edge1","my-flow");
```
As usual you can use `cancel_edge_cq` to stop it:
```LIVE
cancel_edge_cq("edge1","local-forward1");
```
# Persistent edge queries

By now you have learned how to run regular edge queries with SNF. This
section describes how to create *persistent edge queries* that run
autonomously. Persistent edge queries are defined using the OSQL type
`EdgeQuery`. All instances of type `EdgeQuery` are always started when an
edge listener is started.

The type `EdgeQuery` has the propeties:

```
create type EdgeQuery;
create function name(EdgeQuery eq) -> Charstring key as stored;
create function statement(EdgeQuery eq) -> Charstring as stored;
create function options(EdgeQuery eq) -> Record as stored;
```


As the function names `name`, `statement`, and `options` suggest, the
properties of `EdgeQuery` are very similar to the arguments of
`edge_cq`. The main difference is that the property `name` is
essentially the id of the query when it runs autonomously on the edge.

When an edge starts it will go through all instances of `EdgeQuery`
and start them. If you dynamically create more `EdgeQuery` objects
during an interactive session they will be used at the next edge
restart. You can activate a persistent edge query `eq` by calling
`run_stored_edge_query(eq)`.

Documentation of properties of the type `Edgequery`:
```LIVE {"vis":"showMarkdown"}
select mddoc(f)
  from Function f
 where f in methods(typenamed("Edgequery"))
```

You can cancel a persistent edge query as usual with
`cancel_edge_cq()`. However if you do not want the query to run again
on the next restart of the edge you will have to update and save the
local database to remove the instance of `EdgeQuery`.


