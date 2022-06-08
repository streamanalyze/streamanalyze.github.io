# Edge clients

This section goes through how to install edge clients on various
devices.   

To connect your device to an sa.engine federeration you first need to
install an **edge client** app on your device.  The edge client apps
can be downloaded from
[studio.streamanalyze.com/download](https://studio.streamanalyze.com/download)

Once you have downloaded and installed the edge client app, navigate
to the [Device Hub](/device_hub/) and select a connection
configuration blob for your kind of device from there.


## Android

The Android edge client app can be dowloaded from
[studio.streamanalyze.com/download](https://studio.streamanalyze.com/download).
Once installed, scan the QR code; then press connect. In the video
below you can see the flow from downloading the edge client app to
connecting it as an edge client to a **federation** of sa.engine
servers (SASes) accessible from SA Studio. <video style="width: 100%"
controls> <source
src="https://s3-eu-west-1.amazonaws.com/dl.streamanalyze.com/gifs/connect_android.webm"
type="video/webm"> Your browser does not support the video tag.
</video>


## Command line configuration

If you are using a regular OS shell under e.g. Linux, Windows or OSX,
the system can be configured using command line tools. You can either
copy the first configigutaion blob for your device and paste it inside
a running sa.engine, or you can copy the second one and paste in in a
shell where sa.engine is in your path.  In the video below you can see
the flow from downloading sa.engine to connecting it as an edge client
to the federation of a sa.studio community.

<video style="width: 100%"  controls>
<source src="https://s3-eu-west-1.amazonaws.com/dl.streamanalyze.com/gifs/connect_terminal_edge.webm" type="video/webm">
Your browser does not support the video tag.
</video>

## Manual configuration.

When manually connecting to a federation you need a couple of things:

1. A `name` for the peer you are connecting e.g. **edge1**
2. An `address` and `port` to the nameserver of the federation.
3. Certificates and Keys for accessing the federation if TSL is enabled.

If the federations TLS is not enabled you can simply connect an edge
client with name `name` to a federation at `address:port` with:

```
edge_listener("name@address:port");
```

When the federation has TLS enabled you will need to configure sa.engine
with a **Certificate Authority (CA) file**, **Certificate file for the peer**, 
and the **private key file** of the certificate of the peer.

You can enable security on an edge client by calling
```
enable_security(Charstring ca_file, 
                Charstring cert_file,
                Charstring private_key_file)
```
before the call to `edge_listener`.

> [note]  **Note:** the connect config is a base-64 encoded JSON object with all known addresses for the server together with the Certificate, private key and other 
meta-data needed to connect seamlessly. 
