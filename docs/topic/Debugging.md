# Debugging functions:

> [function]asserteq(Object x,Object y,Charstring message)->Boolean

> [function-docs]
> Print error message if `x` and `y` are different 



___

> [function]expanded_image(Function f)->Number



___

> [function]pp(Object o)->Charstring

> [function-docs]
> Pretty print object `o` into a string 



___

> [function]print(Object o)->Boolean

> [function-docs]
> Print object `o` on console 



___

> [function]profile()->Vector of (Charstring,Number)

> [function-docs]
> return statistical profile as Vector of pairs `[fnname,percentage]` 



___

> [function]profiling(Charstring action)->Charstring

> [function-docs]
> Control statistical profiling by `action`:
>      on: turn on statistical profiling of OSQL functions
>      all: turn on statistical prifiling of OSQL and Lisp
>      off: turn off statistical profiling
>      clear: clear collected samples
>      print: print percentage time spent in functions 



___

> [function]test_server_connection()->Bag of Charstring msg



___

> [function]trace(Charstring fn)->Function

> [function-docs]
> Trace function named `fn`.
>      Derived functions cannot be traced! 



___

> [function]untrace(Charstring fn)->Function

> [function-docs]
> Untrace function named `fn` 



___

> [function]vref(Vector of (Charstring,Number),Number)->(Charstring,Number)


