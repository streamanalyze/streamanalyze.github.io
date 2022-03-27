# Development functions:

> [function]
> code_format(Charstring fn,Charstring format)->Boolean

> [function-docs]
> Print the code implementing OSQL function `fn` on console in `format`:
>      `osql`     : Source code
>      `objectlog`: Internal ObjectLog format
>      `slog`     : Internal SLOG format
>      `plan`     : Execution plan
>      `slap`     : Execution plan with embedded SLAP code 



___

> [function]
> grep(Charstring pat,Charstring file)->Stream of Charstring

> [function-docs]
> Search for lines matching pattern `pat` in source `file` 
>      in current `pwd()` folder 



___

> [function]
> grep(Charstring str)->Stream of Charstring

> [function-docs]
> Search for lines matching pattern `pat` in files loaded into database 



___

> [function]
> loaded_files()->Bag of Charstring

> [function-docs]
> The source files loaded into the database  



___

> [function]
> objectlog(Charstring fn)->Boolean

> [function-docs]
> Print the ObjectLog definitions of the resolvents of `fn` 



___

> [function]
> pc(Function f)->Bag of Function r

> [function-docs]
> Print the execution plan of function `f` on the colsole. 
>      If `f` is a generic function display execution plans of its resolvents 



___

> [function]
> pc(Charstring fn,Charstring bpat)->Function

> [function-docs]
> Print the execution plan of function named `fn` 
>      for binding pattern `bpat` on the console 



___

> [function]
> pc(Charstring fn)->Bag of Function

> [function-docs]
> Print the execution plan of function named `fn` on the console.
>      If `fn` is generic display execution plans of its resolvents 



___

> [function]
> plan(Charstring fn)->Boolean

> [function-docs]
> Print the execution plans of the resolvents of `fn` 



___

> [function]
> slap(Charstring fn)->Boolean

> [function-docs]
> Print the execution plans of the resolvents of `fn` with SLAP code 



___

> [function]
> slog(Charstring fn)->Boolean

> [function-docs]
> Print the SLOG code of the resolvents of `fn` 



___

> [function]
> slog_compiled(Charstring fn)->Boolean

> [function-docs]
> Is some SLOG compilation made for `fn`? 



___

> [function]
> time_function(Charstring msg,Function fn,Vector args,Integer times)->Real

> [function-docs]
> The time spent to call the OSQL function `fn` with arguments `args`
>      `n` times. 
>      The systen will also print a message `msg` and the time on the console 



___

> [function]
> trace_slog_compiler(Boolean flag)->Boolean

> [function-docs]
> Enable/disable tracing SLOG compilation traces on the console 


