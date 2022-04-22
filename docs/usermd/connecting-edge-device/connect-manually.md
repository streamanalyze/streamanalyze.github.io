# How to manually connect a device to the server

To be able to monitor sensor streams and deploy models to a device you first need to connect the device to a server. Connecting an edge device is generally comprised of three steps.

1. Download and install the SA Engine edge client on the device.
2. Start SA Engine on the device.
3. Execute a connect query on the device.


## 1. Getting SA Engine onto the edge device

SA Engine edge clients are available for download on the download page https://studio.streamanalyze.com/download. You must be signed in to access the download page. There you can find clients for all supported platforms. Some platforms have dedicated tabs on the download page with instructions on how to install the client for that specific platform. All other clients can be found on the “All” tab. Each client file has a copy button next to its name. Clicking the button will copy a curl command for downloading the file to the clipboard. This makes it convenient to download the file directly to the device by executing the curl command on the device.

## 2. Starting the client

How the client is started differs between platforms. For Android it is enough to install the app, but on most other platforms you will have to run the `sa.engine` CLI command.

## 3. Connecting the client

To connect the client to the server you must follow the instructions under “Connect edge” in the Devices tab of SA Studio. For Android this consists of scanning a QR code with the app, but on most other platforms you must run a `connect_using_config_blob` query inside the SA Engine CLI.
