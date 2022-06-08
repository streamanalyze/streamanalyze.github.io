# Connect config

> [function]
> connect_to_local_federation(Charstring name,Charstring new_server_name)->Boolean



___

> [function]
> connect_to_local_federation(Charstring name)->Boolean



___

> [function]
> connect_using_config(Record config,Boolean as_edge)->Boolean

> [function-docs]
> Connect to a federation using the `config` if `as_edge` is false this call 
> will only register the process as a client.



___

> [function]
> connect_using_config_blob(Charstring blob,Boolean as_edge)->Boolean

> [function-docs]
> Same as `connect_using_config` but the blob is a Base64 encoded string 
> representation of the config Record. 



___

> [function]
> connect_using_config_blob(Charstring blob,Charstring peername,Boolean as_edge)
                         ->Boolean

> [function-docs]
> Same as `connect_using_config` but the blob is a Base64 encoded string 
> representation of the config Record and peername is overridden 



___

> [function]
> connect_using_config_file(Charstring config,Boolean as_edge)->Boolean

> [function-docs]
> Same as `connect_using_config` but will read JSON-config from file on disk. 



___

> [function]
> get_all_addrs()->Bag of Vector



___

> [function]
> get_connect_config(Charstring peer)->Record

> [function-docs]
> Retrieve a connection config to connect as `peer` to this federation.
>  Use this record in a call to `connect_using_config` in another sa.engine
>  to connect. This record contains address, port, host and cryptographic 
>  information neccessary to connect. 



___

> [function]
> get_connect_config(Charstring peer,Record extras)->Record



___

> [function]
> get_connect_config_blob(Charstring peer,Record extras)->Charstring

> [function-docs]
> Base64 encoded string of `get_connect_config`. can be used in conjunction
> with `connect_using_config_blob`



___

> [function]
> get_connect_config_blob(Charstring peer)->Charstring



___

> [function]
> peer_certificate(Charstring peer)->(Charstring cert,Charstring)

> [function-docs]
> When using certificate policy stored use this stored function to set
> certificate and key for each peername 



___

> [function]
> reconnect_using_config_blob(Charstring blob,Charstring peername,Boolean as_edge)
                           ->Boolean

> [function-docs]
> Same as `connect_using_config` but the blob is a Base64 encoded string 
> representation of the config Record and peername is overridden and reregister is 
> enabled 



___

> [function]
> reconnect_using_config_blob(Charstring blob,Boolean as_edge)->Boolean

> [function-docs]
> Same as `connect_using_config` but the blob is a Base64 encoded string 
> representation of the config Record where reregister is enabled



___

> [function]
> server_addrs()->Bag of (Charstring,Integer)

> [function-docs]
> Set of configurable server addresses.



___

> [function]
> set_peer_cert(Charstring c,Charstring k)->Boolean

> [function-docs]
> Set the certificate to use for peer to `c` and key to `k`. Only neccessary to
> call when using certificate policy `basic` 



___

> [function]
> set_peer_cert_policy(Charstring policy)->Charstring

> [function-docs]
> Sets the policy to use when assigning certificates to a new peer.
>  policy can either be:
>  * **basic** - Same certificate and key to all edges. Set the certificate 
>    and key to use with `set_peer_cert(Charstring c, Charstring k)`
>  * **stored** - Store certificates per peer. In  `peer_certificate`



___

> [function]
> verfify_connect_config(Record config)->Boolean



___

> [function]
> verify_connect_config(Charstring blob)->Boolean


