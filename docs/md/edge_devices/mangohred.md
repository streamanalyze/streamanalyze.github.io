# Getting started with the MangOH red with a wp76xx.

This section will describe how to connect a pre-configured MangOH red 
board running a Sierra Wireless [wp76xx](https://source.sierrawireless.com/resources/airprime/hardware_specs_user_guides/airprime_wp76xx_product_technical_specification/) module via a USB cable to a
stream server on the local PC.

## Windows users

In order to allow the MangOH red to connect to a Windows PC over the USB
cable the PC needs to have the drivers installed. The drivers can be downloaded 
from our [mirror](https://dl.streamanalyze.com/mangohred/GenericDriverSetup.exe) 
or from sierra wireless [home page](https://source.sierrawireless.com/resources/legato/drivers-for-wp75xx_wp76xx_wp8548-series-modules---build-4653/), which requires 
an account. Download the executable and run it. 

## All users
Start using the MangOH red as an edge device by plugging in the micro USB cable 
in the port located under the board, see the green rectangle in **Fig 1**. 

<img src="/docs/images/mangoh_red.jpg" style="width:500px;margin:auto;"/>

> **Fig 1** The MangOH red board.

Once the device gets power it will try to connect as an edge to the host 
machine. Run the following statement to get notified when it is up and running 
(it may take one or two minutes):

```LIVE
wait_for(["Mangoh"])
```

Once `true` is returned from the statement above the MangOH red is connected
and waiting for edge queries. Let's start by asking the MangOH what signals it 
has available:

```LIVE{"vis": "showText", "peer": "Mangoh"}
signals();
```

Lets look at the data coming from the accelerometer:

```LIVE{"vis": "showLine", "peer": "Mangoh"}
signal_stream("accelerometer");
```

The MangOH red device running a wp76xx module is now ready to be used as an 
edge device to the local PC.

# Using the wp76xx binaries to create a custom sa.engine app.
This section will outline how to create a custom application for the MangOH red
running a wp76xx. It will include:

- Installing the development tool chain for the MangOH red.
- Downloading the sa.engine package for wp76xx.
- Building the project from the command line.
- Installing the application on a MangOH red
- Configuring the app to automatically connect to an sa.engine Stream Server.

## Installing the development tool chain for MangOH red
Start by following the instructions for getting started from 
[mangoh.io](https://mangoh.io/mangoh-red-resources-getting-started). It is 
important that you follow the full tutorial before continuing to the next step.

## Downloading the sa.engine package for wp76xx
The binaries for sa.engine on wp76xx are downloaded [here](https://studio.streamanalyze.com/download/#tmangOHred). 
On windows a program that can handle tar.gz files needs to be installed, e.g. 
[7-zip](https://www.7-zip.org/). The tar.gz file contains a folder sa.mangoh 
which contains the sa.engine library, database image, header files and project 
files for building a MangOH red application. Furthermore it contains a file 
**sa_mangoh.wp76xx.update** which is the application pre-built. Unpack the 
archive at a location of your choice.

## Building the project from the command line
If running the development environment in the MangOH red virtual machine or on
a native Linux machine simply cd into the **sa.mangoh** folder and type:
```
make sa_deploy
```
This will clean and build the project and then install the application on your
MangOH red.

The command `make sa_deploy` will issue the following commands:
```
make clean
make wp76xx
update sa_mangoh.wp76xx.update 192.168.2.2
```

## Configuring the app to automatically connect to a Stream Server
At startup the application will look for a startup script by accessing the 
configuration option `sa_mangoh:/start_script` if there is no configuration set
for the application on the board it will enter the sa.engine top loop. To 
configure the MangOH red as the pre-configured ones ssh into the MangOH red
and set `sa_mangoh:/start_script` with the following commands:

```
ssh root@192.168.2.2

config set sa_mangoh:/start_script "edge_listener('mangoh@192.168.2.3');" string

app restart sa_mangoh
```

You should now be able to see `"MANGOH"` as one of the listening edges:
```LIVE
listening_edges();
```