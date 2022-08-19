# Database index
**TODO: Introduction remains to be written!**
> [function]
> create_index(Function f,Charstring par,Charstring indtype,
            Charstring multiplicity)->Vector

> [function-docs]
> Create index identifier on function `f`, at parameter `par`, 
>      index type is `indtype`, `multiplicity` one of 'unique' or 'multiple' 



___

> [function]
> create_index(Charstring fn,Charstring par,Charstring indtype,
            Charstring multiplicity)->Vector

> [function-docs]
> Create index identifier on function named `fn`, see at parameter `par`, 
>      index type `indtype`, and `multiplicity` one of 'unique' or 'multiple' 



___

> [function]
> drop_index(Function f,Charstring par)->Integer

> [function-docs]
> Remove index on function `f` at parameter `par` 



___

> [function]
> drop_index(Charstring fn,Charstring par)->Integer

> [function-docs]
> Remove index on function named `fn` at parameter `par` 



___

> [function]
> extract_rows(Collection rows)->Bag of Vector


