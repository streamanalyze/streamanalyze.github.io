# Installing sa.engine on your Raspberry Pi.
LIVE-ONLY> 
Since you are running inside a live  environment you can go directly to Device Hub -> getting started:

CTA>##/device_hub/getStarted/RPI|||Go to Device Hub

 
You can still read through this guide if you wish to learn how to connect edge devices manually.



## Download and start SA Engine on your edge device

Now that you have signed up it is time to download and start an instance of the SA Engine on your Raspberry Pi. Make sure you have an open SSH session to your Raspberry Pi before continuing this guide.

**1.** Go to the [download page](https://studio.streamanalyze.com/download).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/pi-download.png" alt="pi-download.png" width="800"/>


**2.** Scroll down to the bottom and download `sa_engine_core_linux_armv7.tar.gz` (or `sa_engine_armv6.tar.gz` for the Pi Zero) and click the clipboard icon (see the red arrow in the picture). This will copy a command that you can just paste into the ssh session of your Raspberry Pi

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/pi-image-download-link.png" alt="pi-image-download-link.png" width="600"/>

```
pi@pi-gw2:~ $ curl -o "sa_engine_core_linux_armv7.tar.gz" "<LONG-DOWNLOAD-URL>"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3147k  100 3147k    0     0  3540k      0 --:--:-- --:--:-- --:--:-- 3544k
pi@pi-gw2:~ $ ls -la | grep sa_engine
-rw-r--r--  1 pi   pi   3222714 Nov  9 10:03 sa_engine_core_linux_armv7.tar.gz
```
If using Raspberry Pi Zero:



<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/pi0-image-download-link.png" alt="pi-image-download-link.png" width="600"/>



```
pi@rpi03:~ $ curl -o "sa_engine_armv6.tar.gz" "<LONG-DOWNLOAD-URL>"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 2725k  100 2725k    0     0  2206k      0  0:00:01  0:00:01 --:--:-- 2208kl
pi@rpi03:~ $ ls -la | grep sa_engine
-rw-r--r-- 1 pi   pi   2790410 Nov  9 09:05 sa_engine_armv6.tar.gz
```

<**3. (optional)** If you do not wish to use this command you can download the archive `sa_engine_core_linux_armv7.tar.gz`  or `sa_engine_armv6.tar.gz` to your PC and then transfer it to your home directory on the Raspberry Pi in any way you see fit.


**4.** In your open SSH session where you are logged into the Raspberry Pi, extract the `sa_engine_core_linux_armv7.tar.gz`   (or `sa_engine_armv6.tar.gz` for the Pi Zero) and cd into `sa.engine/bin`.

```shell
pi@pi-gw2:~ $ tar -xzf sa_engine_core_linux_armv7.tar.gz
pi@pi-gw2:~ $ cd sa.engine/bin
pi@pi-gw2:~/sa.engine/bin $
```

**5.** Start SA Engine by executing `./sa.engine`.

```shell
pi@pi-gw2:~/sa.engine/bin $ ./sa.engine
```

This prints the SA Engine database image, version number and presents a prompt.

```shell
Database image: sa.engine.dmp
Release 4, v0, 32 bits
[sa.engine] 1>
```

Exit sa.engine by typing `quit;` and press enter.

```sh
[sa.engine] 1> quit;
pi@pi-gw2:~/sa.engine/bin $
```

## Connect your edge device to the server

Now that you have SA Engine installed on your Raspberry Pi it is time to start a server in the cloud and connect your local SA Engine instance to the server as an edge device.

**1.** Go back to the SA Studio Community Edition [landing page](https://studio.streamanalyze.com/).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio.png" alt="streamanalyze-com-studio.png" width="800"/>

**2.** Start SA Studio with the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/go-to-studio-button.png" alt="go-to-studio-button.png" width="100" /> button. This will be your server instance.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" width="800"/>


**3.** Go to the "connect edge devices" page by clicking the ![Connect edge devices](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-edge-icon.png "Connect edge devices") icon in the top left row.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges.png" alt="sa-studio-connect-edges.png" width="800"/>


**4.** Under **Add clients or edges to the federation** change the name in the client name text field from "edge" to "pi-edge".

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-connect-edges-input-pi-edge.png" alt="sa-studio-connect-edges-input-pi-edge.png" width="300"/>

**5.** Copy the large text blob in the section **Connect as edge using base64 blob from within sa.engine** to the clipboard, open a new file "connect.osql" on the Raspberry Pi using nano (or your preffered editor) and paste your clipboard content.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-copy-connection-blob.png" alt="sa-studio-connect-edges-copy-connection-blob.png" width="800"/>

```sh
pi@pi-gw2:~/sa.engine/bin $ nano connect.osql
```

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-connect-edges-paste-pi-connblob.png" alt="sa-studio-connect-edges-paste-pi-connblob.png" width="800"/>

> [note]   **Note:** You can change the call `connect_using_config_blob` to `reconnect_using_config_blob` if you want the pi-edge to override the current peer when connecting. 

Save the file with `Ctrl+o` and press `Enter`. Then exit nano with `Ctrl+x`.


**6.** Go back to your ssh session and start SA Engine on the Raspberry Pi.

```shell
./sa.engine
Database image: sa.engine.dmp
Release 4, v0, 32 bits
[sa.engine] 1>
```

Execute the contents of the text file by loading `connect.osql`.

```sh
[sa.engine] 1> < "connect.osql";
```

This connects the local instance of SA Engine to the server. The local SA Engine should print a message confirming that it is awaiting queries from the server.

```shell
2021-11-08T10:13:42.437 Edge PI-EDGE waiting for query from SERVER...
```

Your browser should also show your Raspberry Pi machine as "PI-EDGE" in the list of **Connected edge devices**. You might have to click the refresh icon at the top of the list for "PI-EDGE" to show up.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-connect-edges-list-connected.png" alt="sa-studio-connect-edges-list-connected.png" width="800"/>