# Data reduction tutorial

Here are a few examples of data reduction.

Note that data reduction can be easily performed on edge devices.

For the examples below, a simulated source stream `simstream(Number pace)->Stream of Real` built into SA Engine is used.

Of course, a real sensor stream can be used instead of the simulated stream.

Look at the raw output of `simstream(.1)`:

```LIVE
simstream(.1);
```

`simstream(.1)` emits a new number every .1 seconds.


## Count based sampling

Perhaps the most obvious way to reduce the data rate is to sample the output of `simstream(.1)`. One way of sampling is to use the function `winagg(Stream s, Number size, Number stride)->Stream of Vector`. Each `stride` readings, `winagg()` emits a window of the last `size` seen readings. By choosing `size < stride`, `winagg()` will sample the stream:

```LIVE
winagg(simstream(.1), 1, 10);
```

The above example samples every tenth value of `simstream()`. 

Note that `winagg` emits a vector of the last `size` seen elements.

> [exercise] **Exercise:** Try setting a larger value of `size`!

Use vector dereference to take the first value. Vectors in OSQL are indexed starting with 1:

```LIVE
select v[1]
  from vector v
 where v in winagg(simstream(.1), 1, 10)
```

## Time based sampling

In certain applications, it is meaningful to form windows based on time. Similar to `winagg`, the OSQL function `twinagg(Stream of Timeval s, Number size, Number stride)->Stream of Timeval of Vector` emits a window of the last `size` seen readings (in seconds) each `stride` readings (in seconds). Note that `twinagg` requires `s` to be of a stream of timeval, i.e. a time stamped stream.

OSQL has several time functions. It is easy to timestamp any stream using `ts()`:

```LIVE
ts(simstream(.1));
```

Now that we have a time stamped stream, `twinagg` can be applied:

```LIVE
twinagg(ts(simstream(.1)), 1, 1);
```

The above example, each window contains the values emitted by `simstream()` during the last second (size=1), and the stride is also one second, so all values emitted by `simstream()` are present in the output.

Note how `twinagg` forms a tuple of (timestamp, readings).

Take the first sample from each second:

```LIVE
select value(tsv)[1]
  from timeval of vector tsv, stream of timeval s
 where s = ts(simstream(.1))
   and tsv in twinagg(s, 1, 1);
```

Note that `timeval` contains a timestamp, which can be accessed with `timestamp(<timeval>)`, and a value, which can be accessed with `value(<timeval>)`.  

So if we parameterize the example above with a `streamrate` and a `samplingrate` we can adjust the frequency of the stream and how often the stream is sampled:

```LIVE
select timestamp(tsv), value(tsv)[1]
  from Timeval of Vector tsv, stream of timeval s,
       number streamrate, number samplingrate
 where streamrate = .02 and samplingrate = .5
   and s = streamof(ts(simstream(streamrate)))
   and tsv in twinagg(s, samplingrate, samplingrate);
```


### On-device timebased sampling

To illustrate how the technique showed in the previous section can be applied to real streams from sensors we are going to show how to sample readings from the accelerometer of an Android device.

Connect an Android phone using the online getting started guide.

Ensure you have a reading from the accelerometer by running the following query.

> [tip] **Important:** All queries in this subsection should be run on the Android device by selecting the device name in the device list at the bottom of the query window.

```LIVE {"vis": "Line plot"}
signal_stream("accelerometer");
```

Now you can create a function that samples the accelerometer and takes the samplingrate as input.

```LIVE
create function sample_accelerometer(Number samplingrate) -> Vector
  as select [timestamp(tsv), value(tsv)[1]]
       from Timeval of Vector tsv, stream of timeval s,
            stream of vector sov
      where sov = signal_stream("accelerometer")
        and s = streamof(ts(sov))
        and tsv in twinagg(s, samplingrate, samplingrate);
```

The function returns a vector with the timestamp and the sampled reading of the three accelerometer values. Try the sampling function with one second sampling rate.

```LIVE
sample_accelerometer(1.0);
```

You can see on the timestamps that the stream is sampled every second. To plot the sampled values you can create a wrapper function that simply extracts the readings and drops the timestamps.

```LIVE
create function sample_accelerometer_values(Number samplingrate) -> Vector
  as select sample_accelerometer(samplingrate)[2];
```

Try the value-sampling function and see how the accelerometer value plot is updated every .5 seconds. 

```LIVE {"vis": "Line plot"}
sample_accelerometer_values(0.5);
```

## Statistics over streams

To take the moving average over streams you need to first aggregate measurements into windows with `winagg()`.

```LIVE {"vis": "Line plot"}
mean(winagg(simstream(0.01),20,1));
```

The example above computes the mean of the last 20 values (size=20) every time a new value is emitted by `simstream()` (stride=1).

Other aggregate functions, such as `stdev()` or `sum()`, work the same way.

```LIVE {"vis": "Line plot"}
select mean(v), stdev(v), sum(v)
  from Vector of number v
 where v in winagg(simstream(0.01),20,1);
```

### Vector-valued streams

For vector-valued streams you have to extract each dimension as a separate stream.

First we create a function that returns a simulated vector stream.

```LIVE
create function my_3d_vector_stream() -> Stream of Vector of Number
  as pivot_streams([simstream(0.05), heartbeat(0.05), simstream(0.06)]);
```

Since the function returns a three-dimensional stream `winagg()` will produce a window vector where each element in the vector is one 3d vector emitted from `my_3d_vector_stream()`. Since we want to do statistics for each dimension and not over each 3d value vector, we need to transpose the result from `winagg()` to get one vector for each dimension.

> [note] **Note:** In this case `winagg()` produces a `Vector of Vector of Number`, which is the same as a `Matrix`, and therefore the result can be transposed to get the values for each dimension in separate vectors.

> [exercise] **Example:** Let's say that we have a stream of vectors $[a,b,c]$. If we apply `winagg()` with size $N$ on this stream we get
> $$ M = \begin{bmatrix}
[a_1 & b_1 & c_1] \\
[a_2 & b_2 & c_2] \\
 & \vdots & \\
[a_N & b_N & c_N]
\end{bmatrix} $$
>
> If we transpose this we get all values for each dimension in a separate vector.
> $$ \mathrm{T = transpose}(M) = \begin{bmatrix}
[a_1 & a_2 & ... & a_N] \\
[b_1 & b_2 & ... & b_N] \\
[c_1 & c_2 & ... & c_N]
\end{bmatrix} $$
>
> This means we can now do statistics over $a$, $b$ or $c$ by operating on their respective vectors $T(1)$, $T(2)$ and $T(3)$. 

```LIVE {"vis": "Line plot"}
select mean(t[1]), mean(t[2]), mean(t[3])
  from Matrix m, Matrix t
 where m in winagg(my_3d_vector_stream(),20,1)
   and t = transpose(m);
```

### On-device statistics over streams

Connect an Android phone to this federation in the same way as you did in the [On-device timebased sampling](#on-device-timebased-sampling) section.

Ensure you have a reading from the accelerometer by running the following query.

> [tip] **Important:** All queries in this subsection should be run on the Android device by selecting the device name in the device list at the bottom of the query window.

```LIVE {"vis": "Line plot"}
signal_stream("accelerometer");
```

Now you can take the concepts used in the [Vector-valued streams](#vector-valued-streams) section and create a function that does some statistics on the accelerometer readings.

```LIVE
create function acc_mean_stream(Number winsize)
  -> Stream of Vector of number
as select [mean(t[1]), mean(t[2]), mean(t[3])]
  from Matrix m, Matrix t
 where m in winagg(signal_stream("accelerometer"),winsize,1)
   and t = transpose(m);
```

Now you can get smoothed accelerometer readings by calling `acc_mean_stream()` with some window size.

```LIVE {"vis": "Line plot"}
acc_mean_stream(20);
```
