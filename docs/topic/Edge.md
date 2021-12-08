# Edge functions:

> [function]cancel_edge_cq(Charstring edge,Object id)->Object



___

> [function]edge_cq(Charstring edge,Charstring cq,Record opts)->Stream

> [function-docs]
> Execute continuous query `cq` on `edge` with options `opts`
>      Options can contain the following fields:
> 
> - `store-and-forward`: String - name of store-and-foward stream. Used to
>        enable store and forward and to retrieve forwarded data in a later stage.
>        When store and forward is enabled data is buffered for `forward-interval`
>        number of seconds before attempting to send it to the requesting server.
>        When store and forward is enabled the options `buffer-in-memory` and 
>        `buffer-size` will both affect the amount of data to store between 
>        forwards.
> 
> - `store-and-forward-interval`: Number of seconds between each forward 
>         attempt.
> 
> - `buffer-on-disk`: Set to true to buffer intermediate data on disk in 
>        `log_directory()/snf/<store-and-forward-name>` instead of in memory. 
> 
> - `buffer-size`: Number of rows to store in buffer, when buffer is full 
>        evict the least recently pushed row - default value: 1000.
>        
> 



___

> [function]edge_cq(Vector of Charstring edges,Charstring cq,Record opts)->Stream

> [function-docs]
> Broadcast continuous query `cq` to `edges` and merge result streams 



___

> [function]edge_cq(Charstring edge,Charstring cq)->Stream

> [function-docs]
> Execute continuous query `cq` on `edge` 



___

> [function]edge_cq(Vector of Charstring edges,Charstring cq)->Stream

> [function-docs]
> Broadcast continuous query `cq` to `edges` and merge result streams 



___

> [function]edge_listener()->Charstring

> [function-docs]
> Start edge listener in current peer 



___

> [function]edge_listener(Charstring edgespec)->Charstring

> [function-docs]
> Register this peer as edge in edge server where `edgespec` is
>     `edge` or `edge@host` or `edge@host:port` or `edge@:port` 



___

> [function]edge_listening(Charstring edgeid)->Boolean

> [function-docs]
> Check if an edge named `edgeid` is listening 



___

> [function]edge_mgr()->Charstring

> [function-docs]
> Set edge mgr status of this sa.engine instance 



___

> [function]edge_mgr_assignment(Charstring assignment)->Boolean

> [function-docs]
> Alter the edge mgr assignment. Valid input is
>      `basic`, `manual`, `scale` 



___

> [function]edge_query(Charstring edge,Charstring query,Record opts)->Object



___

> [function]edge_query(Charstring edge,Charstring query)->Object



___

> [function]edge_status()->Bag of Record



___

> [function]get_snf_file(Charstring edgeid,Charstring flow)->Charstring



___

> [function]get_snf_files(Charstring edgeid,Charstring flow)->Bag of Charstring



___

> [function]get_snf_folder(Charstring edgeid)->Charstring dir



___

> [function]get_snf_log(Charstring edgeid,Charstring snf)->Stream of Vector



___

> [function]listening_edges()->Vector of Charstring

> [function-docs]
> Return names of all listening edge peers 



___

> [function]name(Edgequery eq)->Charstring

> [function-docs]
> Name of the edge query `eq`. This is a unique identifier of
>  this edge query. This `name` can be used to find this request 
>  and also stop it using `cancel_edge_cq` on a server in the federation.



___

> [function]options(Edgequery eq)->Record

> [function-docs]
> Options for the stored edge query `eq`. This is the same record
> that can be used as options in `edge_cq`. See [Topics->Edge](#/docs/topic/Edge)
> or [Store and forward](#/docs/md/tutorial/detached-edge-query.md) for more
> details. 



___

> [function]run_stored_edge_queries()->Bag of Charstring

> [function-docs]
> Sun all stored edge queries on this peer.



___

> [function]run_stored_edge_query(Edgequery eq)->Charstring

> [function-docs]
> Start stored edge query `eq`.



___

> [function]run_stored_edge_query(Charstring name)->Charstring

> [function-docs]
> Start stored edge query named `name`



___

> [function]snf_csv_storer(Stream s,Charstring eid,Charstring flow,Record params)->Boolean



___

> [function]snf_json_storer(Stream s,Charstring eid,Charstring flow,Record params)
               ->Charstring



___

> [function]snf_publish_storer(Stream s,Charstring eid,Charstring flow,Record params)
                  ->Object



___

> [function]start_edge(Charstring edgespec)->Charstring

> [function-docs]
> Start edge `edgespec` on this comuter 



___

> [function]start_edges(Vector of Charstring edgespecs)->Vector of Charstring

> [function-docs]
> Start edge peers on this computer in parallel 



___

> [function]statement(Edgequery eq)->Charstring

> [function-docs]
> Statement of the edge query `eq`. An OSQL statment as a string that
>  will be run when this `EdgeQuery` is started. This is the same
>  as the `statement` argument in a regular `edge_cq`


