# Binary data
The data type **Binary** represents raw binary data as one-dimensional
arrays of unsigned bytes.  Examples of data that can be represented
as byte arrays are raw data from sensors, raster images and compressed
data.

Byte arrays can be constructed with the function `binary(Charstring
hex)->Binary` that converts a hexadecimal string `hex` to a byte array
and accessed using the usual array indexing notation `b[i]`.

For example:
```LIVE
set :b1 = binary('010245FF');

:b1[2];
```

You can also convert a vector to a byte array with the function
`binary(Vector of Integer)->Binary`:

```LIVE
set :b2 = binary([0,1,255,48,35]);
```
General queries over binary arrays can be specified. For example:
```LIVE
select i,:b1[i]+1 from Integer i where i>2;
```

## Functions

> [function]
> binary(Vector of Integer v)->Binary

> [function-docs]
> Convert `v` to byte array 



___

> [function]
> binary(Charstring hex)->Binary

> [function-docs]
> Convert hexadecimal string `hex` to binary object 



___

> [function]
> binary(Integer i)->Binary

> [function-docs]
> Convert integer `i` to binary object 



___

> [function]
> binary2hex(Binary b)->Charstring hex

> [function-docs]
> Obsolete, use hex(b) 



___

> [function]
> bitreverse(Binary b)->Binary

> [function-docs]
> Reverse bit order in binary object `b` 



___

> [function]
> charstring(Binary b)->Charstring

> [function-docs]
> Convert binary object `b` to hexadecimal string 



___

> [function]
> dim(Binary b)->Integer

> [function-docs]
> The number of bytes in binary object 'b' 



___

> [function]
> hex(Binary b)->Charstring

> [function-docs]
> Convert binary object `b` to hexadecimal string 



___

> [function]
> hex2binary(Charstring hex)->Binary

> [function-docs]
> Obsolete 



___

> [function]
> hex2integer(Charstring hex)->Integer

> [function-docs]
> Convert hexadecimal string `hex` to an integer  



___

> [function]
> integer(Binary b)->Integer

> [function-docs]
> Convert binary object `b` to integer 



___

> [function]
> integer2hex(Integer i)->Charstring

> [function-docs]
> Convert integer `i` to hexadecimal string 



___

> [function]
> make_binary(Integer sz)->Binary

> [function-docs]
> Construct a new binary object with 'sz' bytes 



___

> [function]
> section(Binary b,Integer l,Integer u)->Binary

> [function-docs]
> Elements from position `l` to `u` in binary object `b` 



___

> [function]
> setf(Binary b,Integer i,Integer v)->Integer

> [function-docs]
> Set byte `i` in binary object `b` to `v` 



___

> [function]
> skip(Binary b,Integer n)->Binary

> [function-docs]
> Skip first `n` elements in binary object `b` 



___

> [function]
> unpack(Binary b,Charstring frm)->Vector of Integer

> [function-docs]
> Unpack binary object `b` based on format `frm`. 
>      I32 -> Read the next 32 bits as a signed integer. 
>      u16 -> Read the next 16 bits as an unsigned integer.
>      Z08 -> Skip the next 8 bits.
>   



___

> [function]
> unpack(Charstring hex,Charstring frm)->Vector of Integer

> [function-docs]
> Unpack hexadecimal string `hex` based on format `frm`. 
>      `frm` is a string with format specifications `[IiUuZz][0-9][0-9]+`. 
>      Examples:
>       I32 -> Read the next 32 bits as a signed integer. 
>       u16 -> Read the next 16 bits as an unsigned integer.
>       Z08 -> Skip the next 8 bits.
>   



___

> [function]
> vref(Binary b,Integer i)->Integer v

> [function-docs]
> Same as `b[i]` to get byte `i` in binary object `b` 


