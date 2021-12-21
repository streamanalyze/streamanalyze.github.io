# Working with several streams in a query

In this section we will go through how to use one of the stream
merging operators `pivot_streams` to combine several streams in a
query. This tutorial might help you if you are working with streams of
several signals and would like to combine and compare them.

## Pivot streams

The function `pivot_streams` transforms a vector of streams $ VS $ into
a *pivoted* stream of vectors $ PS $ where each element $ PS_i $ is the
most recently received value in stream $ VS_i $.

```LIVE
doc("pivot_streams")
```

Let's start with a *degenerate* example where we only merge one stream:

```LIVE {"vis":"automatic"}
select pivot
  from Stream of Vector pivot
 where pivot in pivot_streams([simstream(.02)])
```

Now let's expand this example by pivoting two streams:

```LIVE
select v
  from Stream of Vector pivot, Vector of Stream vs, Vector v
 where pivot = pivot_streams(vs)
   and vs = [1+simstream(0.02), 2+simstream(.2)]
   and v in pivot
 limit 14
```

> [note]   **Notice** that the first vector contains a `null` value. This is
because the pivoted stream had not received any value from stream 2
when it received the first value from stream 1.  This can be avoided
by using a pivot streams variant that takes an extra argument being
the initial vector in the result stream: 

```LIVE {"vis":"Text"}
select v
  from Stream of Vector pivot, Vector of Stream vs, Vector v
 where pivot = pivot_streams(vs, zeros(dim(vs)))
   and vs = [1+simstream(0.02), 2+simstream(.2)]
   and v in pivot
 limit 14
```

The following is an example of a more advanced stream pivot:

```LIVE {"vis":"showLine"}
select pivot
  from Stream of Vector pivot,
       Vector of Stream vs,
       Stream heartbeat_mod,
       Stream fast_heartbeat_mod
 where pivot = pivot_streams(vs, zeros(dim(vs)))
   and vs = [ 
              simstream(0.02), 
              3+simstream(.2), 
              heartbeat_mod, 
              fast_heartbeat_mod 
            ]
   and heartbeat_mod = 1 - 2*mod(heartbeat(1), 2)
   and fast_heartbeat_mod = mod(round(10*heartbeat(.1)), 2)
```


### Arithmetics on combined streams!

If you want to run arithmetics on pivoted streams you first need
to extract the vectors from the pivoted stream. This is done with the
line `v in ps` in the query below.

```LIVE {"vis":"automatic"}
select v[1]*v[4] + v[3]*10, v[4], v[2]
  from Stream of Vector ps,
       Vector of Stream vs,
       Stream hbmod,
       Stream hbmodfast,
       Vector of Number v
 where ps = pivot_streams(vs, zeros(dim(vs)))
   and vs = [simstream(0.02), 3+3*simstream(.2), hbmod, hbmodfast]
   and hbmod = 1 - 2*mod(heartbeat(1), 2)
   and hbmodfast = mod(round(10*heartbeat(.1)), 2)
   and v in ps
```

> [note]   **Note:** when working with **in** over streams the order of the
[predicates](/docs/md/osql/queries.md#predicates) matters. All
variables used in the **in** statement needs to be bound. For instance
the following query will fail because the query optimizer cannot
determine the value of `vs` since `hbmodfast` is defined **after** the
`and in sv` line. 

```LIVE
select v[1]*v[4] + v[3]*10, v[4], v[2]
  from Stream of Vector sv,
       Vector of Stream vs,
       Stream hbmod,
       Stream hbmodfast,
       Vector of Number v
 where sv = pivot_streams(vs, zeros(dim(vs)))
   and vs = [simstream(0.02), 3+3*simstream(.2), hbmod, hbmodfast]
   and hbmod = 1 - 2*mod(heartbeat(1), 2)
   and v in sv
   and hbmodfast = mod(round(10*heartbeat(.1)), 2)
```

Let's smooth that `v[2]`

```LIVE {"vis":"automatic"}
select v[1]*v[4] + v[3]*10, v[4], mean(win)
  from Stream of Vector sv,
       Vector of Stream vs,
       Stream hbmod,
       Stream hbmodfast,
       Vector of Number v,
       Vector of Number win
 where sv = pivot_streams(vs, zeros(dim(vs)))
   and vs = [simstream(0.02), winagg(3+3*simstream(.2),10,1), 
             hbmod, hbmodfast]
   and hbmod = 1 - 2*mod(heartbeat(1), 2)
   and hbmodfast = mod(round(10*heartbeat(.1)), 2)
   and v in sv
   and win = v[2]
```

Hopefully these short examples has made you understand how you can
combine streams using pivot streams. 

The [next tutorial](/docs/md/tutorial/data-stream-wrappers.md) shows how to develop
**data stream wrappers** to enable easy access and understanding of
external data streams by defining meta-data (ontologies) describing
properties of the streams.
