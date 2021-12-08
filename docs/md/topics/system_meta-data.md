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
