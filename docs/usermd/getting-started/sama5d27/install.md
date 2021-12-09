# Install on SAMA5D27
This guide assumes that you have installed a Linux based operating system with glibc on your [SAMA5D27](https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-8-processors:IMX8-SERIES). 
If you are using a configuration that does not have glibc or Linux on your SAMA5D27 contact us at hello@streamanalyze.com and let us know. SA Engine can be built against any of the standard C libraries and OS:es.



> [note]  **Note:** Before starting this guide make sure that you have an active terminal session to your device, either via SSH or USBTTY. 



## Download sa.engine package.
Go to [the download page](https://studio.streamanalyze.com/download#tgeneral) and click the clipboard icon next to the SAMA5D27 download:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/sama5d27_download.png" alt="sama5d27_download.png" style="width:100%"/>


This will copy a CURL command that will download the package to your SAMA5D27. Paste the copied command into your terminal session:

```
$ curl -o "sa_engine_core_linux_armv7.tar.gz" "https://s3.eu-north-1.amazonaws.com/release.streamanalyze.com/v4.1.0/RPI/sa_engine_core_linux_armv7.tar.gz?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA44LHM4CBZRR57GJU%2F20211125%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20211125T212132Z&X-Amz-Expires=3600&X-Amz-Signature=c57f24533794b455fdcb0efdeba20086874522b0bc88764d3a8878008373abf9&X-Amz-SignedHeaders=host"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 2556k  100 2556k    0     0  6657k      0 --:--:-- --:--:-- --:--:-- 6674k
johan@LAPTOP-58C0OPOI:~/temp$ ls -la | grep tar.gz
-rw-r--r--  1 johan johan 2617829 Nov 25 22:32 sa_engine_imx8.tar.gz
```

> [note]  **Note:** If your distribution of Linux does not have CURL but wget you can use wget instead:
```
wget -O "TARBALL_NAME" "DOWNLOAD_URL"
```
Or you can download the file manually and transfer it to your edge device by your method of choice. 

Now untar the package:

```
tar -xzf sa_engine_core_linux_armv7.tar.gz
```

Start sa.engine:
```
$ ./sa.engine/bin/sa.engine
Database image: sa.engine.dmp
Release 4, v1, 64 bits
[sa.engine] 1>
```


## Connect your edge device to the server

Now that you have SA Engine installed on your SAMA5D27 it is time to start a server in the cloud and connect your local SA Engine instance to the server as an edge device.

**1.** Go back to the SA Studio Community Edition [landing page](https://studio.streamanalyze.com/).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio.png" alt="streamanalyze-com-studio.png" style="width:100%"/>

**2.** Start SA Studio with the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/go-to-studio-button.png" alt="go-to-studio-button.png" width="100" /> button. This will be your server instance.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" style="width:100%"/>


**3.** Go to the "connect edge devices" page by clicking the ![Connect edge devices](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-edge-icon.png "Connect edge devices") icon in the top left row.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges.png" alt="sa-studio-connect-edges.png" style="width:100%"/>


**4.** Under **Add clients or edges to the federation** change the name in the client name text field from "edge" to a desired name.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/edge-name.png" alt="edge-name.png" />

**5.** Copy the large text blob in the section **Connect as edge using base64 blob from within sa.engine** to the clipboard, and paste it into the sa.engine prompt on your Linux machine. This will connect the sa.engine instance to your SA Studio Community Edition federation:
<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-copy-connection-blob.png" alt="sa-studio-connect-edges-copy-connection-blob.png" style="width:100%"/>



<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-linux-edge/linux-edge-connected.png" alt="linux-edge-connected.png" style="width:100%"/>

> [note]  **Note:** You can change the call `connect_using_config_blob` to `reconnect_using_config_blob` if you want the edge to override the current peer when connecting. You can also put this command inside an file of your choice (e.g. `connect.osql`) and then make sa.engine load the file, and connect as an edge, with the `-O` flag: 

```
./sa.engine -O connect.osql
``` 

Verify that your edge is connected by running the query:


```LIVE
listening_edges();
```



