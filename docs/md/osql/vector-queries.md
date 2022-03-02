# Vector queries

The order of the objects in the bag returned by a regular [select query](/docs/md/osql/queries.md#the-select-statement) is __not__ predetermined unless an [order by](/docs/md/osql/queries.md#ordered-selections) clause is specified. However, even if `order by` is specified the system will not preserve the order of the result of a select query if it is used in other operations.

If it is required to maintain the order of a set of data values the data type *Vector* has to be used. The collection data type *Vector* represents ordered collections of any kinds of objects; the simplest and most common case of a vector is a numerical vector of numbers. In case the order of a query result is significant you can specify *vector queries* that preserve the order in a query result by returning vectors rather than the bags returned by regular select queries. This is particularly important when working with numerical vectors. A vector query can be one of the following:

1. It can be a [vector construction](/docs/md/osql/vector-queries.md#vector-construction) expression that creates a new vector from other objects.

2. It can be a [vector indexing](/docs/md/osql/vector-queries.md#accessing-vector-elements) expression that accesses vector elements by their indexes.

3. It can be a regular [select query](/docs/md/osql/vector-queries.mdqueries.md#the-select-statement) returning a set of constructed vectors.

4. It can be a [select vector query](/docs/md/osql/vector-queries.md#the-select-vector-statement) that returns an ordered vector rather than an unordered bag as the regular select query.

5. It can be a call to some [vector function](/docs/topic/Vector)
returning vectors as result.

## Vector construction

The vector constructor `[...]` notation creates a single vector with explicit contents. The following query constructs a vector of three numbers: 
```sql
[1,sqrt(4),3] 
``` 
The returned vector is 
```sql
[1, 2.0, 3]
``` 
The following query constructs a bag of vectors holding the persons named Bill together with their ages:

```sql
   select [p,age(p)]
     from Person p 
    where name(p)="Bill" 
```

The above query is different from the following query that returns a bag of tuples::

```sql
   select p, age(p) 
     from Person p 
    where name(p)="Bill"
```

## The select vector statement

A *select vector query* provides a powerful way to construct new vectors by queries. It has the same syntax as a select query except for the keywords `Vector of` following the `select` clause. The difference is that whereas a select query returns a bag of objects, a select vector query returns a vector of objects. 

Example:
```sql
    select Vector of i*2
      from Integer i
     where i = [1,2,3]
     order by i
```
The query returns the vector `[2,4,6]`.

Notice that the `order by` clause normally should be present when constructing vectors with a select vector query in order to exactly specify the order of the elements in the vector. If no `order by` clause is present the order of the elements in the vector is arbitrarily chosen by the system based on the query, which is the order that is the most efficient to produce.

The built-in function `range()` is very useful when constructing vectors. It has the signature:
```
   range(Number x, Number y) -> Bag of Integer
```
`range(l,u)` returns the set of all integer `i where l <= i <= u`. 

Example:
```sql
   range(2,4)
```
returns the bag:
```
   2
   3
   4
```

Example:
```
    select vector of i
      from Number i
     where i in range(-4,5)
     order by i
```
returns the vector `[-4,-3,-2,-1,0,1,2,3,4,5]`


[Vector functions](/docs/topic/Vector) and operators can be used in queries.

Example:
```sql
   select lambda
     from Number lambda
    where [1, 2] - lambda = [11, 12]
```
returns `-10`.

If the equation has no solution, the query will have no result:
```sql
   select lambda
     from Number lambda
    where [1, 3] - lambda = [11, 12]
```

By contrast, note that this query:
```sql
   select lambda
     from Vector of Number lambda
    where [1, 2] - lambda = [11, 12]
```
returns `[-10,-10]`.

## Accessing vector elements

Vector elements can be accessed using the `[..]` syntax. The first element in a vector has index 1. 

Example:
```sql
   select a[1] + a[2]
     from Vector of Number a
    where a = [1,2,3]
```
returns `3`.

Index variables as numbers can be used in queries to specify iteration over all possibles index positions of a vector. 

Example:
```sql
   select vector of a[i]
      from Vector a, Integer i
     where a[i] != 2
       and a = [1,2,3]
     order by i
```
returns the vector `[1,3]`. The query should be read as "Make a vector v of all vector elements *a<sub>i</sub>* in *a* where *a<sub>i</sub> != 2* and order the elements in *v* on *i*."

The following query multiplies the elements of the vectors bound to the session variables `:u` and `:v`:
``` 
   select vector of :u[i] * :v[i]
      from Integer i
     order by i
```
