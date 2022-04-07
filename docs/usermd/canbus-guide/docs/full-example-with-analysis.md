# Full example with analysis

>[note] **Note:** The analysis example can naturally be done on either recorded data read from within OSQL or recorded data replayed on the CAN bus with canplayer. But since this guide is not connected to a CAN bus this chapter will show how to do analysis on recorded data from within OSQL.

In this chapter we will create a model that computes statistics for CAN data from a truck and presents the data when some condition is fulfilled. The example will compute statistics for the truck's engine behavior whenever the truck's vehicle speed goes above a certain threshold. The example is rather simplistic and its use is purely hypothetical, but it illustrates ways to analyze CAN data that can easily be adjusted to fit your needs.

## Setup

This chapter shows all steps in an end-to-end analysis and therefore repeats queries from previous chapters. To prevent getting errors for some of the queries we first do a rollback that undoes all previous actions.

>[warning] **Warning**: The `rollback` command will put SA Engine back to a state before this guide was loaded. This current page will still be visible and you will be able to follow the steps in this chapter. But if you want to read any other part of this guide you will have to load it again.

```LIVE
rollback;
```

To use the SA Engine CAN bus data wrapper we first need to load the `canbus` model.

>[note] **Note:** You can disregard any `JSON.parse` errors that might arise.

```LIVE {"vis":"showText"}
load_system_model("canbus");
```

### Import DBC file

To be able to decode the CAN bus frames we need to use a DBC file with decoding information. We provide a DBC file that contains decoding information for engine speed (rpm) and vehicle speed (km/h). First we translate the provided DBC file.

```LIVE
can:import_dbc(sa_home() + "models/canbus-guide/j1939.dbc",
               sa_home() + "models/canbus-guide/j1939_dbc.osql",
               []);
```

The translation creates an OSQL file with decoding information for the CAN bus signals. Finish the DBC import by loading the decoding information.

```LIVE
load_osql(sa_home() + "models/canbus-guide/j1939_dbc.osql");
```

>[warning] **Important:** Loading the same signal definitions multiple times with `load_osql(<osql-dbc-file>)` result in "Violating unique index for name(Signal s)->Charstring" errors. To prevent this you can delete previously loaded signals with `delete_objects(select cs from can:signal cs)` before loading signal definitions.


You can verify that the decoding information for the signals were loaded with a call to `signals()`.

```LIVE
signals();
```

The result should show that signals for both engine speed and vehicle speed have been loaded.


### Setup stream from recorded file

We will read the CAN frames from a recorded file. A file containing CAN frames (on socketCAN format) has been provided for this purpose.

>[note] **Note:** If you run this guide on a device that has access to a CAN bus you can use the real CAN bus instead if you have means to replay the recorde file on the CAN bus. How to do this with canplayer is described in the chapter [Working with the CAN bus](/DL/docs/usermd/canbus-guide/docs/working-with-the-can-bus.md).

We create a wrapper function that passes our recorded file to a socketCAN parser function.

```LIVE
create function j1939_can_data_stream() -> Stream of Vector
  as can:playback_socketcan(sa_home() +
        'models/canbus-guide/j1939-can-data.log');
```

And then we set the CAN bus wrapper to use the wrapper function we just created as signal source.

```LIVE
set bus(typenamed("can:signal")) = #'j1939_can_data_stream';
```

We can verify that the recorded stream has been set up correctly by "listening" for messages on our CAN bus.

```LIVE
can:signal_bus(["EEC1_EngineSpeed", "CCVS1_WheelBasedVehicleSpeed"]);
```

The result should show readings for engine speed and vehicle speed over a few seconds time period. So now we have a working CAN bus reader that reads CAN frames from a recorded file.

Use `can:ts_signal_stream()` to get the time stamped signal measurements on vector format for easier processing.

```LIVE
can:ts_signal_stream(["EEC1_EngineSpeed", "CCVS1_WheelBasedVehicleSpeed"]);
```


## Analysis

We want to develop a model that presents statistics for engine speed whenever the vehicle speed goes above a certain threshold.

### Downsample stream

The recorded CAN bus stream emits values at a rate of every .01 seconds which can be regarded as unecessary high throughput for our case. To sample the stream at a lower frequency we can use `twinagg()`.

```LIVE
create function ts_signal_stream_sampled(Vector of Charstring signals,
                                         Real sample_rate)
                                         -> Stream of Timeval of Vector
  as select Stream of ts(timestamp(tv), v[1])
       from timeval of vector tv, vector v
      where tv in twinagg(can:ts_signal_stream(signals),
                          sample_rate, sample_rate)
        and v = value(tv);
```

With this function we can specify which signals to read and at what frequency.

```LIVE
ts_signal_stream_sampled(["EEC1_EngineSpeed",
                          "CCVS1_WheelBasedVehicleSpeed"],
                          0.05);
```

We see how values are sampled every .05 seconds from the original stream.

### Statistics over streams

We now want to do statistics over the signals in the stream.

In order to do this we need to first decide how big the time window we will use for the statistics computations. Typically you want a window large enough to capture enough information for the statistics to be informative. However in this rather small example we will use a very short time window for illustrative purposes. Since we sample the stream every 0.05 a time window of 0.5 seconds will give us a window with 10 measurements.

Secondly, the measurements are emitted in value pairs, so we also need to transpose the resulting window to be able to do statistics over individual signals.

>[note] **Note:** To get a more detailed explanation on how statistics are computed over streams we refer to the guide [Conditional statistics on streams](/DL/docs/&load_external=streamanalyze.com/conditional-stats-on-streams&goto=conditional-stats-on-streams/docs.md).

Create a function that samples the CAN bus stream every 0.05 seconds and computes mean and standard deviation for the engine speed for some given window size (in seconds).

```LIVE
create function engine_speed_stats(Real window_size)
  -> Stream of Vector
  as select [ts, mean(engine_speed_window), stdev(engine_speed_window)]
       from timeval of vector tsv, stream of timeval of vector tss,
            timeval ts, matrix v, matrix vt,
            vector of number engine_speed_window,
            real sample_rate
      where sample_rate = 0.05
        and tss = ts_signal_stream_sampled(["EEC1_EngineSpeed",
                                             "CCVS1_WheelBasedVehicleSpeed"],
                                           sample_rate)
        and tsv in twinagg(tss, window_size, sample_rate)
        and v = value(tsv)
        and vt = transpose(v)
        and ts = timestamp(tsv)
        and engine_speed_window = vt[1];
```

A line-by-line description of the function:

`3:` returns a vector with the timestamp, engine speed mean and standard deviation.

`8:` sets the sample rate.

`9-11:` is the sampled stream of timestamped measurements from the CAN bus.

`12:` creates a window of the given window size with a stride of 1 measurement. The stride becomes 1 measurement since the stride (in seconds) is the same as the sample rate, so we get one value per `sample_rate` seconds.

`13-14:` transposes the value matrix so we can get the measurements from each signal as a separate vector.

`15:` extracts the time stamp for the result.

`16:` extracts the vector with the engine speed measurements for the result.


Try the function by calling it with some window size.

```LIVE
engine_speed_stats(0.5);
```

The query returns a stream of vectors where the first value is the time stamp from the CAN bus stream and the other two values are the mean and standard deviation of the engine speed (for measurements read from 0.5 seconds before the time stamps up to the time stamp).

Notice how the first vector has time stamp `2020-01-13T14:47:10.366Z` while the first measurment when reading the same signals with `can:ts_signal_stream()` has time stamp `2020-01-13T14:47:09.816Z`. The reason is that our statistics function needs the 0.5 seconds (the window size) to accumulate measurements before it can start generating any output. Specifically, it is the `window_size` input to the `twinagg()` function that determines how long the function has to read before the first window is populated.

Ok, so now we have statistics for the engine speed, but we only wanted it when the vehicle speed was above some threshold.

To do this we first need to define a predicate function that will return true when the vehicle speed is above some threshold and false otherwise. The predicate function will operate on each value in the CAN bus stream, so in our case the input parameter is of type `Timeval of Vector`.

```LIVE
create function vehicle_speed_thres_fn(Timeval of Vector tv, Vector params) -> boolean
  as select vehicle_speed > threshold
       from vector v, real vehicle_speed, number threshold
      where v = value(tv)
        and vehicle_speed = v[2]
        and threshold = params[1];
```

The function extracts the vehicle speed from the value vector and evaluates the predicate to true if the vehicle speed is above some threshold value provided as input.

Now we can create a new function which is the same as the old statistics function but simply replace our call to `twinagg()` with an overloaded version that takes a predicate function. This new function emits the statistics whenever the condition in our predicate function `vehicle_speed_thres_fn` evaluates to true. We also add the vehicle speed that triggered the statistics to the output.

```LIVE
create function cond_engine_speed_stats(Real window_size, Number speed_threshold)
  -> Stream of Vector
  as select [ts, mean(engine_speed_window), stdev(engine_speed_window), vehicle_speed]
       from timeval of vector tsv, stream of timeval of vector tss,
            timeval ts, matrix v, matrix vt, number i,
            vector of number engine_speed_window,
            vector of number vehicle_speed_window,
            real sample_rate, number vehicle_speed
      where sample_rate = 0.05
        and tss = ts_signal_stream_sampled(["EEC1_EngineSpeed",
                                             "CCVS1_WheelBasedVehicleSpeed"],
                                           sample_rate)
        and tsv in twinagg(tss, window_size, #'vehicle_speed_thres_fn', [speed_threshold])
        and v = value(tsv)
        and vt = transpose(v)
        and ts = timestamp(tsv)
        and [engine_speed_window, vehicle_speed_window] = vt
        and i = dim(vehicle_speed_window)
        and vehicle_speed = vehicle_speed_window[i];
```

The new function has the following changes compared to `engine_speed_stats()`:

`1:` Added `speed_threshold` input parameter.

`3:` Added `vehicle_speed` to output vector.

`13:` Use twinagg with predicate function `vehicle_speed_thres_fn` and `speed_threshold` as parameter to predicate.

`17:` Bind the variable names `engine_speed_window` and `vehicle_speed_window` to the two window vectors in `vt`.

`18:` Get the index of the last value in the vehicle speed window (vectors are 1-indexed).

`19:` Extract last value (the vehicle speed) from the vehicle speed window. The values in the window are in chronological order, so the vehicle speed value that triggered the predicate is the last element in the window.

Run the function with time window 0.5 and speed threshold 20.6 km/h.

```LIVE
cond_engine_speed_stats(0.5, 20.6);
```

We see that the vehicle speed went above 20.6 km/h four times. Those four times the function emitted the mean and standard deviation of the engine speed over the last 0.5 seconds.

You can plot the mean and standard deviation in the result by extracting the values from the output vector and visualizing only the mean and standard deviation in a line plot.

```LIVE {"vis": "Line plot"}
select t, mean, stdev
  from timeval t, vector v, number mean, number stdev, number vs
 where v = cond_engine_speed_stats(0.5, 20.6)
   and [t,mean,stdev,vs] = v;
```

Typically when listening on a real CAN bus in a production setting the `cond_engine_speed_stats(...)` query will run perpetually on the device and the output will be directed (through MQTT or similar message framework) to some monitoring service that visualizes the statistics and maybe raises necessary alerts.
