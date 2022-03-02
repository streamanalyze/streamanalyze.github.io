# Basic functions

There is a large number of functions stored in sa.engine's in-memory
*object-oriented database*. For example, the following function call
returns the version of sa.engine you are running.

```LIVE
system_version()
```

> [exercise] **Exercise:** Run the function by clicking the play
> button <i class="material-icons" style="vertical-align:
> middle">play_circle_outline</i>

Documentation of functions and other sa.engine artifacts are stored in
the database as well. You can **query** the database about the
documentation of a function named `myfunction` by evaluating
`doc("myfunction")`. The `doc()` function returns the documentation of
the function as a string.

*Example:*

```LIVE
doc("sqrt")
```

You can edit the examples in the tutorial. Try changing `sqrt` to `sin`!

> [note] **Note:** You can enter several OSQL statements by separating
> them with a `;`.

*Examples:*

```LIVE
doc("heartbeat");

doc("euclid")
```

If you don't know exactly the name of a function you can use
`apropos("string")` to return all functions having the string in their
names.

*Example:*

```LIVE
apropos("atan");
```

The function call `apropos("atan")` returns as **objects** the
functions having the string `tan` in their names. Objects are
displayed as `#[OID n id]` where `n` is a unique object number and
`id` is an optional object name.

Only knowing the function objects is usually not very useful. Here, we
would rather like to get documentations about the functions we found.
The expression `doc(apropos("atan"))` calls the function `doc()` for
each function retrieved by `apropos("atan")` to retrieve the two
documentation strings.

*Example:*

```LIVE
doc(apropos("atan"))
```

The function `sourcecode("function")` returns the function's
definition stored in the database.

*Example:*

```LIVE
sourcecode("atan")
```

As `doc()`, `sourcecode()` works also for objects.

*Example:*

```LIVE
sourcecode(apropos("atan"))
```

The functions are grouped into **topics** stored in the database. To
get summary of all documentation functions do:

```LIVE
doc(topic_named("Documentation"))
```

or go to [Topics->Documentation](/docs/topic/Documentation) for details.

## Math functions

There is a large library of basic mathematical functions built into
the system and the usual arithmetic operators are available.

*Example:*

```LIVE
sin(3.14/2)*cos(3.14)
```

To learn more about basic math functions go to
[Topics->Math](/docs/topic/Math).

## Session variables

During sessions with sa.engine it is often practical to temporarily
save values of expressions in **session variables** prefixed with `:`
by using the `set` statement, e.g.

```LIVE
set :pi = asin(1)*2;

sin(:pi/2)*cos(:pi)
```

The session variable `:pi` is assigned the value of `sin(1)` and then
`2` is added.

> [note] **Note:** Session variables disappear when you exit
> sa.engine. To permanently save values in the built-in database you
> must use **stored functions**, as explained next.

## Stored functions

Analysis *models* are defined in terms of a number of OSQL
functions. OSQL functions are created and stored in the database by
evaluating a `create function` statement.

**Stored functions** hold tabulated function values permanently in the
built-in database. They are created by a `create function ... as
stored` statement.

*Example:*

```LIVE
create function const(Charstring c) -> Real
  as stored
```

The above statement creates a tabulated function called `const` taking
a string `c` as argument and returning a real number as
result.

You are recommended to document your functions by a *master comment*
preceding the `as`.

*Example:*

```LIVE
create function const(Charstring c) -> Real
  /* The value of the math constant named `c` */ 
  as stored;

doc("const")
```

Stored functions can be *populated* using the `set` statement.

*Example:*

```LIVE
set const("pi") = 3.14;

set const("e") = 2.71;

const("pi");

ln(const("e"));

sin(const("pi")/2)*cos(const("pi"));
```

You can also *update* stored functions using `set`, for example:

```LIVE
set const("pi") = asin(1)*2;

set const("e") = exp(1);

ln(const("e"));

sin(const("pi")/2)*cos(const("pi"))
```

Functions may have no arguments at all.

*Example:*

```LIVE
create function mypi() -> Real
  /* The constant PI */
  as stored;

set mypi() = asin(1)*2;

mypi()
```

## Derived functions

A *derived function* is a function defined by an expression.

*Example:*
The following function converts Celsius degrees to
Fahrenheit:

```LIVE
create function ctof(Number c) -> Number
  /* Convert a Celsius degree `c` to Fahrenheit */ 
  as c * 9 / 5 + 32;

ctof(10)
```

The head of the function, e.g `ctof(Number c) -> Number`, is called
the function's **signature**. It defines the name(s) of the
argument(s) (`c` in `ctof(c)`), the type(s) of the argument(s)
(e.g. `Number`), and the type of the result from the computation,
(e.g. `-> Number`).

## Temporal functions

The function `local_time()` returns the current wall time as an [ISO
time stamp](https://sv.wikipedia.org/wiki/ISO_8601).

While `local_time` returns the current wall time as a string, the
function `now()` returns the wall time as an object of type `Timeval`,
which is the internal representation of time points.

*Examples:*

```LIVE
local_time();

now()
```

The function `ts(Object o)->Timeval` returns a **time stamped object**
which represents a timestamped value `o`.

*Examples:*

```LIVE
ts(1);

value(ts(1));

local_time(ts(1))
```

For more about functions over time visit [Topics->Time](/docs/topic/Time).

## Vectors

So far the function calls were made over single values and sets of
single values. Building mathematical models, e.g. to identify
interesting properties of streams, also require **vectors** with the
usual `[...]` notation.

*Example:*

```LIVE
[1,4,3,2]+[1,5,6,7]
```

> [exercise] **Exercise:** Change visualization of the vector to `Bar plot` by clicking 
**Text &gt;**

The mathematical operators `+,-,*,/,^` can be used for whole vectors
or mixes of vectors and scalar values.

*Example:*

```LIVE {"vis":"showBar"}
[1,4,3,2]-[0,2,3,4]+1
```

How would it look as text?

A `.` in front of an operator indicates element-wise application of it
on each element of the vectors. For example, for multiplication the
`*` operator over vectors returns the scalar product while `.*`
returns element-wise multiplication.

*Examples:*

```LIVE
[1, 2, 3, 4] * [5, 6, 7, 8];

[1, 2, 3, 4] .* [5, 6, 7, 8]
```

*More examples:*

```LIVE
"Addition";
[1, 2, 3, 4] + [5, 6, 7, 8];

"Scalar times vector";
5 * [1, 2, 3, 4];

"Element-wise power of two";
[1, 2, 3, 4] .^ 2
```

## Vector functions

There are many built-in **vector functions**, e.g.:

```LIVE
"sum";
sum([1, 2, 3, 4]);

"mean";
mean([1, 2, 3, 4]);

"standard deviation";
stdev([1, 2, 3, 4]);

"median";
median([1, 4, 2, 3]);

"max";
max([1, 4, 2, 3]);

"dimension";
dim([1, 3, 2])
```

Often vectors are used in derived function definitions. For example,
the following function computes the Euclidean distance between vector
`v` and `w`:

```LIVE
create function dist(Vector v, Vector w) -> Number
  /* Compute the Euclidean distance between `v` and `w` */
  as sqrt(sum((v - w) .^ 2));

dist([1,2],[3,4])
```

The built-in function `euclid(v,w)` does the same.

The general Minkowski distance computation function `minkowski(v,w,r)` is
also built-in. This example shows Manhattan distance ($ L_1 $), Euclidean
($ L_2 $) and Chebyshev ($ L_{infty} $) distance expressed in terms of
`minkowski(v,w,r)`.

*Examples:*

```LIVE
minkowski([1,2],[3,4], 1);

minkowski([1,2],[3,4], 2);

minkowski([1,2],[3,4], 1.e320);
```

## Matrices

A **matrix** is a two-dimensional numerical vector. It is the same
as type `Vector of Vector of Number`.

*Examples:*

```LIVE
[[1,2],[3,4]] * [[2,3],[6,7]];

[[1,2],[3,4]] .* [[2,3],[6,7]]
```
## The Fast Fourier Transform

The function `rfft(v)` computes the real number [Fast Fourier
Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
(FFT) over a vector of numbers `v`.

*Example:*

```LIVE
rfft([1, 2, 3, 4])
```

The inverse real FFT is computed with `irfft(v)`.

*Example:*

```LIVE
irfft(rfft([1, 2, 3, 4]))
```

The later tutorial section [Querying the microphone](/docs/md/tutorial/audiostream.md)
shows how user-defined functions over vectors and FFT can be used for
filtering audio streams in real-time.

## Vectors of objects

So far the vectors contained only numbers, as required by math
functions and operators. Actually, vectors can contain any kind of
objects including strings and numbers. For example, the following
vector contains both a number and a string:

*Example:*

```LIVE
["Tore", 1234]
```

In general vectors are used for representing ordered finite sequences of 
objects. By contrast, a **stream** can be seen as a possibly infinite growing 
sequence of objects. Vectors can be used to group elements in streams, 
as will be explained later.

Go to [Topics->Vector](/docs/topic/Vector) for documentation of vector
functions.

## Sets and bags

Functions can also produce sets of objects where the order is not
guaranteed as with vectors. For example, the function `range(n)`
returns the set of numbers from 1 up to `n`.

*Example:*

```LIVE
range(10)
```

Here `range(10)` produces the set of all integers from 1 to 10.

*Example:*

```LIVE
sin(range(200)*0.2)
```

Here the sine function is applied one each element in the set of all
integers from 1 to 10.

> [note] **Note:** Applying other functions, such as `sin(x)` on a set
> means that the function is applied on **each element** of the set.

> [exercise] Try visualizing the result as a line plot!

In general sets in OSQL may contain duplicates.

*Example:*

```LIVE {"vis":"showLine"}
floor(range(200)/2)
```

The term **bag** is used rather than **set** to indicate sets with
possible duplicates.

> [exercise] **Exercise:** Apply `sin(x)` on the result of `floor`!

As for vectors, **aggregate functions** over bags are applied on
entire bags, rather than on each element of the bag as, for example
`range(n)` returns a bag of number and `sum(Bag of Number)->Number`
sums the elements of a bag of number.

*Example:*

```LIVE
sum(range(200)/2)
```
See [Topics->Aggregate](/docs/topic/Aggregate) for more on aggregate
functions.

## Select queries

**Select queries** can filter out and transform objects fulfilling
some specific properties from collections of objects.

This is an example of a query selecting the odd elements
among the integers between 10 and 15:

```LIVE
select i
  from Integer i
 where i in range(10,15)
   and odd(i)
```

The following query returns the name and values of the constants in
the stored function `const` whose closest integer is 3:

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
 where d in range(2,sqrt(n))
   and 0 = mod(n,d)
   and n = 144
```
Queries my be used for defining derived functions in models, for example:
```LIVE
create function divisors(Integer n) -> Bag of Integer
  as select d
       from Integer d
      where d in range(2,n/3)
        and 0 = mod(n,d)
```
The following query returns the divisors of 143:
```LIVE
divisors(143)
```

Queries can be made over different kinds of collections. For example,
the following select query returns the prime numbers in the vector
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
defined objects. Combined with functions this makes analytical models
in different domains easy to express with OSQL. 

In the tutorial [Streams](/docs/md/tutorial/streams.md) it will be
shown how to specify OSQL queries over live streams.

General queries over sets and bags are documented in
[Queries](/docs/md/osql/queries.md).

Qeries to filter and transform elements in vectors and
tensors are documented in [Vector
queries](/docs/md/osql/vector-queries.md).

## Case rules

**Case rules** allow to define functions and formulas that have
different definitions depending on their arguments. For example, a
`signum(x)` function can be defined as:


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

The [next tutorial](/docs/md/tutorial/save-database.md) shows how to
develop models, undo changes, and save the database of models on disk.
