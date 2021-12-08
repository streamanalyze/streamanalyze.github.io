# Dataflow functions:

> [function]drop_flow(Object flow)->Charstring

> [function-docs]
> Remove all subscriptions for data `flow` 



___

> [function]emit_on_flow(Object o,Charstring flow)->Object



___

> [function]flows()->Bag

> [function-docs]
> Get all current data flows 



___

> [function]flow_named(Charstring flow)->Stream



___

> [function]name_flow(Stream cq,Charstring flow)->Charstring

> [function-docs]
> Publish result stream from query `cq` as data `flow` 



___

> [function]publish(Stream s,Charstring flow)->Stream

> [function-docs]
> Publish elements in stream `s` in data `flow` 



___

> [function]subscribe(Charstring edge,Charstring flow)->Object

> [function-docs]
> Follow data `flow` on `edge` 



___

> [function]subscribe(Charstring flow)->Object

> [function-docs]
> Follow data `flow` 


