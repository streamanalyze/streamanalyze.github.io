## Queries

A **query** in OSQL is a computation over one or several collections of objects that are either stored in sa.engine's local database or produced by some stream. The simplest form of a query in OSQL is function calls, as introduced in the previous sections. The **select** statement provides a more general way to formulates filters, transformations, and generators of different kinds of collections of objects. 

For example, the following query produces the bag of the numbers larger than 0.9 selected from the bag of numbers `sin(range(100))`:
```sql
select x
  from Number x
 where x in sin(range(100))
   and x > 0.9
```
If you are familiar with the **select** statement of [SQL](https://www.w3schools.com/sql/) you will notice that OSQL's **select** statement looks similar. A fundamental difference is that variables in the **select** statements of the object-oriented OSQL can be bound to objects of any kind, while variable in SQL's **select** statement are restricted to rows in tables. This makes OSQL better suited for defining algebraic models. Furthermore, OSQL supports filters over different kinds of collections, such as streams, vectors, bags, and dictionaries, rather than just tables.

### Collections

There are four kinds of collections supported by OSQL: **bags**, **vectors**, **streams**, and **dictionaries**:

- A **bag** is a set where duplicates are allowed.
- A **vector** is an ordered sequence of objects.
- A **stream** is a possibly infinite sequence of objects that may grow over time.
- A **dictionary** is an associative array of key-value pairs to represent generelizing [JSON](https://www.json.org/) objects.

Collections are constructed by queries. 

Examples:
```sql
range(5)

bag(0,1,2,3,4)

select n
  from Number n
 where n in range(5)
```
construct the same bag of five numbers in three different ways.

```sql
[0,1,2,3,4]

select Vector of range(5)
 
select Vector of n
  from Number n
 where n in range(5)
```
construct vectors of five numbers. 

```sql
select Stream of range(5)
```
constructs a finite stream of five numbers. 

```sql
heartbeat(0.5)

select Stream of n
  from Number n
 where n in sin(heartbeat(0.1))
   and abs(n) > 0.5
```
construct infinite streams of numbers.

```sql
{"Name": "mynumbers", "Numbers": [0,1,2,3,4]}

{"Name": "mynumbers", "Numbers": (select Vector of range(5))}
```
construct dictionaries where the key `Name` has the value `mynumbers` and the key `Numbers` has the value `[0,1,2,3,4]`.

### Querying bags and sets

In 


Often one wants to filter out elements from a stream, e.g. to identify deviating stream elements. For example, we might want to filter the elements of `simstream(0.1)` to select a stream of those elements the amplitude is larger than 1.5. This can be expressed using the `select stream of` statement:
This is an example of a **query** over a stream where the ``stream of` clause specifies the elements of the produced stream, the `from` clause declares local variables, and the `where` clause specifies a filter over the stream elements of an input stream specified with an `in` operator.
