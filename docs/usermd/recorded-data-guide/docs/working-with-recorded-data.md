# Working with recorded data

When developing models is it often inconvenient, and most times nearly impossible, to work directly on data streams from live production settings. You need to be able to replay scenarios and to have data that properly represents both general cases and any edge cases you want your model to handle. The possibility to work on manually produced and recorded data is therefore a requirement to facilitate a smooth and rigorous model development process and reliability in model performance.

>[note] **Note:** Working with recorded data on the CAN bus offers extra possibilities and is described in the online CAN bus guide.

## Basic recording and replaying of data

The simplest way to record data is to use `csv:write_file()`. You provide it with a stream or bag of vectors and it will save the vectors as CSV to a file (one vector per row).

To write the values 1-10 to a CSV file we can simply take the numbers emitted by `diota()` and wrap each value in a vector.

```LIVE {"vis": "Text"}
csv:write_file(sa_home() + "models/recorded-data-guide/output/example_1.csv",
               (select [n]
                  from number n
                 where n in diota(0.1,1,10)));
```

The `example_1.csv` file will be saved in the OSQL tab -> "User models" -> "recorded-data-guide/output". See if you can locate it and verify that the numbers 1-10 were saved in the CSV file.

If you want to emit the result to the output window while saving it you can provide a 1 as second argument (feedback) to `csv:write_file()` (this query will overwrite the `example_1.csv` file saved in the previous query).

```LIVE {"vis": "Text"}
csv:write_file(sa_home() + "models/recorded-data-guide/output/example_1.csv",
               1,
               (select [n]
                  from number n
                 where n in diota(0.1,1,10)));
```

Replaying the data is as simple as running the `csv:file_stream()` function.

```LIVE {"vis": "Text"}
csv:file_stream(sa_home() + "models/recorded-data-guide/output/example_1.csv");
```

Since `csv:write_file()` takes a stream of vector we can save vectors of any dimension. This query saves a three-dimensional vector produced by three different streams using `streams:pivot()` (using `-1` as default values).

```LIVE {"vis": "Text"}
csv:write_file(sa_home() + "models/recorded-data-guide/output/example_2.csv",
               1,
               (select v
                  from Vector v, Stream of Number s1,
                  Stream of Number s2, Stream of Number s3
                 where s1 = diota(0.1,1,10)
                   and s2 = heartbeat(0.1)
                   and s3 = simstream(0.1)
                   and v in streams:pivot([s1,s2,s3], [-1,-1,-1])
                 limit 30));
```

Verify the results by replaying the saved file.

```LIVE {"vis": "Text"}
csv:file_stream(sa_home() + "models/recorded-data-guide/output/example_2.csv");
```

## Data with timestamps

Maybe we want to have some time information in the saved data. This can easily be done by saving timestamps together with the data. An OSQL `Timeval` can be cast to a string on UTC format with `utc_time()`. So to save a vector with the timestamp as first value we can create a timeval each time we get a vector from the stream and add the timeval to the result.

```LIVE {"vis": "Text"}
csv:write_file(sa_home() + "models/recorded-data-guide/output/example_3.csv",
               1,
               (select [t, v1, v2]
                  from Vector v, Number v1, Number v2, Charstring t
                 where v in streams:pivot([diota(0.1,1,10),diota(0.1,1,10)], [-1,-1])
                   and [v1,v2] = v
                   and t = utc_time(timestamp(ts(v)))));
```

Verify the results by replaying the saved file.

```LIVE {"vis": "Text"}
csv:file_stream(sa_home() + "models/recorded-data-guide/output/example_3.csv");
```

You can use `parse_iso_timestamp()` to parse the timestamps when reading the recorded data. To illustrate this we create a function that reads the recorded data in `example_3.csv` and outputs a stream of timestamped vectors.

```LIVE {"vis": "Text"}
create function replay_recorded_ts_stream()
        -> Stream of Timeval of Vector
  as select stream of t
       from Timeval t, Vector v,
            Number v1, Number v2, Charstring tim
      where v in csv:file_stream(sa_home() +
                   "models/recorded-data-guide/output/example_3.csv")
        and [tim,v1,v2] = v
        and t = ts(parse_iso_timestamp(tim),[v1,v2]);
```

Run the function by executing the following query:

```LIVE {"vis": "Text"}
replay_recorded_ts_stream();
```

As you can see the function outputs a stream of the timestamped vectors recorded in `example_3.csv`.


## More advanced examples

To get the feeling of a more life-like scenario we will now look at how to record and replay data from an edge device. We will use an Android phone for this example.

>[note] **Note:** The steps here are applicable for all types of edge devices. If you do not have an Android phone you can simply connect another edge device with sensors and replace the use of the accelerometer in the examples with any sensor supported by SA Engine. See the getting started guides for more information on supported edge devices and sensors. Also, in this guide we provide pre-recorded files from an Android device in the `data/` directory, so if you do not have an edge device you can still follow the part where we replay the recorded data.

Start by connecting an Android device to the local federation. There is a detailed explanation in the getting started guide for Android on how to do this. In this guide we have used the name "ANDROID-EDGE" for our Android edge client.

When we have connected our Android edge client we can use `signal_stream('accelerometer')` to display the accelerometer stream and verify that our connection is working. We will run all our queries from the server with the `edge_cq()` function, so ensure that you have "Server" selected in the device list (at the bottom of the query box below).

```LIVE {"vis": "Line plot"}
edge_cq("android-edge", "signal_stream('accelerometer')");
```

### Recording the data

Now that we have verified that our connection is working and that we can stream the accelerometer data from the device we can start recording the stream.

```LIVE {"vis": "Text"}
csv:write_file(sa_home() + "models/recorded-data-guide/output/acc-data.csv",
               1,
               edge_cq("android-edge", "signal_stream('accelerometer')"));
```

This records the accelerometer data on the default format until you terminate the query (by pushing the stop button).

The accelerometer has three sensors, so the data in the `acc-data.csv` will look something like:

```
-0.258573770523071,0.646434485912323,9.66329765319824
-0.196324542164803,0.636857628822327,9.79976654052734
-0.126892685890198,0.615309834480286,9.90989971160889
-0.117315880954266,0.574608385562897,9.96496677398682
-0.179565131664276,0.574608385562897,10.0631294250488
-0.102950669825077,0.579396784305573,9.96496677398682
-0.136469498276711,0.574608385562897,9.81892013549805
...
```

Let's say that we want to record the data with timestamps. Then we follow the technique described in [Data with timestamps](#data-with-timestamps) and save a UTC timestamp as first value on each row.

```LIVE {"vis": "Text"}
csv:write_file(sa_home() +
               "models/recorded-data-guide/output/acc-ts-data.csv",
               1,
  edge_cq("android-edge",
    "select [t, v1, v2, v3]
       from Vector v, Number v1, Number v2,
            Number v3, Charstring t
      where v in signal_stream('accelerometer')
        and [v1, v2, v3] = v
        and t = utc_time(timestamp(ts(v)));"));
```

This will put a timestamp as the first value on each row, and the `acc-ts-data.csv` will look something like this:

```
"2022-03-29T11:56:34.889Z",-2.29603934288025,0.0814028605818748,15.8071184158325
"2022-03-29T11:56:34.916Z",-3.44046783447266,-0.263362199068069,18.1701946258545
"2022-03-29T11:56:34.926Z",-3.47638082504272,-0.158017307519913,19.747974395752
"2022-03-29T11:56:34.957Z",-5.55245304107666,0.957680702209473,23.4350452423096
"2022-03-29T11:56:34.967Z",-4.80755710601807,0.325611442327499,22.9394454956055
"2022-03-29T11:56:34.990Z",-2.36068296432495,-3.89776039123535,15.6586780548096
"2022-03-29T11:56:35.008Z",-4.17548799514771,-5.26754283905029,3.36145925521851
...
```

### Replaying the recorded data

>[note] **Note:** Here we will use pre-recorded files provided with the guide, so you won't need an Android device to follow this part. You can use the files you recorded yourself in the previous section if you want by just changing the `data/` folder to `output/` in the paths in the examples.


If we just want to look at the data or make statistical analysis of the data, we can just replay the data as a stream of vectors.

```LIVE {"vis": "Text"}
csv:file_stream(sa_home() + "models/recorded-data-guide/data/acc-data.csv");
```

The output rendering is set now to `Text` but you can change it `Line plot` to get a better visualization of the data, but `Line plot` will only show the last 200 measurements as default.


### Replaying data with specific pace

To better simulate the recording we can provide the parameters `"read"` (for "read once") and `pace` to `csv:file_stream()` that specifies how fast we want to stream the values from the file.

```LIVE {"vis": "Line plot"}
csv:file_stream(sa_home() + "models/recorded-data-guide/data/acc-data.csv",
                "read",
                0.05);
```

We can also accomplish the same thing by using `heartbeat_wrap()` which works for all streams.

```LIVE {"vis": "Line plot"}
heartbeat_wrap(csv:file_stream(sa_home() +
    "models/recorded-data-guide/data/acc-data.csv"),
    0.05);
```


### Replaying data at original speed

In the previous chapter we showed how you can replay recorded data at some specific pace. This can be useful when you want to examine the data in slow motion or speed up long streams. But it can be difficult to find the right pace if you want to replay the data at its original speed.

To be able to replay data at its original speed the recorded data needs to have timestamps. Then you can see if the data was emitted at regular intervals, e.g., every tenth of a second. Should this be the case then you can just replay the stream with `cvs:file_stream()` and set the pace to match that interval.

An example with values emitted at regular time intervals:
```
"2022-03-29T11:56:34.400Z",-2.29603934288025,0.0814028605818748,15.8071184158325
"2022-03-29T11:56:34.500Z",-3.44046783447266,-0.263362199068069,18.1701946258545
"2022-03-29T11:56:34.600Z",-3.47638082504272,-0.158017307519913,19.747974395752
"2022-03-29T11:56:34.700Z",-5.55245304107666,0.957680702209473,23.4350452423096
"2022-03-29T11:56:34.800Z",-4.80755710601807,0.325611442327499,22.9394454956055
"2022-03-29T11:56:34.900Z",-2.36068296432495,-3.89776039123535,15.6586780548096
...
```

However, this is rarely the case for real sensor streams. Here we see data recorded by an Android accelerometer in the file `acc-ts-data.cvs`:
```
"2022-03-29T11:56:34.889Z",-2.29603934288025,0.0814028605818748,15.8071184158325
"2022-03-29T11:56:34.916Z",-3.44046783447266,-0.263362199068069,18.1701946258545
"2022-03-29T11:56:34.926Z",-3.47638082504272,-0.158017307519913,19.747974395752
"2022-03-29T11:56:34.957Z",-5.55245304107666,0.957680702209473,23.4350452423096
"2022-03-29T11:56:34.967Z",-4.80755710601807,0.325611442327499,22.9394454956055
"2022-03-29T11:56:34.990Z",-2.36068296432495,-3.89776039123535,15.6586780548096
...
```

It is clear that the timestamps do not represent even time intervals. Instead the values are emitted every ~1-3 hundreds of a second.

To remedy this variation and stream the values with the original speed we can
  1. replay the data as a stream of time values,
  2. use the time values to downsample the stream to some specific time interval (but no faster than original stream),
  3. replay the downsampled stream at the sample pace, thereby achieving the original speed.

This will replay a downsampled version of the original data stream but at the same speed the original stream was recorded.

When downsampling a stream there is always the risk of losing vital information, but if the interesting features of a stream span over a large time compared to the original frequency then the signal can be downsampled with minimal risk as long as the sample interval is kept close to the original pace.


Let's illustrate this with the recorded data provided in the file `acc-ts-data.csv`. First we create a function that replays the data from the file as a stream of timevalues.

```LIVE {"vis": "Text"}
create function replay_recorded_ts_stream()
        -> Stream of Timeval of Vector
  as select stream of t
       from Timeval t, Vector v,
            Number v1, Number v2, Number v3, Charstring tim
      where v in csv:file_stream(sa_home() +
                   "models/recorded-data-guide/data/acc-ts-data.csv")
        and [tim,v1,v2,v3] = v
        and t = ts(parse_iso_timestamp(tim),[v1,v2,v3]);
```

We run it and see that all rows in the file are emitted as timevals (i.e., all values are on the form `ts(<timestamp>, <vector>)`).

```LIVE {"vis": "Text"}
replay_recorded_ts_stream();
```

Now we create a wrapper function `sampled_stream()` that samples the stream from `replay_recorded_ts_stream()` at specific time intervals using `twinagg()`. Twinagg collects values (from a stream of timevalues) in a window and emits the window when a specific time has lapsed. The `sampled_stream()` function emits the last vector in the window emitted by twinagg and puts it in a timeval.

```LIVE {"vis": "Text"}
create function sampled_stream(Real sample_rate)
                        -> Stream of Timeval of Vector
  as select Stream of ts(timestamp(tv), v)
       from timeval of vector tv, vector win, Vector v
      where tv in twinagg(replay_recorded_ts_stream(),
                          sample_rate, sample_rate)
        and win = value(tv)
        and v = win[dim(win)];
```

Run the function with some sample rate higher than the original (i.e., at least 0.03 since the original pace seemed to vary between 1-3 hundreds of a second) and see that the timestamps are now evenly spread at the sample rate you used.

```LIVE {"vis": "Text"}
sampled_stream(0.1);
```

Now we can create a function that uses `heartbeat_wrap()` to replay the stream at the same pace as the stream was sampled. This will give us the original speed.

```LIVE {"vis": "Text"}
create function orig_speed_stream(Real sample_rate)
                         -> Stream of Timeval of Vector
  as select Stream of tv
       from Timeval of Vector tv
      where tv in heartbeat_wrap(sampled_stream(sample_rate), sample_rate);
```

Try the function to replay the stream with its original speed. The duration of the recording was ~10s, so the query should take approximately 10 seconds to finish.

```LIVE {"vis": "Line plot"}
orig_speed_stream(0.03);
```

Note that you can adjust the granularity of the stream by changing the sample rate. But remember to not use values lower than the original pace to prevent the stream from runnning faster than the original.


## GPS example

Just to show another application example we'll look at how to replay GPS data from a recorded file. We have provided a file `gps.csv` with GPS data recorded during a drive through Uppsala, Sweden.

First we create a function that replays the data at a specified pace.

```LIVE {"vis": "Text"}
create function replay_gps_stream(Number pace)
                             -> Stream of Vector
  as select Stream of v
       from Vector v
      where v in csv:file_stream(sa_home() +
                   "models/recorded-data-guide/data/gps.csv",
                   "read",
                   pace);
```

We then wrap the GPS values in in GeoJSON records to be able to render the drive on a map.

```LIVE {"vis": "Text"}
create function geojson_stream(Number pace, Charstring name)
                             -> Stream of Record
  as select Stream of geojson:point(p,
                                   {"persistent": true,
                                    "id": name,
                                    "style": {"label": name}})
       from Vector p
      where p in replay_gps_stream(pace);
```

And finally we start the stream with GeoJSON visualization activated to see how the car drives around in Uppsala.

```LIVE {"vis": "Geo JSON"}
geojson_stream(0.5, "car-01");
```

The GPS positioning is a bit jittery at first due to low initial accuracy but improves as the car starts driving towards the city center.

