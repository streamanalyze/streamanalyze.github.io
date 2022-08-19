SA Engine has two functions that make windows over streams. The first is called `winagg()` and is a count-based window function. The second function is called `twinagg()` and is a time-based window function.

### `winagg()`

Winagg is a count-based window function that creates windows from an input stream. You specify the number of stream elements that each window contains (the window "size") and how many stream elements the window moves forward before emitting the next window (the "stride").

For example, to create a non-overlapping window (a _tumbling_ window) you provide the same value for size and stride. Try it by running the following query (remember that `heartbeat()` generates a stream of seconds emitted at a given pace, so it takes 5s for the query to output any result):

```LIVE
winagg(heartbeat(1), 5, 5);
```

You can read the query as "emit the 5 latest elements every 5th element". The figure below illustrates the behavior of this query:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/osql-essentials/winagg_1_5-5_drop.png" alt="winagg_1_5-5_drop.png" width="800"/>

It is not required to keep all the values from the input stream. You can specify a stride that is larger than the window size. Doing this will sample the stream every stride element. Try it by running the following query:

```LIVE
winagg(heartbeat(1), 4, 6);
```

You can read the query as "emit the 4 latest elements every 6th element". It effectively skips two values between every window, which is illustrated in the figure below:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/osql-essentials/winagg_2_4-6_drop.png" alt="winagg_2_4-6_drop.png" width="800"/>


If you set a stride value that is lower than the window size you get overlapping windows (_sliding_ window). Try it by running the following query (it takes 10s for the query to output any result):

```LIVE
winagg(heartbeat(1), 10, 1);
```

The query produces a 10-element window every time the input stream emits a new element, which is illustrated in the figure below:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/osql-essentials/winagg_5_10-1_drop.png" alt="winagg_5_10-1_drop.png" width="800"/>



### `twinagg()`

Twinagg is a time-based window function that creates windows from an input stream of timestamped values. It works much like `winagg` but instead of specifying window size and stride in number of elements you specify it in seconds.

We will use a custom stream to illustrate how `twinagg` works. The function below outputs a stream of timestamped values. Create the function by running the query:

```LIVE
create function x() -> stream of timeval
  as select stream of tt
       from timeval tt
      where tt in [ts(|2022-05-12T00&#58;00&#58;00.0Z|,16),
                   ts(|2022-05-12T00&#58;00&#58;00.3Z|,4),
                   ts(|2022-05-12T00&#58;00&#58;00.4Z|,8),
                   ts(|2022-05-12T00&#58;00&#58;00.5Z|,2),
                   ts(|2022-05-12T00&#58;00&#58;00.7Z|,1),
                   ts(|2022-05-12T00&#58;00&#58;00.8Z|,7),
                   ts(|2022-05-12T00&#58;00&#58;01.0Z|,3),
                   ts(|2022-05-12T00&#58;00&#58;01.1Z|,6),
                   ts(|2022-05-12T00&#58;00&#58;01.2Z|,9),
                   ts(|2022-05-12T00&#58;00&#58;01.3Z|,5),
                   ts(|2022-05-12T00&#58;00&#58;01.5Z|,12),
                   ts(|2022-05-12T00&#58;00&#58;01.6Z|,11)];
```

If we illustrate the value stream on a timeline it looks like this:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/osql-essentials/twinagg_stream_drop.png" alt="twinagg_stream_drop.png" width="700"/>


To create a non-overlapping time window (a tumbling window) you provide the same value for size and stride. Try it by running the following query:

```LIVE
twinagg(x(), 0.3, 0.3);
```

The figure below illustrates how the tumbling window passes over the stream elements:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/osql-essentials/twinagg_1_drop.png" alt="twinagg_1_drop.png" width="800"/>

Just like with `winagg`, `twinagg` can also skip elements by specifying a stride that is larger than the window size, or use a sliding window by specifying a stride that is smaller than the window size.

Here is an example where window size is larger than the stride. Try it by running the query:

```LIVE
twinagg(x(), 0.6, 0.3);
```

The query produces a 0.6 second window every 0.3 seconds, which is illustrated in the figure below:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/osql-essentials/twinagg_2_drop.png" alt="twinagg_2_drop.png" width="800"/>


## Functions
