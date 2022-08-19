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
set :b1 = binary('010245FF')
```
```LIVE
:b1[2]
```

You can also convert a vector to a byte array with the function
`binary(Vector of Integer)->Binary`:

```LIVE
set :b2 = binary([0,1,255,48,35])
```
General queries over binary arrays can be specified. For example:
```LIVE
select i, :b1[i] from Integer i
```
```LIVE
select i,:b1[i]+1 from Integer i where i>2 
```

You can update byte arrays with the function `setf(Binary b, Integer
i, Integer v)->Integer`:

```LIVE
setf(:b1, 2, 3)
```

You can use the `in()` function and operator to obtain the elements of
a byte array:

```LIVE
in(:b1);
```

The hexadecimal string representation of byte arrays and integers can
be obtained with the function `hex()`:
```LIVE
hex(:b1);

hex(binary(1234))

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
> bitreverse(Binary b)->Binary

> [function-docs]
> Reverse bit order in binary object `b` 



___

> [function]
> charstring(Binary b)->Charstring

> [function-docs]
> Extract string of bytes from binary object `b` 



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
> hex2integer(Charstring hexnum)->Integer

> [function-docs]
> Convert hexadecimal number `hexnum` to corresponding integer  



___

> [function]
> in(Binary b)->Bag of Integer

> [function-docs]
> The elements of byte array `b` 



___

> [function]
> in(Memory m)->Bag of Integer

> [function-docs]
> The elements of byte array in `m` 



___

> [function]
> integer(Binary b)->Integer

> [function-docs]
> Convert binary object `b` to integer 



___

> [function]
> integer2hex(Integer i)->Charstring

> [function-docs]
> Convert integer `i` to the corresponding hexadecimal number 



___

> [function]
> make_binary(Integer sz)->Binary

> [function-docs]
> Construct a new binary object with 'sz' bytes 



___

> [function]
> new_memory(Integer s)->Memory

> [function-docs]
> Create new Memory object of size `s` 



___

> [function]
> raw_file(Charstring path)->Memory



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
> setf(Memory m,Integer i,Integer v)->Integer

> [function-docs]
> Set byte `i` in byte array in `m` to `v` 



___

> [function]
> size(Memory m)->Integer

> [function-docs]
> The number of bytes in byte array `m` 



___

> [function]
> skip(Binary b,Integer n)->Binary

> [function-docs]
> Skip first `n` elements in binary object `b` 



___

> [function]
> s_bits(Binary b,Integer o,Integer l)->Integer

> [function-docs]
> Get signed bit field of length 'l' at offset 'o' in 'b' 



___

> [function]
> s_bits(Integer u,Integer o,Integer l)->Integer

> [function-docs]
> Get signed bit field of length 'l' at offset 'o' in 'i' 



___

> [function]
> s_bits(Memory m,Integer o,Integer l)->Integer

> [function-docs]
> Get unsigned bit field of length 'l' at offset 'o' in 'm' 



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
> unpack(Binary b,Charstring frm)->Vector of Integer

> [function-docs]
> Unpack binary object `b` based on format `frm`. 
>      I32 -> Read the next 32 bits as a signed integer. 
>      u16 -> Read the next 16 bits as an unsigned integer.
>      Z08 -> Skip the next 8 bits.
>   



___

> [function]
> u_bits(Binary b,Integer o,Integer l)->Integer

> [function-docs]
> Get unsigned bit field of length 'l' at offset 'o' in 'b' 



___

> [function]
> u_bits(Integer u,Integer o,Integer l)->Integer

> [function-docs]
> Get unsigned bit field of length 'l' at offset 'o' in 'i' 



___

> [function]
> u_bits(Memory m,Integer o,Integer l)->Integer

> [function-docs]
> Get unsigned bit field of length 'l' at offset 'o' in 'm' 



___

> [function]
> vref(Binary b,Integer i)->Integer v

> [function-docs]
> Same as `b[i]` to get byte `i` in binary object `b` 



___

> [function]
> vref(Memory m,Integer i)->Integer

> [function-docs]
> Same as `m[i]` 


