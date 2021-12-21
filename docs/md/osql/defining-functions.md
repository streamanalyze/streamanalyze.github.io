# Defining Functions

The *create function* statement defines a new user function stored in the database. Functions can be one of the following kinds:

- *Stored functions* are stored in the sa.engine database as a table.

- *Derived functions* are defined by a single [query](/docs/md/osql/queries.md) that returns the result of the a function call for given parameters.

- *Foreign functions* are defined in an external programming language. Foreign functions can be defined in the programming languages CommonLisp, Java, or C/C++.

- *Procedural functions* are defined using procedural OSQL statements that can have side effects changing the state of the database. Procedural functions make OSQL computationally complete.

- *Overloaded functions* have different implementations depending on the argument types in a function call.

Examples:
```sql
   create function name(Person p) -> Charstring key
     as stored

   create function born(Person) -> Integer
     as stored
     
   create function children(Person p) -> Bag of Person c
     as stored
     
   create function parents(Person c) -> Bag of Person p
     as select p 
          from Person p 
         where c in children(p) 
```

Function names are **not** case sensitive and are internally stored upper-cased.

## Function signatures

The *function signature* defines the types of the arguments and results of a function. 

Examples:
```
   born(Person) -> Integer
   name(Person p) -> Charstring key
   children(Person p) -> Bag of Person c
```

All types used in a function signature must be previously defined.

The optional names of arguments and result parameters of a function signature must be unique. 

`Bag of` specifications on the result of a function signature declares that the function returns a bag of values, rather than a single value.

Functions may return more than a single value as *tuples*, for example:
```sql
   create function marriages(Person p) -> Bag of (Person spouse, Integer year)
     as stored
```
has the signature `marriages(Person p) -> Bag of (Person spouse, Integer year)`.

 
## Stored functions

The *function body* specifies how values relate to arguments in a function definition.

A *stored function* is defined by the function body `as stored`.

Examples:
```sql
   create function name(Person p) -> Charstring key
     as stored
     
   create function born(Person) -> Integer
     as stored
```

A stored function is represented as a table in the database.

**Notice** that stored functions cannot have arguments declared `Bag of`.

## Derived functions

A *derived function* is defined by a single query.

Examples:
```sql
   create function taxed_income(Person p) -> Number
     as income(p) - taxes(p)
     
   create function parents(Person c) -> Bag of Person p
     as select p 
          from Person p 
         where c in children(p)
```

Functions with result type `Boolean` implement predicates and return `true` when the condition is fulfilled.

Examples:
```sql
   create function child(Person p) -> Boolean
     as select true where age(p)<18
     
   create function child(Person p) -> Boolean
     as age(p) < 18
```

Since the select statement returns a bag of values, derived functions also often return `Bag of` results. If you know that a function returns a bag of values you should indicate that in the signature. 

Example:
```sql
   create function youngFriends(Person p) -> Bag of Person
     as select f
          from Person f
         where age(f) < 18
           and f in friends(p)
```

If you instead had written:
```sql
   create function youngFriends(Person p) -> Person
     as select f
          from Person f
         where age(f) < 18
           and f in friends(p)
```
you would assume that `youngFriends()` returns a single value. Notice that this constraint is **not** enforced by the system so if there are more that one `youngFriends()` the system will treat the result as a bag.

Variables declared in the result of a derived function need not be declared again in the `from` clause; their types are inferred from the function signature. 

Alternative definition of `youngFriends()`:
```sql
   create function youngFriends(Person p) -> Bag of (Person f)
     as select f
         where age(f) < 18
           and f in friends(p)
```

Derived functions whose *arguments* are declared `Bag of` define [aggregate functions](/docs/md/osql/queries.md#aggregate-functions). Aggregate functions do not use [Daplex semantics](/docs/md/osql/queries.md#nested-function-calls) but compute values over their entire arguments bag.

Example:
```sql
   create function myavg(Bag of Number x) -> Number
     as sum(x)/count(x)
```
The following query computes the average
age of Carl's grandparents:
```sql
   select myavg(age(grandparents(q)))
     from Person p
    where name(q)="Carl"
```

When functions in queries return tuples with more than one element the results are bound by enclosing the function result within parentheses (..), for example:
```sql
   select name(s), y
     from Person m, Person f, Person p
    where (s,y) in marriages(p)
      and name(p) = "Oscar"
```

## Overloaded functions

Function names may be *overloaded*, i.e., functions having the same name may be defined differently for different argument types. This allows to define generic functions applicable on objects of several different argument types. Each specific implementation of an overloaded function is called a *resolvent*.

For example, the following two function definitions create two resolvents of the overloaded function `less()`:
```sql
   create function less(Number i, Number j)->Boolean
     as i < j

   create function less(Charstring s,Charstring t)->Boolean
     as s < t
```

Internally the system stores the resolvents under different internal function names. The name of a resolvent is obtained by concatenating the type names of its arguments with the name of the overloaded function followed by the symbol `->` and the type of the result. The two resolvents above will be given the internal resolvent names `NUMBER.NUMBER.LESS->BOOLEAN` and `CHARSTRING.CHARSTRING.LESS->BOOLEAN`.

<a name="resolvent-name">

The query compiler resolves the correct resolvent to apply based on the types of the arguments; the type of the result is not considered. If there is an ambiguity, i.e. several resolvents qualify in a call, or if no resolvent qualify, an error will be generated by the query compiler.

When overloaded function names are encountered in function bodies, the system will use local variable declarations to choose the correct resolvent (early binding). 

Example:
```sql
   create function younger(Person p,Person q)->Boolean
     as less(age(p),age(q))
```
will choose the resolvent `NUMBER.NUMBER.LESS->BOOLEAN`, since `age()` returns integers and the resolvent `NUMBER.NUMBER.LESS->BOOLEAN` is applicable to integers by inheritance. The other function resolvent `CHARSTRING.CHARSTRING.LESS->BOOLEAN` does not qualify since it cannot have integer arguments.

For example, the function:
```sql
   create function nameordered(Person p,Person q)->Boolean
     as less(name(p),name(q))
```
will choose the resolvent `CHARSTRING.CHARSTRING.LESS->BOOLEAN` since the function `name()` returns a string. In both cases the type resolution (selection of resolvent) will be done at compile time.

## Late binding

Sometimes it is not possible to determine the resolvent to choose based on its arguments, so the type resolution has to be done at run time. This is called *late binding*.

For example, suppose that managers are employees whose incomes are the sum of the income as a regular employee plus some manager bonus:
```sql
   create type Employee under Person
   
   create type Manager under Employee
   
   create function mgrbonus(Manager)->Integer as stored
   
   create function income(Employee)->Integer as stored
   
   create function income(Manager m)->Integer i
     as select income(e) + mgrbonus(m)
          from Employee e
         where e = m
```
In the example the equality `e = m` is used for selecting the salary of the manager as a regular employee.

Now, suppose that we need a function that returns the gross incomes of all persons in the database, i.e. we use `MANAGER.INCOME->INTEGER` for managers and `EMPLOYEE.INCOME->INTEGER` for non-manager. Such a function is defined as:
```sql
   create function grossincomes() -> Integer i
     as select income(p)
          from Employee p
```
Since `income` is overloaded with resolvents `EMPLOYEE.INCOME->INTEGER` and `MANAGER.INCOME->INTEGER` and both qualify to apply to employees, the resolution of `income(p)` will be done at run time. To avoid the overhead of late binding one may use casting, as explained next.

## Casting expressions

The type of an expression can be explicitly defined using the *casting* statement, for example:
```sql
   create function income(Manager m)->Integer i
     as income(cast(m as Employee)) + mgrbonus(m)
```


## Deleting functions

Functions are deleted with the `delete function` statement. 

Examples:
```sql
   delete function married
   
   delete function Person.name->Charstring
```

Deleting a function also deletes all functions calling the deleted function.
