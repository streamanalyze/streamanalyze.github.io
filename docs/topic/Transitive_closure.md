# Transitive closure
**TODO: Introduction remains to be written!**
> [function]
> iterate(Function fn,Integer maxdepth,Object,Object)->(Object,Object)



___

> [function]
> iterate(Function fn,Integer maxdepth,Object o)->Object r



___

> [function]
> tclose(Function fn,Object o)->Bag

> [function-docs]
> `fn(fn(...fn(o)))` 



___

> [function]
> tclose(Function fn,Object o,Object a1,Object a2)->Bag of (Object,Object,Object)

> [function-docs]
> `fn(fn(...fn(o,a1,a2),a1,a2),a1,a2)` 



___

> [function]
> tclose(Function fn,Object o,Object a1)->Bag of (Object,Object)

> [function-docs]
> `fn(fn(...fn(o,a1),a1),a1)` 



___

> [function]
> tclose(Function fn,Object o,Object a1,Object a2,Object a3)->Bag of (Object,
      Object,Object,Object)

> [function-docs]
> `fn(fn(...fn(o,a1,a2,a3),a1,a2,a3),a1,a2,a3)` 



___

> [function]
> tclosed(Function fn,Object o,Integer maxdepth)->(Object r,Integer depth)

> [function-docs]
> Get the transitive closure of applying the function fn on the
>    argument o recursively no more results produced or maxdepth reached.
>    The result pairs contain the produced objects and their distances 
>    from the root o. 



___

> [function]
> traverse(Function fn,Object o)->Bag



___

> [function]
> traverse(Function fn,Object,Object,Object)->Bag of (Object,Object,Object)



___

> [function]
> traverse(Function fn,Object,Object)->Bag of (Object,Object)



___

> [function]
> traverse(Function fn,Object,Object,Object,Object)->Bag of (Object,Object,Object,
        Object)


