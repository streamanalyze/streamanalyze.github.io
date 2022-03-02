# Message as result of a query

In this section we will use the publicly available MQTT broker
[test.mosquitto.org](https://test.mosquitto.org/) which supports communication using TLS.

We also use the command line tools `mosquitto_pub` and `mosquitto_sub` that come bundled
with [Eclipse Mosquitto](https://mosquitto.org/), an
open source MQTT broker, for sending and receiving MQTT messages on the command line.

In the previous sections we covered how to send static messages and how to send messages
securely using TLS. In this section we will show how to send messages as the result of a query.

## Setup

Just like in the previous sections you need to load the MQTT extension and register your client.

Start by loading the MQTT extension.

```LIVE
loadsystem(startup_dir()+"../extenders/sa.mqtt","mqtt.osql");
```

Then specify your connection options.

```LIVE
set :mqtt_connect_opts = {
    "qos": 1,
    "connection": "tcp://test.mosquitto.org:1883",
    "clientid": "client" + sha256(ntoa(rand(10e16)))
};
```

You then use the connection options to connect to the broker.

```LIVE
mqtt:register_client("mqtt",:mqtt_connect_opts);
```

Now you are ready to form your query.

## Message query

Let's say that we have some data source that generates a stream of data, e.g., a sensor reading. Here we
will simulate a sensor with the `simstream()` function. Let's also say that we are only interested in
positive sensor values. And whenever there is a positive sensor value we want to publish the value and
a timestamp as JSON to an MQTT broker.

We start by defining the function that extracts the sensor stream (`simstream()`) that emits a value
every .1 second, filters the stream values (`v > 0`), adds a timestamp (`ts()`), and wraps the result
in a stream of JSON strings (`json:stringify()`).

```LIVE
create function my_json_stream() -> Stream of Charstring
  as select streamof(json:stringify(ts(v)))
       from number v
      where v in simstream(0.1)
        and v > 0;
```

You should prepare a MQTT client that listens to the `my/experimental` topic so you can verify that the results
of the function are published. Do this in a command terminal by running the following command.

```shell
mosquitto_sub -h test.mosquitto.org -t my/experimental
```

Now you can run the `my_json_stream()` function and publish the messages on the MQTT by running the
following query.

```LIVE
publish(my_json_stream(), "mqtt:my/experimental");
```

The command terminal should show the messages as received looking something like this.

```
{"sa_time": "2022-01-26T09:46:34.290Z", "sa_value": 0.135167884385362}
{"sa_time": "2022-01-26T09:46:34.490Z", "sa_value": 0.112810435340008}
{"sa_time": "2022-01-26T09:46:34.590Z", "sa_value": 0.81064465289327}
{"sa_time": "2022-01-26T09:46:34.690Z", "sa_value": 1.05985752222502}
{"sa_time": "2022-01-26T09:46:34.790Z", "sa_value": 0.269298018030197}
{"sa_time": "2022-01-26T09:46:34.990Z", "sa_value": 0.838084629438005}
{"sa_time": "2022-01-26T09:46:35.090Z", "sa_value": 1.96788004638127}
{"sa_time": "2022-01-26T09:46:35.190Z", "sa_value": 1.26667751609015}
{"sa_time": "2022-01-26T09:46:35.390Z", "sa_value": 0.0685725375948125}
...
```

## Custom message structure

The example in the previous section used `json:stringify()` on a timestamp object. This automatically produces
the default data names "sa_time" and "sa_value". If we want to have custom names we can call `json:stringify()` on
a JSON object where we define the data names ourselves.

```LIVE
create function my_custom_json_stream() -> Stream of Charstring
  as select stream of json:stringify({
   "my_value": v, "my_time": utc_time(now()) })
       from number v
      where v in simstream(0.1)
        and v > 0;
```

If we then call bublish on our new function:

```LIVE
publish(my_custom_json_stream(), "mqtt:my/experimental");
```

Then our listening MQTT client in the command terminal will show the messages with our custom data names:

```
{"my_value":0.135167884385362,"my_time":"2022-01-27T14:11:42.572Z"}
{"my_value":0.112810435340008,"my_time":"2022-01-27T14:11:42.772Z"}
{"my_value":0.81064465289327,"my_time":"2022-01-27T14:11:42.872Z"}
{"my_value":1.05985752222502,"my_time":"2022-01-27T14:11:42.972Z"}
{"my_value":0.269298018030197,"my_time":"2022-01-27T14:11:43.072Z"}
{"my_value":0.838084629438005,"my_time":"2022-01-27T14:11:43.272Z"}
{"my_value":1.96788004638127,"my_time":"2022-01-27T14:11:43.372Z"}
{"my_value":1.26667751609015,"my_time":"2022-01-27T14:11:43.472Z"}
{"my_value":0.0685725375948125,"my_time":"2022-01-27T14:11:43.672Z"}
{"my_value":1.96960299888449,"my_time":"2022-01-27T14:11:43.772Z"}
...
```
