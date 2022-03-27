# Conditional statistics on multi-valued streams

To show statistics of signal streams you can use the `twinagg()` function with a predicate parameter.

```OSQL
create function twinagg(Stream of Timeval s, Number size, Function pred)
                      -> Stream of Timeval of Vector
 /* Stream of time windows over stream `s` represented as
     time stamped vectors where:
     `size` is the window size in seconds
     `pred` is a test function returning true if the window should be emitted */

create function twinagg(Stream of Timeval s, Number size, Function pred, Vector args)
                      -> Stream of Timeval of Vector
 /* Stream of time windows over stream `s` represented as
     time stamped vectors where:
     `size` is the window size in seconds
     `pred` is a test function returning true if the window should be emitted
     `args` is a vector containing any additional arguments to the function pred */
```

The first version takes a stream of timestamped values, the window size (in seconds) and a predicate function. It produces a window of the values within the latest time window and if the predicate function evalues to true then the window is emitted.

The second version also takes a vector of arguments for the predicate function.

## First example

The simplest predicate function would be a function that always returns true.

```LIVE
create function always_true(object o) -> boolean
  as select 1 = 1;
```

We can create a function that mimics the readings from some signal.

```LIVE
create function signal_1() -> stream of timeval
  as select stream of tt
       from timeval tt
      where tt in [ts(|2022-03-07T23&#58;10&#58;17.9Z|,1),
                   ts(|2022-03-07T23&#58;10&#58;18.0Z|,2),
                   ts(|2022-03-07T23&#58;10&#58;18.1Z|,3),
                   ts(|2022-03-07T23&#58;10&#58;18.2Z|,4),
                   ts(|2022-03-07T23&#58;10&#58;18.3Z|,5),
                   ts(|2022-03-07T23&#58;10&#58;18.4Z|,6),
                   ts(|2022-03-07T23&#58;10&#58;18.5Z|,7),
                   ts(|2022-03-07T23&#58;10&#58;18.6Z|,8),
                   ts(|2022-03-07T23&#58;10&#58;18.8Z|,9),
                   ts(|2022-03-07T23&#58;10&#58;18.9Z|,10)];
```

The function above emits a stream of timestamped values 1 through 10 with timestamps ~0.1 seconds apart.

```LIVE
signal_1();
```

We can now illustrate how `twinagg()` works by feeding it with the values from `signal_1()` and limit the time window to 0.5 seconds. This means that only the values from the last 0.5 seconds will be present in the window. We use the predicate function `always_true()` so all timestamped values in the stream will generate an output.

```LIVE
twinagg(signal_1(), .5, #'always_true');
```

You see that the above call to `twinagg()` emits a result for each timestamp since the predicate function always evaluates to true. Only the values received the last 0.5 seconds are included in each result.


## Simple predicate function

To illustrate `twinagg()` further we can create a new predicate function that only returns true if the value exceeds some threshold.

```LIVE
create function threshold(Timeval of Number tn) -> boolean
  as select value(tn) > 6;
```

The above predicate function takes a timestamped value and evaluates to true if the value is greater than six.

Use the predicate function above together in a `twinagg()` on `signal_1()` with a time window of 0.5 seconds.

```LIVE
twinagg(signal_1(), .5, #'threshold');
```

You see that once the value from `signal_1()` goes above 6 `twinagg()` starts to emit the time window.

If we are only interested in the values without the time stamps we can wrap the call to `twinagg()` in a select statement that extracts the values.

```LIVE
select value(tsv)
  from timeval of vector tsv
 where tsv in twinagg(signal_1(), .5, #'threshold');
```

## Predicate function with parameters

If we want a threshold predicate that works with different threshold values we can create a predicate that takes a vector parameter.

```LIVE
create function threshold_param(Timeval of Number tn, Vector params) -> boolean
  as select value(tn) > params[1];
```

The above predicate function takes a tiemstamped value and evaluates to true if the value is greater than the first value in the parameter vector.

Use the predicate function above together in a `twinagg()` on `signal_1()` with a time window of 0.5 seconds.

```LIVE
twinagg(signal_1(), .5, #'threshold_param', [6]);
```

You see that once the value from `signal_1()` goes above 6 `twinagg()` starts to emit the time window.


## Multi-valued streams

Until now we have only worked with single-valued streams. Typically you have some method that emits a vector of signals from multiple sources.

Here we have a function that emits a stream containing three signals. The first signal emits the values 1 through 10, the second signal has values between 100 and 600, and the third signal is a simple 0/1 signal with possible null values.

```LIVE
create function multisignal() -> stream of timeval
  as select stream of tt
       from timeval tt
      where tt in [ts(|2022-03-08T08&#58;06&#58;39.044Z|,[1, 100, null]),
                   ts(|2022-03-08T08&#58;06&#58;39.144Z|,[2, 100, 1]),
                   ts(|2022-03-08T08&#58;06&#58;39.252Z|,[3, 200, 0]),
                   ts(|2022-03-08T08&#58;06&#58;39.345Z|,[4, 300, 0]),
                   ts(|2022-03-08T08&#58;06&#58;39.455Z|,[5, 300, 0]),
                   ts(|2022-03-08T08&#58;06&#58;39.549Z|,[6, 500, 1]),
                   ts(|2022-03-08T08&#58;06&#58;39.660Z|,[7, 500, 0]),
                   ts(|2022-03-08T08&#58;06&#58;39.752Z|,[8, 500, 0]),
                   ts(|2022-03-08T08&#58;06&#58;39.861Z|,[9, 600, 1]),
                   ts(|2022-03-08T08&#58;06&#58;39.956Z|,[10, 600, 1])];
```

Let's create a predicate function that thresholds the multisignal stream on the first signal. This will be convenient when we illustrate the ouptput of `twinagg()` for multi-valued streams. Since `multisignal()` emits a timestamped vector, the predicate function passed to `twinagg()` needs to take a `Timeval of Vector`.

```LIVE
create function threshold_multi(timeval of vector tv, Vector params) -> boolean
  as select v[1] > params[1]
       from vector v
      where v = value(tv);
```

Now we can use twinagg to produce a time window when the first signal goes above 6. We still use a time frame of 0.5 seconds for our window.

```LIVE
twinagg(multisignal(), .5, #'threshold_multi', [6]);
```

We see that each time the first signal is greater than 6 `twinagg()` emits a vector with the signal values from the last 0.5 seconds.

Each inner vector in the result is a triplet of values from three different signals. To be able to do statistics on a single signal we need to transform the result so that all values from a single signal ends up in a single vector. We can do this by transposing the result.

> [exercise] **Example:** Let's say that we have three signals $A$, $B$ and $C$ from which we produce a stream of vectors $[a,b,c]$ (which is exactly what `multisignal()` does). If we apply `twinagg()` with a time value that generates a window size of $N$ values on this stream we get
> $$ M = \begin{bmatrix}
[a_1 & b_1 & c_1] \\
[a_2 & b_2 & c_2] \\
 & \vdots & \\
[a_N & b_N & c_N]
\end{bmatrix} $$
>
> If we transpose this we get all values for each signal in a separate vector.
> $$ \mathrm{T = transpose}(M) = \begin{bmatrix}
[a_1 & a_2 & ... & a_N] \\
[b_1 & b_2 & ... & b_N] \\
[c_1 & c_2 & ... & c_N]
\end{bmatrix} $$
>
> This means we can now do statistics over signal $A$, $B$ or $C$ by operating on their respective vectors $T(1)$, $T(2)$ or $T(3)$.

So to get the readings from each signal into a seperate vector per signal we can create a select statement around `twinagg()` that transposes the result.

```LIVE
select ts, vt
  from timeval of vector tsv, timeval ts, matrix v, matrix vt
 where tsv in twinagg(multisignal(), .5, #'threshold_multi', [6])
   and v = value(tsv)
   and vt = transpose(v)
   and ts = timestamp(tsv);
```

When executing the above query we see that a result is emitted each time the first signal is greater than 6 and that the values from each signal is collected in a separate vector. So we now have one vector per signal which is exactly what we need to do statistics over any of the signals.


## Statistics on multi-valued streams

Let's say that the second signal in `multisignal()` is engine RPM and the third signal is an indicator light which signals that something has gone wrong. Whenever the indicator light switches on we would like to see some statistics for the engine RPM. To accomplish this we first need to define a new predicate function that evaluates to true whenever the indicator light is on (i.e., when the third signal is equal to 1).

```LIVE
create function on_light(timeval of vector tv) -> boolean
  /* Returns true when element 3 in the vector is equal to 1,
     false otherwise. */
  as select v[3] = 1
       from vector v
      where v = value(tv);
```

Now we can use this new predicate function in a call to `twinagg()` and wrap it in a function that both transforms the result (as shown in the select statement from the previous section) and carries out any statistics calculations we might be interested in.

```LIVE
create function statistics_on_light() -> stream of vector
  as select [ts, mean(rpm_window), stdev(rpm_window)]
       from timeval of vector tsv, timeval ts, matrix v,
            matrix vt, vector of number rpm_window
      where tsv in twinagg(multisignal(), .5, #'on_light')
        and v = value(tsv)
        and vt = transpose(v)
        and ts = timestamp(tsv)
        and rpm_window = vt[2];
```

The function above will show the timestamp and the mean and standard deviation of the engine RPM (for a 0.5 second window) every time the indicator light is on. Try it by executing the following query.

```LIVE
statistics_on_light();
```

### Specifying which signal to observe

The `on_light()` predicate function assumes that the light has index three in the vector. This might be subject to change and it would therefore be better if we could provide the lamp signal index as input. To illustrate this we can define a new predicate function.

```LIVE
create function on_alert(timeval of vector tv, vector params) -> boolean
  as select v[signal_index] = 1
       from vector v, number signal_index
      where v = value(tv)
        and signal_index = params[1];
```

Now we can tweak the `statistics_on_light()` function by passing the index of the light signal into the predicate function.

```LIVE
create function statistics_on_alert(Number signal_index) -> stream of vector
  as select [ts, mean(rpm_window), stdev(rpm_window)]
       from timeval of vector tsv, timeval ts, matrix v,
            matrix vt, vector of number rpm_window
      where tsv in twinagg(multisignal(), .5, #'on_alert', [signal_index])
        and v = value(tsv)
        and vt = transpose(v)
        and ts = timestamp(tsv)
        and rpm_window = vt[2];
```

Try the new function by calling it with the index set to three.

```LIVE
statistics_on_alert(3);
```

You should get the same result as you did for `statistics_on_light()` but now you have specified the lamp index manually.

And that concludes this guide on how to use `twinagg()` for conditional time-windowed statistics on multi-signal streams.
