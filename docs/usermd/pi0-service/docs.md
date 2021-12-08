# Raspberry pi zero setup
This document will walk you through how to connect a raspberry pi zero with an Environphat. 
The first part will walk you through the hardware steps for getting everything together.

Once we have the hardware in place we will go through how to configure your pi0
so that sa.engine can access the sensors on it and so that sa.engine always 
connects as an edge to your sa.studio - community.

## Get the hardware in place



> [warning] **WIP** 

## Configuring the pi zero.
In this model you can see the sensor meta-data model. We will set up two services
one service running sa.engine as an edge connected to your sa.studio and one 
service running a python program that can send sensor data into your sa.engine on 
demand. For your convenience you can install the Environphat service and an sa.engine
edge service on the raspberry pi by running `install.sh` in the downloaded package.

`install.sh` will install two services and ask for a connection blob for the raspberry pi edge.
 
## Configuring sa.engine
We will start by adding a file with the necessary information to connect to 
your sa.engine federation.

Copy a **Base64 encoded JSON blob** from the device hub and paste the content into a new file `~/SA/models/pi0/connect.json`. 

The last part of this stage is to create the sa.engine service. Look into `start.sh` inside the model on how sa.engine is started.

```
sudo ln -s ~/SA/models/pi0/sa.engine.service /etc/systemd/system/sa.engine.service
sudo systemctl daemon-reload
sudo systemctl start sa.engine.service
sudo systemctl enable sa.engine.service
```

In a few seconds your pi0 should be connected.


Or you can run `sudo install.sh` from the environphat folder.
