# System meta-data functions:
The data that the system internally uses for maintaining the database
is exposed to OSQL and can be queried in terms of types and functions
as other data. For example, the types and functions used in the
database are accessible through system functions, so it is possible to
search the database for types and functions and how they relate.

**Accessing function signatures**

The function `arguments` returns a vector describing arguments of
signature of resolvent `r`:

```
   arguments(Function r) -> Bag of Vector`
```

Each element in the vector is a triplet (vector) describing one of the
arguments with structure `[type,name,uniqueness]` where `type` is the
type of the argument, `name` is the name of the argument, and
`uniqueness` is either `key` or `nonkey` depending on the declaration
of the argument.

Example:
```
    arguments(#'timespan');
```
returns the vector of vectors
```
   [ [#[OID 371 "TIMEVAL"],"TV1","nonkey"],
     [#[OID 371 "TIMEVAL"],"TV2","nonkey"] ]`
```

Analogous to `arguments(f)` the function `results(f)` returns a
description of the results of function `f`:

```
   results(Function r) -> Bag of Vector
```
## Functions

> [function]
> allfunctions()->Bag of Function f

> [function-docs]
> All functions in database 



___

> [function]
> allfunctions(Type t)->Bag of Function

> [function-docs]
> All functions having argument or result of type `t` 



___

> [function]
> allobjects()->Bag

> [function-docs]
> All surrogate objects in the database 



___

> [function]
> allobjects(Type t)->Bag o

> [function-docs]
> All surrogate objects of type `t` 



___

> [function]
> allsubtypes(Type t)->Type

> [function-docs]
> All types under type `t` in type hierarchy 



___

> [function]
> allsupertypes(Type t)->Bag of Type

> [function-docs]
> All supertypes above type `t` in the type hierarchy 



___

> [function]
> alltypes()->Bag of Type t

> [function-docs]
> All non-parameterized types in database 



___

> [function]
> argument_types(Function f)->Vector of Type

> [function-docs]
> The argument types of function `f` 



___

> [function]
> arity(Function f)->Integer

> [function-docs]
> The number of arguments of function `f` 



___

> [function]
> attributes(Type t)->Bag of Function

> [function-docs]
> The generic names of all single argument functions of type`t` 



___

> [function]
> calledby(Function f)->Bag of Function r

> [function-docs]
> The functions calling function `f` 



___

> [function]
> calledby_somehow(Function f)->Bag of Function

> [function-docs]
> The functions calling `f` directly or indirectly 



___

> [function]
> calls(Function f)->Bag of Function

> [function-docs]
> The functions called by function `f` 



___

> [function]
> calls_somehow(Function f)->Bag of Function g

> [function-docs]
> The functions called by function `f` directly or indirectly 



___

> [function]
> cardinality(Type t)->Integer

> [function-docs]
> The number of objects of type `t` 



___

> [function]
> deep_extent(Type tp)->Object



___

> [function]
> extent(Type t)->Object o

> [function-docs]
> The objects belonging to type `t` 



___

> [function]
> extent(Function f)->Bag of Vector

> [function-docs]
> The tuples of function `f` 



___

> [function]
> functionnamed(Charstring nm)->Function f

> [function-docs]
> The function named `nm` 



___

> [function]
> generic(Function r)->Function g

> [function-docs]
> The generic function of function `f` 



___

> [function]
> generic_name(Function f)->Charstring

> [function-docs]
> The generic name of function `f` 



___

> [function]
> kindoffunction(Function f)->Charstring

> [function-docs]
> The kind of fuction `f` 
>      as one of `stored`, `derived`, `foreign`, or `overloaded` 



___

> [function]
> methods(Type t)->Function

> [function-docs]
> The functions having one argument of type `t` 



___

> [function]
> name(Function f)->Charstring

> [function-docs]
> The name of function `f` 



___

> [function]
> name(Type t)->Charstring

> [function-docs]
> the name of type `t` 



___

> [function]
> resolvents(Function f)->Bag of Function

> [function-docs]
> The resolvents of function `f` 



___

> [function]
> resolvents(Charstring fn)->Bag of Function

> [function-docs]
> The resolvents of the generic function named `fn` 



___

> [function]
> resolventtype(Function f)->Type

> [function-docs]
> The type of the first argument of resolvent `f` 



___

> [function]
> result_types(Function f)->Vector of Type

> [function-docs]
> The result types of function `f` 



___

> [function]
> root_type(Type t)->Type

> [function-docs]
> The root type of a parameterized type `t` 



___

> [function]
> signature(Type t)->Charstring

> [function-docs]
> The signature of type `t` 



___

> [function]
> signature(Function f)->Bag of Charstring

> [function-docs]
> The signature of resolvent `f` or
>      the signatures of all resolvents of the generic function `f` 



___

> [function]
> subtypes(Type t)->Bag of Type

> [function-docs]
> The types one level below type `t` in the type hierarchy 



___

> [function]
> supertypes(Type t)->Type

> [function-docs]
> The types one level above type `t` in the type hierarchy 



___

> [function]
> thefunction(Charstring fn)->Function

> [function-docs]
> The function named `fn`.
>      An error is raised if no function is named `fn` 



___

> [function]
> thefunctions(Vector of Charstring fns)->Vector of Function

> [function-docs]
> Vector of functions with names `fns` 



___

> [function]
> theresolvent(Charstring fn)->Function

> [function-docs]
> If `fn` is the name of a resolvent return it. 
>      If `fn` is a generic function with a single resolvent return the resolvent.
>      Raise an error if there more than one resolvent of the genetic `fn` 



___

> [function]
> thetbr(Function f,Charstring bpat)->Function

> [function-docs]
> The TBR of function `f` for binding pattern `bpat` 



___

> [function]
> thetype(Charstring tn)->Type

> [function-docs]
> The type named `tn`.
>      An error is raised if no type is named `tn` 



___

> [function]
> typenamed(Charstring nm)->Type t

> [function-docs]
> The type named `nm` 



___

> [function]
> typeof(Object o)->Type



___

> [function]
> typesof(Object)->Type

> [function-docs]
> The types of object `o` 



___

> [function]
> userfunction(Function f)->Boolean

> [function-docs]
> Is function `f` a user defined function? 



___

> [function]
> userfunctions()->Bag of Function f

> [function-docs]
> All user defined functions 



___

> [function]
> userobject(Object o)->Boolean

> [function-docs]
> Is `o` a user defined object? 



___

> [function]
> usersupertypes(Type t)->Bag of Type s

> [function-docs]
> Find the user defined types above type `t` in type hierarchy 



___

> [function]
> usertype(Type t)->Boolean

> [function-docs]
> Is type `t` a user defined type? 



___

> [function]
> usertypes()->Bag of Type t

> [function-docs]
> All user defined types 



___

> [function]
> vref(Object o,Object i)->Object



___

> [function]
> width(Function f)->Integer

> [function-docs]
> The width of function `f` 


