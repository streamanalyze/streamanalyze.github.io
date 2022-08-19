# CSV
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

> [function]
> csv:file_stream(Charstring file,Charstring option)->Stream of Vector

> [function-docs]
> Stream tuples from CSV `file`.
>      `option` is one of `read`, `loop`, or `tail` 



___

> [function]
> csv:file_stream(Charstring file,Charstring option,Number pace)->Stream of Vector

> [function-docs]
> Playback CSV `file` in a specified `pace`. 
>      The `option` is one of `read`, `loop`, or `tail` 



___

> [function]
> csv:file_stream(Charstring file)->Stream of Vector

> [function-docs]
> Stream tuples from CSV `file` 



___

> [function]
> csv:from_string(Charstring row)->Vector

> [function-docs]
> Read CSV from a charstring 



___

> [function]
> csv:load(Charstring model,Charstring file)->Charstring

> [function-docs]
> Load exported functions from CSV `file` in `model` 



___

> [function]
> csv:popen_stream(Charstring command)->Stream of Vector

> [function-docs]
> Call an OS `command` that produces a CSV stream on standard output 



___

> [function]
> csv:serial_stream(Charstring sn,Integer br)->Stream of Vector

> [function-docs]
> CSV stream from serial port named `sp` with baud rate `br` 



___

> [function]
> csv:serial_stream(Charstring sn,Integer br,Charstring flow_control,
                 Integer data_bits,Integer stop_bits,Integer parity)
                 ->Stream of Vector

> [function-docs]
> CSV stream from serial port named `sp` with baud rate `br` 



___

> [function]
> csv:socket_stream(Charstring host,Integer sp,Object request)->Stream of Vector

> [function-docs]
> CSV stream from port `sp` on `host` 



___

> [function]
> csv:socket_stream(Charstring host,Integer sp)->Stream of Vector

> [function-docs]
> CSV stream from port `sp` on `host` 



___

> [function]
> csv:unload(Charstring fn,Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload function named `fn` into CSV `file` in `model` 



___

> [function]
> csv:unload(Vector of Function fv,Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload functions in `fv` into CSV `file` in `model` 



___

> [function]
> csv:write_file(Charstring file,Bag b)->Boolean

> [function-docs]
> Write bag of vectors `b` into `file` in CSV format 



___

> [function]
> csv:write_file(Charstring file,Stream s)->Boolean

> [function-docs]
> Write Stream of vectors `s` into `file` in CSV format 



___

> [function]
> csv:write_file(Charstring file,Number feedback,Bag b)->Bag of Vector

> [function-docs]
> Write bag of vectors `b` into `file` in CSV format.
>      Return the row every `feedback` rows 



___

> [function]
> csv:write_file(Charstring file,Number feedback,Stream s)->Stream of Vector

> [function-docs]
> Write Stream of vectors `s` into `file` in CSV format.
>       Return saved rows every `feedback` rows 


