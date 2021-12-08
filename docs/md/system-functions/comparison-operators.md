# Comparison operators

The built-in, infix comparison operators are:

```
=(Object x, Object y) -> Boolean   (infix operator x = y)
!=(Object x, Object y) -> Boolean  (infix operator x != y)
>(Object x, Object y) -> Boolean   (infix operator x > y)
>=(Object x,Object y) -> Boolean   (infix operator x >= y)
<(Object x, Object y) -> Boolean   (infix operator x < y)
<=(Object x,Object y) -> Boolean   (infix operator x <= y)
```
Examples:
```
5 < 10;
"Jim" >= "Bill";
```
All objects can be compared. Strings are compared by characters, lists
by elements, OIDs by identifier numbers. Equality between a bag and
another object denotes set membership of that object. The comparison
functions can be [overloaded](../amosql/defining-functions.md#overloaded-functions) for user defined
types.


