# Combining CAN bus streams with other sensors

Sometimes we want to use data from other sensors in combination with data from the CAN bus. Here we will show you how to combine streams from multiple sources into a single stream.

Let's say that we have both a GPS sensor and a CAN bus and that we want to combine the GPS readings with data from the CAN bus.

## Simulate a GPS sensor stream

To illustrate this we have provided a file `gps-data.csv` with recorded GPS values. We can simulate a GPS sensor by reading the GPS values from the file and emitting a stream of values with one measurement every 0.5 seconds.

```LIVE
create function gps_stream() -> Stream of Vector
  as select Stream of gps
       from Vector gps
      where gps in csv:file_stream(sa_home() +
                                   "models/canbus-guide/gps-data.csv",
                                   "read",
                                   0.5);
```

You can try it by executing the following query:

```LIVE
gps_stream();
```

## Simulate a CAN bus data stream

Now we need to simulate a CAN bus stream. We'll quickly step through the queries needed. If you have read the previous chapters in this guide you'll be familiar with most steps.

First load the CAN bus model.

```LIVE
load_system_model("canbus");
```

Translate the DBC file to OSQL format.

```LIVE
can:import_dbc(sa_home() + "models/canbus-guide/j1939.dbc",
               sa_home() + "models/canbus-guide/j1939_dbc.osql",
               []);
```

Load the translated signal definitions.

```LIVE
load_osql(sa_home() + "models/canbus-guide/j1939_dbc.osql");
```

Create a function that generates a data stream from a recorded CAN file.

```LIVE
create function j1939_can_data_stream() -> Stream of Vector
  as can:playback_socketcan(sa_home() +
        'models/canbus-guide/j1939-can-data.log');
```

Create a wrapper function that makes the CAN bus emit recorded values every 0.1 seconds.

```LIVE
create function can_data_stream_wrapper() -> Stream of Vector
  as select streamof(v)
      from Vector v
      where v in heartbeat_wrap(j1939_can_data_stream(), 0.1);
```

Then we need to set the CAN data source.

```LIVE
set bus(typenamed("can:signal")) = #'can_data_stream_wrapper';
```

Now we can try our simulated CAN bus.

```LIVE
can:ts_signal_stream(["EEC1_EngineSpeed", "CCVS1_WheelBasedVehicleSpeed"]);
```

## Combining the CAN bus and GPS streams

Now we have two data streams `can:ts_signal_stream()` and `gps_stream()`. The CAN bus stream has a timestamp but we will provide new timestamps for our combined stream, so we create a wrapper function that strips the CAN bus stream of its timestamp.

```LIVE
create function can_stream() -> Stream of Vector
  as select Stream of can
       from Vector can, Timeval of Vector tv
      where tv in can:ts_signal_stream(["EEC1_EngineSpeed", "CCVS1_WheelBasedVehicleSpeed"])
        and can = value(tv);
```

Check that you only get the CAN bus values now by executing the following query:

```LIVE
can_stream();
```

Now we can use `streams:pivot()` to combine the two streams. We create a function that combines the two streams and adds a timestamp to the resulting stream.

```LIVE
create function can_and_gps() -> Stream of Timeval of Vector
  as select Stream of ts(concat(can,gps))
       from Vector can, Vector gps, Vector v
      where v in streams:pivot([can_stream(), gps_stream()], [[-1],[-1]])
        and [can, gps] = v;
```

Some details of what the function does:

`2:` Construct the output by concatenating the CAN vector with the GPS vector and puth the result in a `Timeval` with `ts()`.

`4:` Use `streams:pivot()` to combine the stream from `can_stream()` with the stream from `gps_stream()` and use `[-1]` as default value for both streams (used if a stream has not emitted any value yet).

`5:` Use multi bind to assign `can` to the vector from the CAN bus stream and `gps` to the vector from the GPS stream.

Now try the combined stream.

```LIVE
can_and_gps();
```

The output from `can_and_gps()` is a stream of `Timeval` where the data vector is the values from the CAN bus and GPS streams.

```
             ┌─── Timestamp
             │                     ┌─── EEC1_EngineSpeed
             │                     │        ┌─── CCVS1_WheelBasedVehicleSpeed
             │                     │        │           ┌─── Latitude
             │                     │        │           |         ┌─── Longitude
             ↓                     ↓        ↓           ↓         ↓
ts(|2022-03-28T19:47:22.556Z|, [1424.625,19.8046875,17.636865,59.845127])
```

