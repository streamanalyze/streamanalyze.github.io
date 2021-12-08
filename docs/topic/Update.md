# Update functions:

> [function]addfunction(Charstring fn,Vector args,Vector row)->Boolean

> [function-docs]
> `add fn(args)=row` 



___

> [function]clear_function(Charstring fn)->Function

> [function-docs]
> Permanently remove contents of stored function `fn` 



___

> [function]createobject(Charstring tn)->Object

> [function-docs]
> Create new object of type named `tn` 



___

> [function]delete_objects(Bag b)->Integer

> [function-docs]
> Delete all surrogate objects in bag `b`. 
>      Return the number of objects deleted. 



___

> [function]dropfunction(Function fn,Number permanent)->Function

> [function-docs]
> Remove all rows of stored function `fn`. 
>      `permanent = 1` => cannot be rolled back 



___

> [function]remfunction(Charstring fn,Vector args,Vector row)->Boolean

> [function-docs]
> `remove fn(args)=row` 



___

> [function]setfunction(Charstring fn,Vector args,Vector res)->Boolean

> [function-docs]
> `set fn(args)=res` 


