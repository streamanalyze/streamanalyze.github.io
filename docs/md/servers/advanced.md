> [warning **Work in progress:** This section is still a work in progress 

# Advanced configuration of nameservers and peers
When setting up a real federation with sa.engine the basic configurations will
only get you so far. In this section we wil lgo through how you can configure the
following settings:

* Hostname
* IP addresses
* TLS
* Connect configurations

## Configure hostname of server
By default sa.engine takes the hostname of the host computer as it's hostname.
In many cases it is desireable to set this to a DNS name or similar. This can 
either be done by setting the environment variable `SA_HOSTNAME` to the desired
hostname or by calling `my_hostname(Charstring host);`:
```LIVE {"vis":"showMarkdown"}
mddoc(functionnamed("my_hostname"));
```
## IP addresses

A nameserver or server can sometimes be reached over different networks from 
different peers. To handle this a server and nameserver always locates all of it's
local IP-addresses on it's own interfaces and registers these in the federation.
However, this will never work for computers that are behind NAT-walls or similar firewall rules. To make an sa.engine server (or nameserver) reachable behind a 
NAT-wall you can add a pairs `(Charstring host, Integer port)` to the stored 
function `server_addrs()`:

```
add server_addrs() = ("MY_CUSTOM_HOSTNAME", 34524);
```

You can also populate the environment variable `SA_ADDRS` with a comma separated
list of `host:port` strings.

To check a configuration you can call the function `get_all_addrs()`, it will give
you  all `(address,port)` pairs in `server_addrs` together with all `address:port`
pairs in `SA_ADDRS` and also all of the addresses the server has in their local 
network. Try it:
```LIVE
get_all_addrs();
```
:::TIP

**Tip:** When troubleshooting issues with connecting to the federation a good 
starting point is to check `get_all_addrs()` on all peers and make sure that there
is an IP/hostname that is reachable from the client to the server.

:::
## Secure sockets (TLS)
Sa.engine uses ARM mbedtls for securing the transport layer. In sa.engine all peers
must have a signed certificate from a common **Certificate Authority**. The server 
certificate should have it's common name set to it's peername.

In this section we will assume that you have accquired/generated the following:

* 1 private RSA key (1024-bits or longer) - private.key
* 1 certificate authortiy crertificate which was used to sign the certifiacte, ca.crt
* 1 certificate which was signed by the certificate authority. cert.crt

To configure an sa.engine to enable TLS use the function `enable_security()`:
```LIVE {"vis":"showMarkdown"}
mddoc(functionnamed("enable_security"));
```
> [note]  **Note:** that all sa.engines (both nameserver, stream servers, clients and edges)
in a federation must have certificates signed by the same certificate
authority. 

After calling `enable_security` all socket operations will default to TLS 
operations. You have now enabled the physical security.
## Connect configurations

Since there are many parameters to set which might be hard to get correctly set up 
the sa.engine nameserver kan be used to generate valid configuration records for 
connecting peers, edges, and, clients to the federation. If you have connected an 
edge device to the sa.studio Community Edition via the device hub you have already
used these configuration records to connect sa.engines to a federation.


### federation.localhost
When a nameserver starts listening it will create a federation.localhost (unless configured not to) and put it under `sa_home()`:
```LIVE
read_file(sa_home()+"federation.localhost");
```
This file contains a base64-encoded JSON-string with the information needed to 
connect to the nameservers federation:
```LIVE
select pp(rec)
  from Record rec, Charstring base64_blob
 where base64_blob = read_file(sa_home()+"federation.localhost")
   and rec = json:unstringify(base64_decode(base64_blob));
```
> [note]  **Note:** when running this on sa.studio Community Edition you will get a huge 
record with IP-addresses,certificates, and keys to connect to the federation. 

The content of `federation.localhost` is a specialization of the output from 
`get_connect_config_blob`:
```LIVE {"vis":"showMarkdown"}
mddoc(apropos("get_connect_config"));
```
The config blob is a base64-encoded JSON-string of the connection record. The 
output of the functions above can be used as input the `connect_using` 
functions:
```LIVE {"vis":"showMarkdown"}
mddoc(apropos("connect_using"));
```



There is an optional key `ip-getter` which can be set in the connect configuration.
If `ip-getter` is set to a valid http(s) address an edge device will send a `GET`
request to the given url. The response from the request must be a JSON-array with
`[String host, Integer port]`. This host and port pair will be added to the tried
addresses when connecting to a federation.



