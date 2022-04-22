# Getting started with NXP i.MX 6

> [note] **Note:** This guide is designed for running inside SA Studio. Doing so makes it possible to run the code blocks interactively (like a Jupyter Notebook). If you read this documentation on the regular documentation website some internal links might not work and you will only be able to read the code examples, not run them.

## Connect your device to the server

> [static-only] First you need to connect your device to the server. Follow the [Connecting an edge device](/docs/usermd/connecting-edge-device/docs) guide and come back here when your device is connected.

> [live-only] First you need to connect your device to the server. Follow the [Connecting an edge device](https://studio.streamanalyze.com/home?goto=1&dl=Iy9kb2NzLyZsb2FkX2V4dGVybmFsPXN0cmVhbWFuYWx5emUuY29tL2Nvbm5lY3RpbmctZWRnZS1kZXZpY2UmZ290bz1jb25uZWN0aW5nLWVkZ2UtZGV2aWNlL2RvY3MubWQ=) guide and come back here when your device is connected.


## Test your setup

Now that you have connected your device to the server it is time to test some queries.

**1.** Select "server" in the device list at the bottom and run the following query by pushing the ![Play](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Play") icon.

```LIVE
listening_edges();
```

The result is a list of edges that are connected to the server. Your device should be present with the name you gave it when connecting the edge.

```shell
["IMX6-EDGE"]
```

**2.** You can change which device the queries are run on by clicking the device selector <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> at the bottom of the code block (next to the play button). Try this and select your edge device from the list. Now when you run a query it will execute on your edge device. Run the following query on your edge device.

```LIVE {"peer":"imx6-edge"}
this_peerid();
```

This should output the name you gave your edge device when connecting it to the server.

Also note that the local SA Engine instance in your device's terminal prompt should confirm that it ran the query `this_peerid()`.

```shell
2021-10-18T14:38:32.392 Running query 1: this_peerid();
2021-10-18T14:38:32.444 Query 1 finished
```

Now we have verified that your device is connected to the server, and that it can run queries received from the server.

## Simulating a sensor stream

Now that you have tested that you can execute queries on your device it is time to simulate a stream of sensor values.

> [note] **Note:** How to work with existing sensors or how to add new sensors are covered other guides. There are both getting-started guides which use sensors (such as the getting-started guide for Android) and custom guides that show how to add sensors to various platforms. The best way to find guides that use real sensors is to browse the guide index.

Let's say that we have a sensor that measures some parameter in a production process. We can create a function that simulates the sensor by running the following query on your edge device. Remember to select your edge device in the device list before executing the query.

```LIVE {"peer":"imx6-edge"}
create function my_sensor() -> Stream of Real
  as select stream of val
       from Real val, Real x
      where x in heartbeat(0.1)
        and val = (sin(0.8*x) + sin(1.1*x) + sin(1.5*x))*15.0;
```

Try the sensor by running the following query (remember to select your edge device in the device list before running the query).

```LIVE {"peer": "imx6-edge", "vis": "Line plot"}
my_sensor();
```

If we let the query run for a while we will eventually see that the readings vary on the interval $[-45, 45]$ (which also could be deduced from the function definition).

## Build a model

Now that we have a value stream from a sensor it is time to build a model.

### Alert on extreme measurements

Let's say that the valid output values from our sensor should be in the interval $[-40.0,40.0]$ and we want the system to alert us whenever the sensor produces values outside of that range.

To accomplish this we start by defining a function that takes a stream of values and outputs the values if it is outside the valid range. To define the function on the edge device remember to select your edge device in the device list before executing the query.

```LIVE {"peer":"imx6-edge"}
create function outside_interval(Stream of Real s, Real low, Real high) -> Stream of Real
  as select Stream of val
       from Real val
      where val in s
        and some(val > high or val < low);
```

Creating a function will return the object id for the created function. So the result should look something like this.

```shell
#[OID <number> "STREAM-REAL.REAL.REAL.OUTSIDE_INTERVAL->STREAM-REAL"]
```

Now try the function by running the following query on your device.

```LIVE {"peer":"imx6-edge"}
outside_interval(my_sensor(), -40.0, 40.0);
```

If you leave the query running for a while you will see that it outputs values whenever the sensor measurements are outside the given interval.

### Reporting state

Let's say that only reporting the extreme values is not enough. We want to know at what level the sensor is reporting. Let's say that the sensor values have the following levels.

| Interval        | Description |
| --------------- | ----------- |
|    < -40        | Too low     |
|  -40 to -30     | Low         |
|  -30 to 30      | Normal      |
|   30 to 40      | High        |
|    > 40         | Too high    |

We create a function that reports these levels.

```LIVE {"peer":"imx6-edge"}
create function report_level_cont(Stream of Real s) -> Stream of Charstring
  as select Stream of level
       from Charstring level, Real x
      where x in s
        and level = case when x < -40.0 then "too low"
                         when x < -30.0 then "low"
                         when x <  30.0 then "normal"
                         when x <  40.0 then "high"
                         else "too high"
                         end;
```

Running this function on a stream will produce one output string per value in the stream even if the level changes or not. That would be a lot of redundant information since we only want to know when the levels change. So we create a wrapper function that only produces output when the levels change.

```LIVE {"peer":"imx6-edge"}
create function report_level(Stream of Real s) -> Stream of Charstring
  as changed(report_level_cont(s));
```

If we run `report_level` on the simulated sensor stream we get reports whenever the level changes.

```LIVE {"peer":"imx6-edge"}
report_level(my_sensor());
```

If we let the query run for a while we will see how it reports the new level whenever the level changes.

We can add time stamps to get information about when the level was changed.

```LIVE {"peer":"imx6-edge"}
create function ts_report_level(Stream of Real s) -> Stream of Timeval
  as ts(report_level(s));
```

Try the timestamped version by running the following query.

```LIVE {"peer":"imx6-edge"}
ts_report_level(my_sensor());
```

Now we get timestamped reports for the sensor measurements.

## Conclusion

> [static-only] Where to go from here:
> * Use the [documentation](http://docs.streamanalyze.com/) to learn more about OSQL and how you can build models and interact with edge devices.

> [live-only] Where to go from here:
> * Use the [documentation](/docs/) to learn more about OSQL and how you can build models and interact with edge devices.

