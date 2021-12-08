## Basic Constructs

The basic building blocks of the OSQL query language are described here.

### <a name="statements"> Statements

*Statements* instruct sa.engine to perform various kinds of operations on the database, for example:
```
1+2
sin(2)+3
quit
```

When using the sa.engine Console REPL, OSQL statements are always terminated by a semicolon (;). The `;` is not needed when using sa.studio. 

### <a name="identifiers"> Identifiers

*Identifiers* represent names of OSQL variables, functions, and types. Examples:
```
   MySalary
   sin
   Integer
   x
   x1234
   x1234_b
```

Notice that OSQL identifiers are NOT case sensitive; i.e. they are always internally capitalized. By contrast OSQL reserved keywords are always written with *lower case* letters, for example.
```
create function ...
```

### <a name="variables"> Variables

*Variables* are of two kinds: *local variables* or *session variables*. 

*Local variables* are identifiers for data values inside OSQL queries and functions. *Local variables* must be declared in function signatures (see [Defining Functions](/docs/md/osql/defining-functions.md)), in from clauses (see [Queries](/docs/md/osql/queries.md)). Notice that variables are **not** case sensitive.

Examples:
```
   my_variable
   MyVariable2
```

*Session variables* prefixed with `:` hold only **temporary** results during interactive sessions. Session variables **cannot** be referenced in function bodies and they are **not** stored in the database. Their lifespan is the current transaction only. Their purpose is to hold temporary values in scripts and database interactions.

Examples:
```
   :my_session_variable
   :MySessionVariable2
```

The user can declare a session variable to be of a particular type by the *session variable declare statemen*, for example:
```
   declare Integer :i, Real :x3
```

Session variables can be assigned either by the `into` clause of the [select statement](/docs/md/osql/queries.md#the-select-statement) or by the session variable assignment statement *set*. 

Examples
```
   set :x3 = 2.3
   set :i = 2 + sqrt(:x3)
```

*Constants* can be integers, reals, strings, time stamps, booleans, or null.

Examples:
```
   123
   -123
   1.2
   -1.0
   2.3E2
   -2.4e-21
   true
   false 
   null
``` 

*Boolean constants* represent logical values. The constant `false` is equivalent to `null` casted to type *Boolean*. The only legal boolean value that can be stored in the database is `true` and a boolean value is regarded as false if it is not in the database (so called close world assumption).

Examples of *strings*:
```
   "A string"
   'A string'
   'A string with "'
   "A string with \" and '"
```

The enclosing string separators (`'` or `"`) for a string constant must be the same. If the string separator is `"` then `\` is the escape character inside the string, replacing the succeeding character. For example the string `'ab"\'` can also be written as `"ab\"\\"`, and the string `a'"b` must be written as `"a'\"b"`.

A *simple value* is either a constant or a variable reference.

Examples:
```
   :MySessionVariable
   MyLocalVariable
   123
   "Hello World"
```

### <a name="comments"> Comments 

A *comment* enclosed with `/*` and `*/`can be placed anywhere in an OSQL statement outside identifiers, constants, strings, or variables. 

### <a name="expressions"> Expressions

*Expressions* are formulas expressed with the OSQL syntax that can be evaluated by the system to produce a *value*. Complex expressions can be built up in terms of other expression. Expressions are basic building blocks in all kinds of OSQL statements.

Examples:
```
   1.23
   1+2
   1<2 and 1>3
   sqrt(:a) + 3 * :b
   [1,2,3]
   cast(:p as Student)
   a[3]
   sum(select income(p) from Person p) +10
```

The value of an expression is computed if the expression is entered to an sa.engine REPL. Example:
```
   1+5*sqrt(6)
```

Entering simple expressions followed by a semicolon is the simplest form of OSQL [queries](/docs/md/osql/queries.md). Example:

```
   1+sqrt(25)
```

Notice that Boolean expressions, *predicates*, either return *true*, or nothing if the expression is not true. Example:

```
   1<2 or 3<2
     => true
   1<2 and 3<2
     => nothing
```

### <a name="collections"> Collections

*Collections* represent sets of objects. OSQL supports three kinds of collections: bags, vectors, and key-value associations (records):

- A `bag` is a set where duplicates are allowed.
- A `vector` is an ordered sequence of objects.
- A `record` is an associative array of key-value pairs.

Collections are constructed by collection constructor expressions. 
Examples:
``` 
   bag(1,2,3)
   bag(1,:x+2)
   [1,2,3]
   [[1,2],[3,4]]
   [1,name(:p),1+sqrt(:a)]
   {"id":1,"name":"Kalle","age":32}
```

A common collection is *bags*, which are unordered sets of objects with duplicates allowed. The value of a query is usually a bag. When a query to an sa.engine REPL returns a bag as result the elements of the bag are printed on separate lines. 

For example:
```
   select name(p) from Person p
```
returns the bag:
```
   "Bill"
   "John"
   "Ulla"
   "Eva"
```

Bags can be explicitly created using the *bag-constr* syntax, for example:
```
   bag(1,2,2,3)
```

*Vectors* are sequences of objects of any kind. Square brackets `[]` enclose vector elements, For example, `set :v=[1,2,3]` then `:v` returns `[1,2,3]`.

Vector element `vi` can be access with the notation `v[i]`, where the indexing `i` is from 1 and up. For example `set :v=[1,2,3]` then `:v[3]` returns `3`.

*Records* represent dynamic associations between keys and values. A record is a dynamic and associative array. Other commonly used terms for associative arrays are property lists, key-value pairs, dictionaries, or hash links. OSQL uses generalized JSON notation to construct records. For example the following expression assigns `:r` to a record where the key (property) 'Greeting' field has the value 'Hello, I am Tore' and the key 'Email' has the value 'Tore.Andersson@it.uu.se':

```
   set :r= {'Greeting':'Hello, I am Tore','Email':'Tore.Andersson@it.uu.se'}
```

A field `f` of a record bound to a variable `r` can be access with the notation `r[f]`, for example:
`:r['Greeting' ]` returns `Hello, I am Tore`.

