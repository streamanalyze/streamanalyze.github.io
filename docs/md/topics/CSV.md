sa.engine supports several ways to save and load data. One of the
easiest ways is using [Comma Separated Value (CSV)
files](https://en.wikipedia.org/wiki/Comma-separated_values).  Any
`Stream of Vector` or `Bag of Vector` can be saved to a CSV *log file*
recordning using one of the `csv:write_file` functions:

```LIVE
signature(apropos("csv:write_file"));
```

Each row written to a CSV file is a vector. For instance to save 10
rows where each row has a number from 1 to 10 the following query can
be used:

```LIVE
csv:write_file("test.csv",(select [i] 
                             from Number i 
                            where i in iota(1,10)))
```

You can convert a CSV log file to a live vector stream by calling
`csv:file_stream`, for example:

```LIVE
csv:file_stream("test.csv");
```

To save a stream to a CSV log file and at the same time get the
output, set the `feedback` argument to 1:

```LIVE
csv:write_file("test.csv",1,(select [i, sin(i)] 
                               from Number i 
                              where i in iota(1,10)))
```

```LIVE
csv:file_stream("test.csv");
```

## Functions
