# Fusion models

So far we have developed data stream models either in the stream
server or in an edge client. This section will outline how to define a
**fusion model** that combines in the stream sever data streams from
several edge clients running the `detect-shake` model.

The tutorial assumes that there are at least two edge clients having
accelerometers registered in the stream server. For example, it can be
two Android devices or an Android and a MangOH Red device.

A fusion model will be developed that detects when all the devices
with an accelerometer are shaking at the same time.

## Post-processing the detect-shake edge model

In order for the stream server to run a fusion query to
detect when all the devices are shaking at the same time, a
post-processing function for the `detect-shake` edge model is
needed. This function adds to the result stream of `shakes()` a
time-stamp and the peer id where it is running. The post-processing
produces a stream of triples:

```
[timestamp, peer_id, shake_status]
```

Drill down to the edge device `android1` and define the following
function:
```LIVE {"peer":"Android1"}
create function detect_shake(Number threshold) -> Stream of Vector
  as select Stream of [now(),this_peerid(),sh]
       from Number sh       
      where sh in shakes(threshold)
```
Test it:
```LIVE {"peer":"Android1"}
detect_shake(5)
```
> [exercise] **Exercise:** Add the function `detect_shake(threshold)` to the
master file for the model `detect-shake`.


## Deploying detect-shake on edges

Since `detect-shake` requires an accelerometer on the device the model
should be deployed only on edges with an accelerometer. This can be
done with `deploy_model()` together with `edges_with_signal()` as
follows:
```LIVE
deploy_model(edges_with_signal('accelerometer'), 'detect-shake');
```
Now that the `detect-shake` model is installed on all edges with an
accelerometer the function `detect_shake(threshold)` can be run on all
of the edges having an accelerometer with:
```LIVE
edge_cq(edges_with_signal("accelerometer"), "detect_shake(5)");
```
> [note]   **Note:** `edge_cq(Vector of Charstring edges , Charstring q) ->
Stream` will send the same edge query to each edge in the vector
`edges` and then merge the result from all of the edges into one
stream on the server. 

##Stream of shake status vectors

In the fusion model in the stream server we need to compare the latest
values from each edge model running `detect_shake(5)` to see whether
they all are shaking at the same time, thus having shake status `1`. To
simplify this we first construct a **shake status vector** whose
elements are `1` for the shaking units and `0` otherwise:
```LIVE
select pivot_events(edges, merged)
  from Vector of Charstring edges, Stream of Vector merged
 where edges = edges_with_signal("accelerometer")
   and merged = edge_cq(edges, "detect_shake(5)")
```
The important part of the query is the function `pivot_events()` that
has the signature:

```SQL
pivot_events(Vector variables,Stream of Vector s) -> Stream of Timeval of Vector
```

The function transposes a stream `s` of event triples 
`[timestamp, variable, value]` into a stream of ** Timestamped status vectors** 
`Timeval of vector` with one value for each variable in `vars`, `[V1,...,Vk]`.
In our example the variables are edge identifiers.

Package the query into a function `same_time_shake_status()`:
```LIVE
create function same_time_shake_status() -> Stream of Timeval of Vector
   as select pivot_events(edges, merged)
        from Vector of Charstring edges, Stream of Vector merged
       where edges = edges_with_signal("accelerometer")
         and merged = edge_cq(edges, "detect_shake(5)")
```
Test it:
```LIVE
same_time_shake_status()
```
## The final fusion model

The status vectors in the stream `same_time_shake_status()` contains a
`1` or a `0` for each edge device indicating whether it is shaking or not.
Therefore all edges are shaking at the same time when the sum of the
status vector elements is equal to its dimension. We define
`same_time_shakes()` as:
```LIVE
create function same_time_shakes() -> Stream of Timeval of Charstring
   as changed(select Stream of ts(ts,msg)
                from Charstring msg, Vector status, Timeval ts
               where ts in same_time_shake_status()
                 and status = value(ts)
                 and msg = case when sum(status)=dim(status) then "Shaking"
                                else "Calm" end)
```
Test it in the stream server:
```LIVE
same_time_shakes()
```


> [exercise] **Exercise:** Save the definitions of `same_time_shake_status()` and
`same_time_shakes()` in a new model named `shake-fusion`.



