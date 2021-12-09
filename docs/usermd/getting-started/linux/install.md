# Installing sa.engine on your Linux.

> [live-only]
> From the sandbox you can connect it by using the device hub
> <div class="CTACont">
> <a class="CTABtn" role="button" href="#/device_hub/getStarted/Linux">
> <span>Go to Device Hub</span>
> </a>
> </div>
> You can still read through this guide if you wish to learn how to connect edge devices manually.



## Download and start SA Engine on your edge device

Now that you have signed up it is time to download and start an instance of the SA Engine on your Linux. Make sure you have an open SSH session to your machine before continuing this guide.

**1.** Go to the [download page](https://studio.streamanalyze.com/download#tlinux). and copy the download command (see image):

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-linux-edge/linux-download.png" alt="linux-download.png" width="800"/>


**2.** Paste the copied command into the ssh session on the Linux machine. This command will download, extract and start sa.engine on your machine.

```
$ rm -rf sa.engine ; curl -o "sa.engine_core.tar.gz" "https://s3.eu-north-1.amazonaws.com/release.streamanalyze.com/v4.1.0/linux/sa_engine_core_linux_x64.tar.gz?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA44LHM4CBZRR57GJU%2F20211125%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20211125T205231Z&X-Amz-Expires=3600&X-Amz-Signature=4c3db23dc821ac8aaf8c1c8aab59c2e8092f4c3c9c806d88c7faad8581296784&X-Amz-SignedHeaders=host" && tar -xzf sa.engine_core.tar.gz && rm sa.engine_core.tar.gz && cd sa.engine/bin && ./sa.engine
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3228k  100 3228k    0     0  9304k      0 --:--:-- --:--:-- --:--:-- 9304k
Database image: sa.engine.dmp
Release 4, v1, 64 bits
[sa.engine] 1>
```**3. (optional)** If you do not wish to use this command you can download the archive `sa_engine_core_linux_x64.tar.gz` to your PC and then transfer it to your Linux in any way you see fit.




## Connect your edge device to the server

Now that you have SA Engine installed on your Linux it is time to start a server in the cloud and connect your local SA Engine instance to the server as an edge device.

**1.** Go back to the SA Studio Community Edition [landing page](https://studio.streamanalyze.com/).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio.png" alt="streamanalyze-com-studio.png" width="800"/>

**2.** Start SA Studio with the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/go-to-studio-button.png" alt="go-to-studio-button.png" width="100" /> button. This will be your server instance.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" width="800"/>


**3.** Go to the "connect edge devices" page by clicking the ![Connect edge devices](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-edge-icon.png "Connect edge devices") icon in the top left row.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges.png" alt="sa-studio-connect-edges.png" width="800"/>


**4.** Under **Add clients or edges to the federation** change the name in the client name text field from "edge" to "linux-edge".

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-linux-edge/sa-studio-connect-edges-input-linux-edge.png" alt="sa-studio-connect-edges-input-linux-edge.png" width="300"/>

**5.** Copy the large text blob in the section **Connect as edge using base64 blob from within sa.engine** to the clipboard, and paste it into the sa.engine prompt on your Linux machine. This will connect the sa.engine instance to your SA Studio Community Edition federation:
<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-copy-connection-blob.png" alt="sa-studio-connect-edges-copy-connection-blob.png" width="800"/>



<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-linux-edge/linux-edge-connected.png" alt="linux-edge-connected.png" width="800"/>

> [note]   **Note:** You can change the call `connect_using_config_blob` to `reconnect_using_config_blob` if you want the linux-edge to override the current peer when connecting. You can also put this command inside an file of your choide (e.g. `connect.osql`) and then make sa.engine load the file, and connect as an edge, with the `-O` flag: 

```
./sa.engine -O connect.osql
``` Verify that your Linux edge is connected by running the query:


```LIVE
listening_edges();
```

