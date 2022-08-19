# Queries

**Queries** filter out and transform objects fulfilling some specific
properties from collections of objects.

This is an example of a query selecting the odd elements among the
integers between 10 and 15:

```LIVE
select i
  from Integer i
 where i in range(10,15)
   and odd(i)
```

The following query returns the name and values of the constants in
the stored function `const(c)` whose closest integer is 3:

```LIVE
select c,const(c) 
  from Charstring c
 where round(const(c))=3
```

Queries may both filter, transform, and generate collections. For
example, the following query computes the set of divisors for the integer 144:

```LIVE
select d
  from Integer d, Integer n
 where d in range(2,ceiling(n/2))
   and 0 = mod(n,d)
   and n = 144
```
Queries my be used for defining derived functions in models, for example:
```LIVE
create function divisors(Integer n) -> Bag of Integer
  as select d
       from Integer d
      where d in range(2,ceiling(n/2))
        and 0 = mod(n,d)
```
The following query returns the divisors of 143:
```LIVE
divisors(143)
```

Queries can be made over different kinds of collections. For example,
the following set query returns the prime numbers in the vector
`[197,143,2]`:

```LIVE
select n
  from Integer n
 where n in [197,143,2] 
   and notany(divisors(n))
```

> [note] **Note:** If you are familiar with
[SQL](https://www.w3schools.com/sql/) you will notice that `select`
expressions of SQL and OSQL are similar. SQL's `select statement` is
proved to be very effective for querying and transforming tables in
databases.  However, variables in SQL's `select` statement must be
bound only to rows in uniform tables, while variables in OSQL select
expressions can be bound to any kind of objects, e.g. strings,
numbers, vectors, matrices, tensors, bags, streams, records or user
defined objects. Combined with functions, this makes analytical models
in different domains easy to express with OSQL.

In the tutorial [Streams](/docs/md/tutorial/streams.md) it will be
shown how to specify OSQL queries over live streams.

General queries over sets and bags are documented in
[Queries](/docs/md/osql/queries.md).

Qeries to filter and transform elements in vectors and
tensors are documented in [Vector
queries](/docs/md/osql/vector-queries.md).

## Case rules

**Case rules** define functions and formulas that have different
definitions depending on their arguments. For example, a `signum(x)`
function can be defined as:


```LIVE
create function signum(Real x) -> Integer
  as case when x > 0 then 1
          when x = 0 then 0
          else -1 end
```

The built-in function `sign(x)` does the same. Another example of a
functions defined in terms of case rules is the built in
function `atan2(y,x)`:

```LIVE
sourcecode("atan2")
```

In general, case rules compute values conditioned on values of
variables. The case rules compute these values without
executing any actions (side effects). This is different from
conditional statements in conventional programming languages such as
`if {condition} do-something; else do-something-else;` where different
side effects (actions) are executed based on a condition.

Case rules can be used in queries, for example:

```LIVE
select case when x <= -40 then "too cold"
            when x < 0    then "freezing"
            when x < 18   then "cold"
            when x < 23   then "plesant"
            when x < 40   then "hot"
            else "too hot"
        end
       from Real x
      where x in 10*range(-4,4)
```

This illustrates how case rules can be used for specifying
decision rules based on values of variables.


## AND and OR and then SOME

Select statements use AND clauses to join conditions that put contstraints on the output. Sometimes you want to have output that form disjoint components in the solution space. This is acheived by joining conditions with OR. However, in OSQL OR has to be used inside an AND clause with the keyword `some`.

For example, consider the following query which outputs the values of the vector `[1,2,3,4,5]` if the values are less than 3 OR larger than 4:

```LIVE
select i
  from Integer i
 where i in [1,2,3,4,5]
   and some(i<3 or i>4);
```

To get the negation of some we can use the keyword `notany`:

```LIVE
select i
  from Integer i
 where i in [1,2,3,4,5]
   and notany(i<3 or i>4);
```

SOME uses a return early pattern, so the entire expression within the SOME clause does not have to finish before SOME returns true.

For example, comparing the run times between

```
[sa.engine] 1> count(iota(1,10000000));
10000000
0.328 s
```

and

```
[sa.engine] 1> some(iota(1,10000000));
TRUE
0.016 s
```

clearly shows that `some` exits on the first element while `count` has to step through all elements to determine the number of elements.


## Binding variables with "argmax"

OSQL supports the [argmax](https://en.wikipedia.org/wiki/Arg_max) operation that finds the argument that gives the maximum value of a vector.

For example, the following query finds the index that gives the maximum of the vector `[4,3,9,1,8,5]`:

```LIVE
select i
  from Integer i, Vector v
 where v = [4,3,9,1,8,5]
   and v[i] = max(v);
```

Similarly you can use argmin to find the argument that gives the minimum value of a vector:

```LIVE
select i
  from Integer i, Vector v
 where v = [4,3,9,1,8,5]
   and v[i] = min(v);
```

Should there be more than one index that satifies the relation, then all of them are emitted:

```LIVE
select i
  from Integer i, Vector v
 where v = [4,3,9,1,9,5]
   and v[i] = max(v);
```


For details on how to make general queries go to
[Topics->Queries](/docs/topic/Queries).

The [next tutorial](/docs/md/tutorial/save-database.md) shows how to
develop models, undo changes, and save the database of models on disk.
