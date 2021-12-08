# Trigonometrics over streams

In this tutorial we use [**Multi
plot**](/docs/md/vis/multiplot.md) for flexible visualization.  

There is the usual library of trigonometric functions included in
sa.engine, for example:

```LIVE {"vis":"automatic"}
{'sa_plot': 'Line plot', 'memory': 200};
select sin(x), cos(x)
  from Number x
 where x in 10*heartbeat(.02)
```

Trigonometric functions lend themselves to algebraic manipulation over
streams, like this amplitude modulation example:

```LIVE {"vis":"automatic"}
{'sa_plot': 'Line plot', 'memory': 200};
select sin(x)*sin(x/30), cos(x)*cos(x/30)
  from Number x
 where x in 20*heartbeat(.01)
```

which is more appealing in parametric coordinates (scatter plot):

```LIVE {"vis":"automatic"}
{'sa_plot': 'Scatter plot', 'memory': 1000};
select sin(x)*sin(x/30), cos(x)*cos(x/30)
  from Number x
 where x in 10*heartbeat(.005)
```

Note how each function is applied to a number and not a stream.  The
query optimizer also allows applying functions on entire streams, for
example:

```LIVE {"vis":"automatic"}
select sin(s)
  from Stream of Number s
 where s=10*heartbeat(.01)
```

can also be expressed as:

```LIVE {"vis":"automatic"}
sin(10*heartbeat(.01))
```

The following two queries seem to be defined in the same way, but they
do give rise to different behavior:

```LIVE {"vis":"automatic"}
{'sa_plot': 'Scatter plot', 'labels':['x','y'], 'memory': 1000};
pivot_streams([sin(10*heartbeat(.01)),
               cos(10*heartbeat(.01))])
```

```LIVE {"vis":"automatic"}
{'sa_plot': 'Scatter plot', 'labels':['x','y'], 'memory': 1000};
select sin(x), cos(x)
  from Number x
 where x in 10*heartbeat(.02)
```
> [note]   **Note:** The first query differs slightly since it uses two
*independent* streams together with [pivot
streams](/docs/md/tutorial/pivot_streams.md), This means that we
essentially have two streams where `sin` and `cos` are applied to
their own stream over time (heartbeat) before they are merged.

In the second example we apply `sin` and `cos` to the `x` from the
*same* `heartbeat` stream. 

More examples of how we can specify multiple streams in a query:

```LIVE {"vis":"automatic"}
{'sa_plot': 'Line plot', 'memory': 200};
select pivot_streams([streamof(sin(x)), streamof(sin(x+pi()))])
  from Stream of Number hb,
       Number x
 where hb = 10*heartbeat(.02)
   and x in hb
```

```LIVE {"vis":"automatic"}
{'sa_plot': 'Bar plot', 'memory': 200};
pivot_streams(select Vector of sin(i/3 + 3*heartbeat(.03))
                from Integer i
               where i in iota(0,29)
               order by i
             )
```

















