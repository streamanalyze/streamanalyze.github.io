# Secure MQTT

SA Engine offers secure MQTT using transport layer encryption via TLS.

In this section we will use the publicly available MQTT broker
[test.mosquitto.org](https://test.mosquitto.org/) which supports communication using TLS.

We also use the command line tools `mosquitto_pub` and `mosquitto_sub` that come bundled
with [Eclipse Mosquitto](https://mosquitto.org/), an
open source MQTT broker, for sending and receiving MQTT messages on the command line.

## Registering client

First you have to load the MQTT extension if you haven't already done so.

```LIVE
loadsystem(startup_dir()+"../extenders/sa.mqtt","mqtt.osql");
```

Now you have to set the connection options. The difference in this case compared to the
regular example is that we provide the default TLS port `8883` in our connection
setting. We also specify a certificate file `mosquitto.org.crt` (this is the default CA file
provided by mosquitto to verify the server connection and can be downloaded
[from here](https://test.mosquitto.org/ssl/mosquitto.org.crt)).

```LIVE
set :mqtt_connect_opts = {
    "qos": 1,
    "connection": "ssl://test.mosquitto.org:8883",
    "cafile": sa_home() + "models/mqtt-tutorial/mosquitto.org.crt",
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

## Publish messages using TLS

Now that you have registered your client to use TLS you simply publish messages in the same
way as for regular unencrypted TCP communication.

Before you publish any messages you should subscribe to the topic so you can verify that the messages
get published. Run the following command in your terminal to subscribe to the topic `my/experimental`.
We did this in the regular example with another broker without TLS, but now we use TLS
so any messages containing sensitive information won't be sent in clear text.

```shell
mosquitto_sub -h test.mosquitto.org -p 8883 --cafile mosquitto.org.crt -t my/experimental
```

Now you can publish messages from SA Engine using the following query.

```LIVE
publish(streamof("My first secure message!"), "mqtt:my/experimental");
```

The message should appear in your command terminal as received.

```
My first secure message!
```

