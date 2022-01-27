# Simple MQTT example

In this section we will use the publicly available MQTT broker
[test.mosquitto.org](https://test.mosquitto.org/) which supports communication using TLS.

We also use the command line tools `mosquitto_pub` and `mosquitto_sub` that come bundled
with [Eclipse Mosquitto](https://mosquitto.org/), an
open source MQTT broker, for sending and receiving MQTT messages on the command line.

## Load MQTT extension and connect to the broker

To use MQTT in SA Engine you first have to load the MQTT extension.

```LIVE
loadsystem(startup_dir()+"../extenders/sa.mqtt","mqtt.osql");
```

Then you have to specify your connection options.

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

All available connection options are listed in the docs for `mqtt:register_client()`.

```LIVE
doc("mqtt:register_client");
```

## Listen for messages

Now that we are connected to the broker we can use the `subscribe()` function to listen
to a topic.

```LIVE
select charstring(b)
from binary b
where b in subscribe("mqtt:my/experimental");
```

The query will run until turned off and show any messages that are posted in the `my/experimental` topic.

Keep the query above running and post a message to the topic by running the following command in a terminal.

```shell
mosquitto_pub -h test.mosquitto.org -t my/experimental -m "Hello, SA Engine!"
```

The message should appear in the result for the `subscribe()` query.

```
"Hello, SA Engine!"
```

## Publish messages

Now we are going to publish messages on the `my/experimental` topic from SA Engine. Ensure that you
have stopped the `subscribe()` query above and start listening to the `my/experimental` topic from
a command terminal by running the following command.

```shell
mosquitto_sub -h test.mosquitto.org -t my/experimental
```

Once the command terminal is listening you can run the following query in SA Engine.

```LIVE
publish(streamof("My first message!"), "mqtt:my/experimental");
```

This publishes the message "My first message!" and the command terminal listening for
messages on the topic `my/experimental` should display it as received.

```
My first message!
```

## Sending and receiving JSON

To send a message as JSON, simply publish a JSON object instead of a string.

```LIVE
publish(streamof({"message": "My first JSON message!"}),
        "mqtt:my/experimental");
```

The command terminal listening for messages on the `my/experimental` topic displays
the JSON message as received.

```
{"message":"My first JSON message!"}
```

To listen for JSON messages in SA Engine you simply receive the JSON as a string and then
unpack the JSON object.

```LIVE
select json:unstringify(charstring(b))
from binary b
where b in subscribe("mqtt:my/experimental");
```

Start the above query and then run the following command in a command terminal to send a
JSON message on the `my/experimental` topic.

```shell
mosquitto_pub -h test.mosquitto.org -t my/experimental -m "{\"message\": \"Here comes JSON\!\"}"
```

The query listening for JSON messages should display the message as received.

```
{"message":"Here comes JSON!"}
```

