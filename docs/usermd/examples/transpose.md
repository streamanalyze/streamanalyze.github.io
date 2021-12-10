# Transposing a window to apply aggregate function over each measurement

When working with sensor data the format is usually on the form `[p1,p2,p3,...pn]`. Let's start by creating a fake sensor stream where each element in the stream consists of thee measurements:

```LIVE
create function my_sensor() -> Stream of Vector of Number
  as select Stream of [cos(x),sin(x)]
       from Number x
      where x in heartbeat(0.001);
```

```LIVE {"vis":"automatic"}
select my_sensor() limit 200;
```

We can form a window over this stream by applying `winagg(Stream, Number size, Number slide)` over the stream. This will result in a `Stream of Vector of Vector`:

```LIVE
select winagg(my_sensor(),50,10) limit 1
```

This data has a window with the format:

```
[
    [x, y],
    [x, y],
    [x, y],
    [x, y]
    ...
]
```

```LIVE
select transpose(winagg(my_sensor(),50,10)) limit 1;
```

If we'd like to calculate the stdev of all `cos(x)` and `sin(x)` in the window one way is to do the following query;

```LIVE {"vis":"automatic"}
select [mean(x), mean(y)]
  from Number x, Number y, Vector of Vector window
 where window in winagg(my_sensor(),50,10)
   and x = stdev(select v[1]
                  from Vector of Number v
                 where v in window)
   and y = stdev(select v[2]
                  from Vector of Number v
                 where v in window)
```

An alternative way to do the query above is to use `transpose(Vector of Vector v)`, this will make each index `i` in the window contain a vector with only `pi`:

```
[
    [x1, x2, x3, ...,xn]
    [y1, y2, y3, ...,yn]
]
```

We can now apply `stdev` like this:

```LIVE {"vis":"automatic"}
select [stdev(windowT[1]), stdev(windowT[2])]
  from Vector of Vector windowT
 where windowT in transpose(winagg(my_sensor(),50,10))
```