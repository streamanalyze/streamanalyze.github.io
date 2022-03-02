# Optimization functions:

> [function]
> bijective_function(Function f)->Boolean

> [function-docs]
> Is function `f` bijective? 



___

> [function]
> costhint(Charstring fn,Charstring bpat,Object h)->Function

> [function-docs]
> Define cost model for function named `fn` and binding pattern `bpat`. 
>      If `h` is a vector `[c,f]` it defines a constant cost `c` and fanout `f`.
>      If `h` is a function it computes the cost and fanout 



___

> [function]
> costhints(Function fn)->Bag of (Charstring,Object)

> [function-docs]
> Get all cost models for binding patterns of function `fn` 



___

> [function]
> optmethod(Charstring m)->Charstring r

> [function-docs]
> Choose query optimization method `m` for optimizing queries:
>      exhaustive: dynamic programming
>      ranksort:   greedy ranking
>      randomopt:  randomized optimization 



___

> [function]
> parteval(Charstring fn)->Function

> [function-docs]
> Declare function named `fn` to be partially evaluated 



___

> [function]
> plan_cost(Function f)->Bag of (Real,Real)

> [function-docs]
> The estimated cost of executing resolvents of function `f` 



___

> [function]
> plan_cost(Charstring fn,Charstring bpat)->(Real,Real)

> [function-docs]
> The extimated cost of executing function named `fn` 
>      for binding pattern `bpat` 



___

> [function]
> plan_cost(Charstring fn)->Bag of (Real,Real)

> [function-docs]
> The estimated cost of executing resolvents of function named `fn` 



___

> [function]
> recompile(Function f)->Function

> [function-docs]
> Recompile function `f` 



___

> [function]
> recompile(Charstring fn)->Function

> [function-docs]
> Recompile function named `fn` 



___

> [function]
> reoptimize(Function f)->Function

> [function-docs]
> Reoptimize execution plan of function `f`, including all subqueries 



___

> [function]
> reoptimize(Charstring fn)->Function

> [function-docs]
> Reoptimize execution plan of function named `fn`, 
>       including all subqueries 



___

> [function]
> uncache_costs()->Integer

> [function-docs]
> Uncache costs of all functions 



___

> [function]
> unparteval(Charstring fn)->Function

> [function-docs]
> Make function named `fn` not be partially evaluated any longer 


