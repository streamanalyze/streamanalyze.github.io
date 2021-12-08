# High order functions:

> [function]apply(Function f,Vector args)->Bag of Vector

> [function-docs]
> Call the OSQL function `f` with parameters `args`.
>       Return result tuple as bag of vectors 



___

> [function]applyfunction1(Function fn,Object arg)->Bag

> [function-docs]
> Call function `fn(arg)` 



___

> [function]eval(Charstring x)->Bag

> [function-docs]
> Evaluate expression `x` 



___

> [function]evalv(Charstring x)->Bag of Vector

> [function-docs]
> Evaluate expression `x` and return bag of row vectors 



___

> [function]mapvector(Function fn,Vector v)->Vector

> [function-docs]
> Apply function `fn` on each element of vector `v` 


