A **record** represents a set of attributes and their corresponding
values of an artifact. For example, the following record may represent
that a person named `Tore` has the income `100000`:

```
{"name":"Tore", "income":100000}
```

Other commonly used terms for records are JSON objects, property
lists, or dictionaries.

Let's assign the record above to a variable `:t`:

```LIVE
set :t = {"name":"Tore", "income":100000};
:t
```

An attribute `a` in a record `r` can be accessed using the `r[a]`
notation, for example:

```LIVE
:t["name"]
```

## Functions
