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
