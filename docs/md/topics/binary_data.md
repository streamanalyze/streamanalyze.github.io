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
