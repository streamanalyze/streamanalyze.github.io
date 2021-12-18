> [note]   **Note:** Prerequisite(s): [Install on Android](/docs/usermd/getting-started/android/install.md) 

# Connecting Android device to your federation
> [live-only] Since you are running inside a live  environment you can go directly to Device Hub -> getting started:
> <div class="CTACont">
> <a class="CTABtn" role="button" href="#/device_hub/getStarted/Android">
> <span>Go to Device Hub</span>
> </a>
> </div>
> You can still read through this guide if you wish to learn how to connect edge devices manually.

## Download and start the SA Edge app

Now that you have signed up, it is time to download and start an instance of the SA Edge app on your Android device.

**1.** Go to the [download page](https://studio.streamanalyze.com/download).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/streamanalyze-com-studio-download-android.png" alt="streamanalyze-com-studio-download-android.png" style="width:100%"/>

**2.** Scan the QR code to download, install and open the SA Edge app. **Note:** To install this app from the download page you must be able to "side load" applications. [Read more about side loading here.](https://android.gadgethacks.com/how-to/android-101-sideload-apps-by-enabling-unknown-sources-install-unknown-apps-0161947/)

<table>
<td><img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-download-qr.jpg" alt="android-app-download-qr.jpg" width="200"/></td>
<td><img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-install.jpg" alt="android-app-install.jpg" width="200"/></td>
<td><img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-open.jpg" alt="android-app-open.jpg" width="200"/></td>
</table>

The app should say that it is not yet configured and needs a sa.studio connection. This means that the app has been installed correctly and is awaiting further instructions.


## Connect your edge device to the server

Now that you have the SA Engine app installed on your Android device it is time to start a server in the cloud and connect your phone the server as an edge device.

**1.** Go back to the SA Studio Community Edition [landing page](https://studio.streamanalyze.com/).

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/streamanalyze-com-studio.png" alt="streamanalyze-com-studio.png" style="width:100%"/>

**2.** Start SA Studio with the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/go-to-studio-button.png" alt="go-to-studio-button.png" width="100" /> button. This will be your server instance.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" style="width:100%"/>


**3.** Go to the "connect edge devices" page by clicking the ![Connect edge devices](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/connect-edge-icon.png "Connect edge devices") icon in the top left row.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-connect-edges.png" alt="sa-studio-connect-edges.png" style="width:100%"/>


**4.** Change the name in the client name text field under **Add clients or edges to the federation** from "edge" to "android-edge".

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-connect-edges-input-android-edge.png" alt="sa-studio-connect-edges-input-android-edge.png" width="300"/>

**5.** Open the SA app on your Android device and click the "SETUP" button. This will activate the camera so you can scan a QR code. You will have to give the SA app permission to use the camera for this step.

<table>
<td><img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-open.jpg" alt="android-app-open.jpg" width="200"/></td>
<td><img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-cam-permission.jpg" alt="android-app-cam-permission.jpg" width="200"/></td>
</table>


**6.** Scan the QR code in the section **QR code for connecting android device** and select "CONNECT" to connect the app to the server.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-connect-edges-qr-code.png" alt="sa-studio-connect-edges-qr-code.png" style="width:100%"/>

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-ready-to-connect.jpg" alt="android-app-ready-to-connect.jpg" width="200"/>

**7.** The SA app should now display a message saying that it is connected to the server and show the host address.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/android-app-connected.jpg" alt="android-app-connected.jpg" width="200"/>


**8.** Check that your edge is listed as a connected device on the Edges page in SA Studio. It should appear in the list as ANDROID-EDGE.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-connect-edges-edge-list.png" alt="sa-studio-connect-edges-edge-list.png" style="width:100%"/>

