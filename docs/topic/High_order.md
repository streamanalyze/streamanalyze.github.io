# High order
**TODO: Introduction remains to be written!**
> [function]
> apply(Function f,Vector args)->Bag of Vector

> [function-docs]
> Call the OSQL function `f` with parameters `args`.
>       Return result tuple as bag of vectors 



___

> [function]
> call(Function f)->Object



___

> [function]
> call(Function f,Object x,Object y)->Object



___

> [function]
> call(Function f,Object x)->Object



___

> [function]
> call(Function f,Object x,Object y,Object z)->Object



___

> [function]
> call(Function f,Object x,Object y,Object z,Object a)->Object



___

> [function]
> eval(Charstring x)->Bag

> [function-docs]
> Evaluate expression `x` 



___

> [function]
> evalv(Charstring x)->Bag of Vector

> [function-docs]
> Evaluate expression `x` and return bag of row vectors 



___

> [function]
> mapvector(Function fn,Vector v)->Vector

> [function-docs]
> Apply function `fn` on each element of vector `v` 


