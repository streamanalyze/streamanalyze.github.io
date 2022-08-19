This model contains tools for development of the sa.engine system
itself. It is thereby assumed that the system is run from the desktop
in the sa.engine development repo. Some tools should be run from an OS
console and preferably from an Emacs shell (as explained in
doc/sa_Lisp_2.0.pdf).

## Querying system source code

In the sa.engine development environment, the source code of the
system can be queried with OSQL.

The function `grep(Charstring pat) -> Stream of Charstring` scans
through the source files loaded into the current database image for
source lines matching `pat` somewhere.

For example:
```LIVE
grep("integer2hex")
```

If you want to scan all source files in the repositories `sa.engine`
and `sa.community_content` you can use `all_code_files()` combined
with `grep(Charstring pat,Charstring file)->Stream of
Charstring`. This assumes that the environment variables
`SA_ENGINE_HOME` and `SA_COMMUNITY_CONTENT_HOME` are set properly.

For example, the following searches through the repos for all code
lines in files with extensions `lsp` or `osql` that matches the string
`integer2hex`:

```LIVE
grep("integer2hex", all_code_files(["lsp","osql"]))
```

Examples of other useful source code queries (allow some time for them
to finish):

Number of code folders:
```LIVE
count(all_code_folders())  
```

Extensions of files regarded as code files (can be updated):
```LIVE
included_code_extensions()
```

Repository paths excluded in code searches (can be updated):
```LIVE
excluded_paths()
```

Number of code files:
```LIVE
count(all_code_files())
```

Number of code lines:
```LIVE
total_code_lines()
```
Ten largest files:
```LIVE
largest_files(10)
```

Number of Lisp code lines:
```LIVE
total_code_lines("lsp")
```

Ten largest h files:        
```LIVE
largest_files(10,"h");
```

Any GPL files?
```LIVE
grep(" GPL",all_code_files());
```

Calls to macro globval in C:
```LIVE
grep("globval(",all_code_files(["c","h"]));
```

Code lines in serial folder:
```LIVE
sum(file_lines(all_code_files("extenders/serial")));
```

## Query processing steps

OSQL statements are compiled in several steps. During these steps code
is optimized, transformed, and translated into a number of
intermediate languages. The examples queries below display the results
from the different stages of the OSQL function `primes(n)` that computes all prime numbers smaller than `b`. It has the definition:

```LIVE
create function primes(Integer n)->Bag of Integer
  as select m
       from Integer m
      where notany(select factor
                     from Integer factor
                    where mod(m,factor) = 0
                      and factor in range(2,sqrt(m)))
        and m in range(2,n);
```

The function `code(Charstring fn, Charstring l)->Charstring` returns
the representation of the OSQL function named `fn` in the (internal)
language `l`.

First, inspect the OSQL source code of `primes(n)`:

```LIVE
code('primes', 'osql')
```
This is the same as calling `sourcecode('primes')`

**Parsing**

The first step of query processing is to textually parse the OSQL
statement into a Lisp
[S-expression](https://en.wikipedia.org/wiki/S-expression), which is
an *executable* [abstract syntax
tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that defines
the OSQL function `primes(n)` when evaluated.

The following query inspects the pretty-printed S-expression defining
the function `primes(n)`:

```LIVE
code('primes', 'lisp')
```

**Compilation to optimized Objectlog**

In the second step, the S-expression is translated into a declarative
[ObjectLog](http://www.it.uu.se/research/group/udbl/publ/tkde92.pdf)
query. ObjectLog is an object-oriented
[Datalog](https://en.wikipedia.org/wiki/Datalog) dialect. In this step
the parsed OSQL S-expression is type checked and then compiled into
ObjectLog. After the compilation, re-writes are applied on the
generated ObjectLog query to produce an equivalent optimized ObjectLog
query.

The optimized ObjectLog query implementing `primes(n)` is inspected with:

```LIVE
code('primes','objectlog')
```

**Cost-based query optimization**

In the third step, [cost based query
optimization](https://en.wikipedia.org/wiki/Query_optimization) is
used to produce an *execution plan* in the *SLOG (Streamed LOGic)*
language. SLOG is a procedural streamed language to represent
executable procedural code for optimized ObjectLog.

The SLOG execution plan for `primes(n)` is inspected with the query:

```LIVE
code('primes', 'slog')
```
This is the same as calling 'slog('primes')'.

**SLOG compilation**

In the fourth step, those fragments of the SLOG execution plan that
the SLOG compiler is able to handle is compiled and optimized into
byte code in an assembly language called *SLAP (SLog Assembly
Program)*.  However, not all queries and functions can be completely
compiled into SLAP. Therefore, the SLOG compiler identifies
*fragments* of the SLOG execution plan that can be translated into
SLAP, thus producing a *fragmented* execution plan containing
byte code fragments. To see what fragments of `prime()` can be
translated to SLAP fragments, call:

```LIVE
code('primes','slapf')
```

A *SLOG interpreter* is always present to interpret SLOG that cannot
be translated to SLAP fragments.

To see the actual assembly instructions of the SLAP fragments, call:

```LIVE
code('primes','slap')
```

This is the same as calling `slap('primes')`.

**SLAP assembler**

In a fifth step, a *SLAP assembler* produces binary code for some or
all the target architectures supported by sa.engine. Optimization
rules are applied to produce fast and efficient binary code. The
relevant fragmented SLOG execution plan with binary code for the
target architecture is shipped to the sa.engine peers and edge clients
where it is executed.

## Functions