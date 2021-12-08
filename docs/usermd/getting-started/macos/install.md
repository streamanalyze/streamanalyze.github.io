# Connecting macOS device to your federation
LIVE-ONLY> 
Since you are running inside a live  environment you can go directly to Device Hub -> getting started:

CTA>##/device_hub/getStarted/macOS|||Go to Device Hub

 
You can still read through this guide if you wish to learn how to connect edge devices manually.



> [note]  **Note:** This guide requires Java to run. To check if you have Java installed open Terminal on your Mac and run the following command.

```shell
$ java -version
```

The command should print out the version number of Java if Java is installed. If Java is not installed you can download and install the appropriate version from [Oracle's Java Download Page](https://www.oracle.com/downloads/). 
## Download and start SA Engine on your edge device

Now that you have signed up it is time to download and start an instance of the SA Engine on your Mac.

**1.** Go to the [download page](https://studio.streamanalyze.com/download).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/streamanalyze-com-studio-download.png" alt="streamanalyze-com-studio-download.png" width="800"/>


**2.** Scroll down to the bottom and copy the large text blob.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/streamanalyze-com-studio-download-bottom.png" alt="streamanalyze-com-studio-download-bottom.png" width="800"/>


**3.** Open the Mac Terminal, paste the text from the clipboard and press return.

This downloads and starts sa.engine. The terminal should display the version number and sa.engine command prompt.

```shell
Database image: sa.engine.dmp
Release 4, v0, 64 bits
[sa.engine] 1>
```


## Connect your edge device to the server

Now that you have SA Engine installed on your Mac it is time to start a server in the cloud and connect your local SA Engine instance to the server as an edge device.

**1.** Go back to the SA Studio Community Edition [landing page](https://studio.streamanalyze.com/).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio.png" alt="streamanalyze-com-studio.png" width="800"/>

**2.** Start SA Studio with the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/go-to-studio-button.png" alt="go-to-studio-button.png" width="100" /> button. This will be your server instance.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" width="800"/>


**3.** Go to the "connect edge devices" page by clicking the ![Connect edge devices](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-edge-icon.png "Connect edge devices") icon in the top left row.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges.png" alt="sa-studio-connect-edges.png" width="800"/>


**4.** Under **Add clients or edges to the federation** change the name in the client name text field from "edge" to "mac-edge".

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-connect-edges-input-mac-edge.png" alt="sa-studio-connect-edges-input-mac-edge.png" width="300"/>


**5.** Copy the large text blob in the section **Connect as edge using base64 blob from within sa.engine** to the clipboard, paste it into the Terminal window at the sa.engine prompt and press return.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-copy-connection-blob.png" alt="sa-studio-connect-edges-copy-connection-blob.png" width="800"/>


This connects the local instance of SA Engine to the server (this might take up to a minute). Once the device has connected to the server sa.engine should print a message confirming that it is awaiting queries.

```shell
...
V1JmUUtiZ2twdz09XG4tLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLVxuIiwi
aXAtZ2V0dGVyIjoiaHR0cHM6Ly9zdHVkaW8uc3RyZWFtYW5hbHl6ZS5jb20vdXNl
ci9pcC9iV0ZuYm5WekxtZGxaR1JoUUhOMGNtVmhiV0Z1WVd4NWVtVXVZMjl0In0=
','mac-edge',true);

2021-11-08T17:37:17.216 Edge MAC-EDGE waiting for query from SERVER...
```

Your browser should also show your Mac as "MAC-EDGE" in the list of **Connected edge-devices** accessed under Edges in the left menu column. You might have to click the refresh icon at the top of the list for "MAC-EDGE" to show up.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-connect-edges-edge-list.png" alt="sa-studio-connect-edges-edge-list.png" width="800"/>