# Basic functions

There is a large number of functions stored in sa.engine's in-memory
*object-oriented database*. For example, the following function call
returns the version of sa.engine you are running.

Hello!

```LIVE
system_version()
```

> [exercise] **Exercise:** Run the function by clicking the play button <img src="/docs/images/play.png" height="20">:

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

> [note]   **Note:** You can enter several OSQL statements by separating them with a `;`.

*Examples:*

```LIVE
doc("heartbeat");

doc("atan2")
```

If you don't know exactly the name of a function you can use
`apropos("string")` to return all functions having the string in their
names.

*Example:*

```LIVE
apropos("atan");
```

The function call `apropos("atan")` returns as **objects** the
functions having the string `atan` in their names. Objects are
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

### Math functions

There is a large library of basic mathematical functions built into
the system and the usual arithmetic operators are available.

*Example:*

```LIVE
sin(3.14/2)*cos(3.14)
```

To learn more about basic math functions go to
[Topics->Math](/docs/topic/Math).

### Session variables

During sessions with sa.engine it is often practical to temporarily
save values of expressions in **session variables** prefixed with `:`
by using the `set` statement, e.g.

```LIVE
set :pi = asin(1)*2;

sin(:pi/2)*cos(:pi)
```

The session variable `:pi` is assigned the value of `sin(1)` and then
`2` is added.

> [note]   **Note:** Session variables disappear when you exit sa.engine. To
permanently save values in the built-in database you must use **stored
functions**, as explained next.

### Stored functions

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

###  <a name="define-model-function">  Derived functions </a>

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
argument(s) (`c` in `ctof`), the type(s) of the argument(s)
(e.g. `Number`), and the type of the result from the computation,
(e.g. `-> Number`).

### Temporal functions

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

### Vectors

So far the function calls were made over single values and sets of
single values. Building mathematical models, e.g. to identify
interesting properties of streams, also require **vectors** with the
usual `[...]` notation.

*Example:*

```LIVE
[1,4,3,2]+[1,5,6,7]
```

> [exercise] **Exercise:** Change visualization of the vector to `Bar plot` by clicking 
<img src="/docs/images/text.png" height="20">

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

### Vector functions

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

The built-in function `euclid()` does the same.

The general Minkowski distance computation function `minkowski()` is
also built-in. This example shows Manhattan distance (c194a9eg$ L_1 $), Euclidean
(c194a9eg$ L_2 $) and Chebyshev (c194a9eg$ L_infty $) distance expressed in terms of
`minkowski()`.

*Examples:*

```LIVE
minkowski([1,2],[3,4], 1);

minkowski([1,2],[3,4], 2);

minkowski([1,2],[3,4], 1.e320);
```

### Matrices

A **matrix** is a two-dimensional numerical vector. It is the same
as type `Vector of Vector of Number`.

*Examples:*

```LIVE
[[1,2],[3,4]] * [[2,3],[6,7]];

[[1,2],[3,4]] .* [[2,3],[6,7]]
```

### <a name="FFT"> The Fast Fourier Transform

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

### Vectors of objects

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

### Sets and bags

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

> [note]    **Note:** Applying other functions, such as `sin()` on a set means
that the function is applied on **each element** of the set.

> [exercise] Try visualizing the result as a line plot!

In general sets in OSQL may contain duplicates.

*Example:*

```LIVE {"vis":"showLine"}
floor(range(200)/2)
```

The term **bag** is used rather than **set** to indicate sets with
possible duplicates.

> [exercise] **Exercise:** Apply `sin()` on the result of `floor`!

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

The [next tutorial](/docs/md/tutorial/save-database.md) shows how to develop models,
undo changes, and save the database of models on disk.