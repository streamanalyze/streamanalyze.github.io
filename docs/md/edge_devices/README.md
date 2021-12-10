# Edge devices

This section goes through how to install edge clients on various devices.
When connecting an edge client to a federation there are two ways to connect.
The easiest way is using the [Device Hub](!#/device_hub/) and it's **connect 
config** blobs. But can just as well be done by manually configuring your edge
devices.

The download page is located at [studio.streamanalyze.com/download](!https://studio.streamanalyze.com/download)

## Connect config.
Using a connect config is as easy as navigating to the 
[Device Hub](!#/device_hub/) and using the appropriate way to get a connect config from there. For more information on how connect configurations works see
the [advanced](/docs/md/servers/advanced.md) section under servers.

### Android
Use the Android edge client app to scan the QR code; then press
connect. In the video below you can see the flow from downloading the
edge client app to connecting it as an edge to the federation of a
sa.studio community.  <video style="width: 100%"  controls> <source
src="https://s3-eu-west-1.amazonaws.com/dl.streamanalyze.com/gifs/connect_android.webm"
type="video/webm"> Your browser does not support the video tag.
</video>


### Interactive prompt e.g. Linux (x86 and ARM)/Windows/OSX

Either copy the first config blob and paste it inside a running
sa.engine or copy the second one and paste in in a shell where
sa.engine is in your path.  In the video below you can see the flow
from downloading sa.engine to connecting it as an edge client to the
federation of a sa.studio community.

<video style="width: 100%"  controls>
<source src="https://s3-eu-west-1.amazonaws.com/dl.streamanalyze.com/gifs/connect_terminal_edge.webm" type="video/webm">
Your browser does not support the video tag.
</video>

## Manual configuration.
When connecting to a federation you need a couple of things:

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
