# Getting started with Raspberry Pi

> [note] **Note:** This guide is designed for running inside SA Studio. Doing so makes it possible to run the code blocks interactively (like a Jupyter Notebook). If you read this documentation on the regular documentation website some internal links might not work and you will only be able to read the code examples, not run them.

> [note] **Note:** This guide is works for both Raspberry Pis and Raspberry Pi Zeros. If you run this guide with a Raspberry Pi Zero, you must select the device "Pi0-edge" instead of "Pi-edge" wherever queries are executed on the device.


## Connect your Raspberry Pi to the server

> [static-only] First you need to connect your Raspberry Pi to the server. Follow the [Connecting an edge device](/docs/usermd/connecting-edge-device/docs) guide and come back here when your Raspberry Pi is connected.

> [live-only] First you need to connect your Raspberry Pi to the server. Follow the [Connecting an edge device](https://studio.streamanalyze.com/home?goto=1&dl=Iy9kb2NzLyZsb2FkX2V4dGVybmFsPXN0cmVhbWFuYWx5emUuY29tL2Nvbm5lY3RpbmctZWRnZS1kZXZpY2UmZ290bz1jb25uZWN0aW5nLWVkZ2UtZGV2aWNlL2RvY3MubWQ=) guide and come back here when your Raspberry Pi is connected.

## Test your setup

Now that you have connected your Raspberry Pi to the server it is time to test some queries.

**1.** Select "server" in the device list at the bottom and run the following query by pushing the ![Play](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Play") icon.

```LIVE
listening_edges();
```

The result is a list of edges that are connected to the server. Your device should be present with the name you gave it when connecting the edge ("PI-EDGE" or "PI0-EDGE" if it is a Raspberry Pi Zero).

```shell
["PI-EDGE"]
```

**2.** You can change which device the queries are run on by clicking the device selector <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> at the bottom of the code block (next to the play button). Try this and select your edge device from the list. Now when you run a query it will execute on your edge device. Run the following query on your edge device.

```LIVE {"peer":"Server"}
this_peerid();
```

This should output the name you gave your edge device when connecting it to the server.

Also note that the local SA Engine instance in your device's terminal prompt should confirm that it ran the query `this_peerid()`.

```shell
2021-10-18T14:38:32.392 Running query 1: this_peerid();
2021-10-18T14:38:32.444 Query 1 finished
```

Now we have verified that your Raspberry Pi is connected to the server, and that it can run queries received from the server.


## Create a model

Now that you have tested that you can execute queries on the Raspberry Pi edge device it is time to create a model. Our model will be a mathematical transform that converts temperature values from Celsius to Farenheit.

**1.** Create the following function that will constitute our model on your edge device (remember, if you are running this guide with a Pi Zero you must first change the device in the device selector from <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/device-selector-pi-edge.png" alt="device-selector-win-edge.png" width="70" /> to "Pi0-edge"):

```LIVE {"peer":"Pi-edge"}
create function ctof(Number c) -> Number
  /* Convert a Celsius degree `c` to Fahrenheit */
  as c * 9 / 5 + 32;
```

**2.** Now you can try the model on the edge device by running the following query:

```LIVE {"peer":"Pi-edge"}
ctof(32);
```

You should get the result `89.6` from your edge device.

**3.** You can also ship queries to edges from the server by using the built-in function `edge_cq(Charstring edge, Charstring query)` which evaluates `query` on `edge`.

Try this by first ensuring that you have selected <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> as your device and run the following query:

```LIVE {"peer":"Server"}
edge_cq('pi-edge', 'ctof(72)');
```

You should get the result `161.6` from your edge device.

## Get a stream of readings from the temperature sensor.

On a Raspberry Pi you can access the temperature reading by the file `/sys/class/thermal/thermal_zone0/temp`. Each reading is in `celsius * 1000`

To get a stream of temperature readings you can use the `csv:file_stream` function with `"loop"` as option.


```LIVE {"peer":"Server"}
edge_cq("pi-edge", "
        csv:file_stream('/sys/class/thermal/thermal_zone0/temp', 'loop',0.1)/1000
        ");
```

This should show a stream of temperature readings from the internal sensor on the CPU.

> [static-only]
> <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/pi_read_sensor_csv.png" alt="pi_read_sensor_csv.png" style="width:100%" />


## Defining a signal of the temperature sensor.

To wrap this up, let's add some meta-data that contains the necessary steps to add the temperature sensor as a signal in SA Engine:

```LIVE {"peer":"Pi-edge"}
create Signal (name, doc) instances
 ("CPU_temp", "Temperature reading from the CPU tempereature sensor");

set ts_signal_stream(signal_named("CPU_temp")) =
  (select stream of ts(temp)
    from Number temp
   where [temp] in csv:file_stream('/sys/class/thermal/thermal_zone0/temp',
                                   'loop',0.1)/1000);
```

If you call the function `signals()` on the Raspberry Pi now you will see that we have a signal called `CPU_temp` defined:

```LIVE {"peer":"Pi-edge"}
signals();
```

You can now get a stream of the temperature signal by running:

```LIVE {"peer":"Pi-edge","vis":"Line plot"}
signal_stream("CPU_temp");
```


To get a stream of readings in Fahrenheit simply apply the function `ctof` to each number in the signal stream:

```LIVE {"peer":"Pi-edge","vis":"Line plot"}
select ctof(c)
  from Number c
  where c in signal_stream("CPU_temp");
```

This plots the CPU temperature in Fahrenheit of the Raspberry Pi.


## Conclusion

Congratulations! You have now deployed your first model to a Raspberry Pi edge device and used it on the built in CPU temperature sensor.

Where to go from here:
> [live-only] * Use the [documentation](/docs) to learn more about OSQL and how you can build models and interact with edge devices.

> [static-only] * Use the [documentation](http://docs.streamanalyze.com/) to learn more about OSQL and how you can build models and interact with edge devices.
