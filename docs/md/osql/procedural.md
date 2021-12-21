# Procedural and stateful functions

A *procedural function* is a function defined as a sequence of OSQL
statements that may have side effects, e.g. database update
statements. Most OSQL statements are allowed in procedure bodies.

Procedural functions can be called in queries. The query optimizer is
aware of that procedural functions may change the state of the
database when it is called. Therefore the optimizer is careful not to
change the order in which such *stateful* functions are called in a
query. 

Notice that also other functions than procedural functions can be
stateful in that they are affected by some internal state. For
example, wall clock functions like `now()` and random generators such
as `rand(low,high)` are stateful. Also the operator `e in s` is
stateful when its second argument ´s´ is a stream, i.e. when elements
`e` are extracted from `s`: . The reason is that a stream may
continuously change its state, e.g. when new sensor readings arrive.

You can check whether a function `f` is stateful by the function
`stateful(f)`, for example:
```LIVE
select doc(f)
  from Function f
 where f in apropos("log")
   and stateful(f)
```

The following procedural function `creperson()` creates a new
person and sets the properties `name()` and `income()`, i.e. it is a
*constructor* for persons:

```sql
   create function creperson(Charstring nm,Integer inc) -> Person p
     as { create Person instances p;
          set name(p)=nm;
          set income(p)=inc;
          return p;
        };
```
Example of use:
```
   set :p = creperson('Karl',3500)
```

The function `flatten_incomes()` updates the incomes of all persons
having higher income than a threshold value:

```sql
   create function flatten_incomes(Integer threshold) -> Boolean
     as for each Person p
           where income(p) > threshold
             set income(p) = income(p) - (income(p) - threshold) / 2;
```
Example of use:
```
   flatten_incomes(1000)
```
## Iterating over results

The `for each` statement iterates over the result of a query by
executing the `for each` body for each result variable binding of the
query. For example the following procedural function adds *inc* to the
incomes of all persons with salaries higher than *limit* and returns
their *old* incomes:

```sql
   create function increase_incomes(Integer inc,Integer thres) -> Integer oldinc
     as for each Person p, Integer i
           where i > thres
             and i = income(p)
               { return i;
                 set income(p) = i + inc;
               };
```

The `for each` statement does not return any value at all unless a
`return` statement is called within its body as in
`increase_incomes()`.

If the `return` statement is not called in a procedural function, the
result of the procedural function is empty. If a procedural function
is used for its side effects only, not returning any value, the result
type `Boolean` can be specified.
