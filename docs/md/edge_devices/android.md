#Android
This section will go through how to download the Edge Analyzer app for Android,
connect the device to your Stream Server and send queries to the Edge through
sa.studio.


##Downloading the Edge Analyzer app
Login to [http://release.streamanalyze.com/](http://release.streamanalyze.com/)
on your Android phone using the credentials retrieved from Stream Analyze. Once
logged in follow the instructions on the page for how to install the Edge 
Analyzer on your Android device.

##Setting up the Edge Analyzer app

Before connecting the Edge Analyzer to your local Stream Server; make sure that
the Android device is on the same WLAN as your PC. Once the Android device is
on the same WLAN as your PC you need to find out the local IP of your PC on the
WLAN.

###Obtaining your local IP on a Windows PC
On windows you can issue the command `ipconfig` in the command prompt to get a
list of all network adapters and their corresponding IP addresses. 

- Open up a command prompt by pressing the *Windows* button in the lower left
corner of your desktop and start typing **cmd**. Start the program **Command
Prompt** that is shown in your search results.

- Once the command prompt is opened enter the command `ipconfig` and then press
enter.

- You will now get a list of what IP addresses your PC has available. Go 
through the output and find the adapter with a name including *WiFi*, *WLAN*, or
*LAN* and it's corresponding IP. See the image below as an example:

<img src="/docs/images/windows_ipconfigpng.png">

###Obtaining your local IP on a MacBook pro
You can find any Macs IP, or your IP address from the Mac System Preferences 
Network configuration screen:

- From the Apple menu pull down “System Preferences”
- Click on the “Network” preference pane
- Your IP address will be visible to the right, as indicated in the screenshot 
below:

<img src="/docs/images/ip-address-mac.jpg">
###Obtaining your local IP on a Linux PC
Obtaining the IP address on a Linux PC is similar to Windows. Open up a 
terminal and enter the command `ifconfig` and find the correct interface and 
its IP address.



###Connecting the Edge Analyzer app to your local Stream Server.
Now that the Android device is on the same WLAN as your PC and you have the 
local IP address of your PC `local-ip-address` you are ready to connect the 
Android device as an edge.

- Start by opening the **Edge Analyzer** app that you installed earlier. You 
should now see the main screen of the application.

- Enter the string `"android1@local-ip-address"` into the text field 
`"Edge connection string`, replacing `"local-ip-address"` with the local IP 
address for your PC.

- Press **CONNECT**. You should now see a message *Edge ANDROID1 waiting for 
query from NAMESERVER...* below the buttons. Below is an animated gif that 
shows you the process of connecting the Edge Analyzer to the Stream Server.

<img src="/docs/images/edge_analyzer_guide.gif">

Your Edge Analyzer is now connected to the Stream Server. Test it you by looking
at the signal stream from the device accelerometer:

```LIVE{"peer":"Android1", "vis":"showLine"}
signal_stream("accelerometer");
```

The **Edge Analyzer** app is a pre build example application built using the 
sa.android SDK. Check out the subsection sa.android SDK for details on how to
create your own edge analyzer application or integrating it into your existing
app.
