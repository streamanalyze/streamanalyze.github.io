# Peer management functions:

> [function]
> all_peerinfo()->Bag of (Charstring,Charstring,Integer,Integer,Record)

> [function-docs]
> In nameserver: information about all registered peers 



___

> [function]
> gethostname()->Charstring

> [function-docs]
> The local host name of this computer 



___

> [function]
> get_ip(Charstring host)->Bag of Charstring

> [function-docs]
> The IP address(es) of `host` 



___

> [function]
> host(Peer p)->Charstring



___

> [function]
> ips(Peer p)->Record



___

> [function]
> is_running(Charstring peer)->Boolean

> [function-docs]
> Is `peer` running? 



___

> [function]
> kill_all_peers()->Bag of Charstring

> [function-docs]
> Terminate all peers in federation 



___

> [function]
> kill_all_servers()->Boolean

> [function-docs]
> Terminate all servers in the federation
>      server, then terminate name server as well 



___

> [function]
> kill_peer(Charstring peer)->Charstring

> [function-docs]
> Kill `peer` unless it is a nameserver 



___

> [function]
> kill_the_federation()->Boolean

> [function-docs]
> Terminate all peers in the federation, including the nameserver, 
>      and quit 



___

> [function]
> listen()->Boolean

> [function-docs]
> Start running this peer as a server 



___

> [function]
> multicastreceive(Vector peers,Charstring fn,Vector args)->Bag



___

> [function]
> my_hostname()->Charstring

> [function-docs]
> The hostname used by the system to locate this computer 



___

> [function]
> my_hostname(Charstring host)->Charstring

> [function-docs]
> Set the hostname used by the system to `host` 



___

> [function]
> my_local_ip()->Bag of Charstring

> [function-docs]
> The IP addresses of this computer in its local network 



___

> [function]
> name(Peer p)->Charstring



___

> [function]
> nameserver(Charstring descr)->Charstring

> [function-docs]
> Make this peer the nameserver of a federation of sa.engine peers.
>      Format of `descr`: `''` or `'name'` or `'name:port'` or `':port'`. 
>      The default `name` is NAMESERVER.
>      The default `port` is 35021 or the envonment variable NAMESERVERPORT.
>      If `name` is non-empty the nameserver will still have the name
>      NAMESERVER as alias.
>      Start the nameserver by calling `listen()` 



___

> [function]
> nameserverhost(Charstring name)->Charstring

> [function-docs]
> Set host name of nameserver to `name` 



___

> [function]
> nameserverhost()->Charstring

> [function-docs]
> Get current nameserver's host name 



___

> [function]
> nameserverport(Integer no)->Integer

> [function-docs]
> Set port number used by nameserver to `no` 



___

> [function]
> other_peers()->Bag of Charstring

> [function-docs]
> Return all other peers in federation 



___

> [function]
> peerinfo(Peer p)->(Charstring,Charstring,Integer,Integer,Record)

> [function-docs]
> In nameserver: basic information about peer `p` 



___

> [function]
> peerinfo(Charstring pn)->(Charstring name,Charstring host,Integer portno,
        Integer pid,Record ips)

> [function-docs]
> In nameserver: information about a peer named `pn` 



___

> [function]
> peers_at_nameserver(Charstring except)->Bag of Charstring

> [function-docs]
> Retrieve peers of federation except the one named `except` 



___

> [function]
> peer_named(Charstring peer)->Peer

> [function-docs]
> Get the object representing the `peer` 



___

> [function]
> pid(Peer p)->Integer



___

> [function]
> portno(Peer p)->Integer



___

> [function]
> porttimeout(Real timeout)->Real

> [function-docs]
> Set timout for opening a port to a peer 



___

> [function]
> register(Charstring peerspec)->Charstring

> [function-docs]
> Register this peer in the nameserver with `peerspec` being
>      `peer` or `peer@host` or `peer@host:port` or `peer@:port` 



___

> [function]
> remote_function_tuples(Charstring peer,Charstring fn,Vector args)->Bag of Vector



___

> [function]
> reregister(Charstring peerspec)->Charstring

> [function-docs]
> Register this peer in the nameserver with `peerspec` being
>      `peer` or `peer@host` or `peer@host:port` or `peer@:port`.
>      Override possible existing registration 



___

> [function]
> routeapply(Charstring fn,Bag inputs)->Bag



___

> [function]
> send(Charstring peer,Charstring query)->Literal

> [function-docs]
> Send `query` to `peer` for evaluation without waiting for result 



___

> [function]
> server(Charstring name,Charstring host,Number port)->Boolean

> [function-docs]
> Run this process as server named `name` on `host` listening on `port` 



___

> [function]
> set_portno(Charstring pn,Integer port)->Integer



___

> [function]
> ship(Charstring peer,Charstring query)->Bag of Vector

> [function-docs]
> Ship `query` string to `peer` for evaluation and ship back result 



___

> [function]
> start_engine(Charstring name,Charstring image)->Charstring

> [function-docs]
> Start a new local server named `name` with `image` 



___

> [function]
> start_engine(Charstring name,Charstring image,Number timeout)->Charstring

> [function-docs]
> Start a new local server named `name` on this computer with `image`.
>      Wait for server to start `timeout` seconds before failing 



___

> [function]
> start_engine(Charstring name)->Charstring

> [function-docs]
> Start a new local server named `name` on this computer 



___

> [function]
> start_nameserver(Charstring name)->Charstring

> [function-docs]
> Start a new nameserver named `name` on this computer 



___

> [function]
> this_peerid()->Charstring

> [function-docs]
> Get the name of this peer 



___

> [function]
> wait_for(Vector of Charstring peers)->Boolean

> [function-docs]
> Wait for `peers` to start listening 



___

> [function]
> wait_for(Charstring peer)->Boolean

> [function-docs]
> Wait for `peer` to start listening 


