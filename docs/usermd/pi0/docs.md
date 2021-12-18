# Raspberry pi zero with environphat.
This document will walk you through how to connect a raspberry pi zero with an Environphat. 

**Hardware**:
* [Raspberry Pi Zero](https://www.electrokit.com/en/product/raspberry-pi-zero-wh-board-with-header-2/)
* [Enironphat](https://www.electrokit.com/en/product/enviro-phat-2/?gclid=Cj0KCQiAhf2MBhDNARIsAKXU5GTj4jVE8YJU4d5xfWGjLHyRI14ME42Z2qcb6KO7gCKGTk6dFcMsud4aAlzMEALw_wcB)





> [live-only] **Note:** Before following this guide make sure that you have installed sa.engine and connected your Raspberry Pi Zero to your federation. See [Getting started](#/docs/&load_external=streamanalyze.com/getting-started&goto=getting-started/README.md).

## Configuring the pi zero.
Deploy the `pi0` model to your Raspberry Pi Zero:

```LIVE
deploy_model(["pi0-edge"],"pi0");
```

Start the sensor process:

```LIVE {"peer":"Pi0-edge"}
start_phat();
```

Get a signal stream from the accelerometer:

```LIVE {"vis":"showLine","peer":"Pi0-edge"}
Signal_stream("accelerometer");
```

Look at the signals available on your Raspberry Pi Zero:

```LIVE {"peer":"Pi0-edge"}
signals();
```

## Conclusion
Congratulations you've streamed your first sensor data from a Raspberry Pi Zero. Now you can try to apply the [detect-shake model](/docs/md/tutorial/edge-query.md) on this data stream to get started with some edge analytics!

This tutorial uses the function `csv:socket_stream` function to read sensor data from a TCP socket.

Take a look at `environphat.py` in the model to see how the sensor process can be implemented in python.
You can easily use the same methodology for any type of sensor. As long as you can accept a TCP socket and print CSV to it this method is a very fast and easy way of getting sensor data into SA Engine.