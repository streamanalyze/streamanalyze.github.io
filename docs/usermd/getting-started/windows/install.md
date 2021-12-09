# Connecting Windows device to your federation

> [live-only]
> From the sandbox you can connect it by using the device hub
> <div class="CTACont">
> <a class="CTABtn" role="button" href="#/device_hub/getStarted/Windows">
> <span>Go to Device Hub</span>
> </a>
> </div>
> You can still read through this guide if you wish to learn how to connect edge devices manually.

## Download and start SA Engine on your edge device

Now that you have signed up it is time to download and start an instance of the SA Engine on your Windows machine.

**1.** Go to the [download page](https://studio.streamanalyze.com/download).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio-download.png" alt="streamanalyze-com-studio-download.png" width="800"/>


**2.** Scroll down to the bottom and download `sa_engine_core_win_x64.zip`.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio-download-bottom.png" alt="streamanalyze-com-studio-download-bottom.png" width="800"/>


**3.** Extract the zip archive.

**4.** Open the Windows command prompt and navigate to the `sa.engine\bin` folder.

```shell
> cd \path\to\sa.engine\bin
```

**5.** Start SA Engine.

```shell
> sa.engine
```

This prints the SA Engine database image, version number and presents a prompt.

```shell
Database image: sa.engine.dmp
Release 3, v5, 64 bits
[sa.engine] 1>
```


## Connect your edge device to the server

Now that you have SA Engine installed on your Windows machine it is time to start a server in the cloud and connect your local SA Engine instance to the server as an edge device.

**1.** Go back to the SA Studio Community Edition [landing page](https://studio.streamanalyze.com/).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio.png" alt="streamanalyze-com-studio.png" width="800"/>

**2.** Start SA Studio with the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/go-to-studio-button.png" alt="go-to-studio-button.png" width="100" /> button. This will be your server instance.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" width="800"/>


**3.** Go to the "connect edge devices" page by clicking the ![Connect edge devices](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-edge-icon.png "Connect edge devices") icon in the top left row.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges.png" alt="sa-studio-connect-edges.png" width="800"/>


**4.** Under **Add clients or edges to the federation** change the name in the client name text field from "edge" to "win-edge".

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-input-win-edge.png" alt="sa-studio-connect-edges-input-win-edge.png" width="300"/>

**5.** Copy the large text blob in the section **Connect as edge using base64 blob from within sa.engine** to the clipboard and paste it into a new text file (e.g., "connect.osql").

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-copy-connection-blob.png" alt="sa-studio-connect-edges-copy-connection-blob.png" width="800"/>

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-blob-notepad.png" alt="connect-blob-notepad.png" width="500"/>


**6.** Go back to SA Engine in your Windows CMD prompt and execute the contents of the text file.

```shell
[sa.engine] 1> < "connect.osql";
```

This connects the local instance of SA Engine to the server. The local SA Engine should print a message confirming that it is awaiting queries from the server.

```shell
2021-10-18T13:57:11.212 Edge WIN-EDGE waiting for query from SERVER...
```

Your browser should also show your Windows machine as "WIN-EDGE" in the list of **Connected edge-devices** accessed under Edges in the left menu column. You might have to click the refresh icon at the top of the list for "WIN-EDGE" to show up.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges-edge-list.png" alt="sa-studio-connect-edges-edge-list.png" width="800"/>

