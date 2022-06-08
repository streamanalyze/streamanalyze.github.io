# Sensor ontology

> [function]
> bus(Type wt)->Function

> [function-docs]
> The time signal data bus stream generator for signal wrapper type `wt` 
>      `f()-> Timeval of Stream of Vector e`
>       Each element `e` has format `[ts, ns, v]` where
>      `ts` is a timestamp, 
>      `ns` is the name of a signal in `signals`, and
>      `v` is the value of `ns` 



___

> [function]
> doc(Signal s)->Charstring

> [function-docs]
> Documentation of signal `s` 



___

> [function]
> edges_with_signal(Charstring uid)->Vector of Charstring

> [function-docs]
> The name of the edges having a signal with universal name `uid` 



___

> [function]
> name(Signal s)->Charstring

> [function-docs]
> The name of signal `s` 



___

> [function]
> options(Signal s)->Record

> [function-docs]
> The meta-data of signal `s` 



___

> [function]
> signals()->Bag of Charstring

> [function-docs]
> All sensor mapping defined in the ontology 



___

> [function]
> signals_named(Vector of Charstring nml)->Vector of Signal

> [function-docs]
> Find signals named `nml` 



___

> [function]
> signal_named(Charstring nm)->Signal s

> [function-docs]
> Find signal named `nm` 



___

> [function]
> signal_stream(Signal s)->Stream

> [function-docs]
> Non-timestamed signal stream for signal `s` 



___

> [function]
> signal_stream(Charstring sn)->Stream

> [function-docs]
> Non-timestamed signal stream for signal named `sn` 



___

> [function]
> ts_signal_stream(Signal s)->Stream of Timeval

> [function-docs]
> Time stamped signal stream for signal `s` 
>      Overridden by wrapper signals under `s` 



___

> [function]
> ts_signal_stream(Charstring sn)->Stream of Timeval

> [function-docs]
> Time stamped signal stream for signal named `sn` 



___

> [function]
> tuple_stream(Type wt)->Function f

> [function-docs]
> The time stamped tuple stream function 
>      `f(Vector of Charstring signals)->Stream of Timeval of Vector`
>      for signal wrapper type `wt` 


