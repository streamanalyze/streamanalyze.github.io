# Set and bag functions:

> [function]
> bequal(Bag x,Bag y)->Boolean

> [function-docs]
> Do bags `x` and `y` contain the same elements? 



___

> [function]
> concatagg(Bag b)->Charstring

> [function-docs]
> Concatenate stringified elements in bag `b` 



___

> [function]
> exclusive(Bag b)->Bag

> [function-docs]
> Return the singleton objects in bag `b` 



___

> [function]
> first(Bag b)->Object

> [function-docs]
> Pick the first element in bag `b` (no order guarantees) 



___

> [function]
> first_n(Bag b,Number n)->Object

> [function-docs]
> Get the `n` first element in bag `b` (no order guarantees) 



___

> [function]
> inject(Bag b,Object o)->Bag

> [function-docs]
> Inject 'o' between elements in bag 'b' 



___

> [function]
> iota(Number l,Number u)->Bag of Integer r

> [function-docs]
> Same as `range(l,u)` 



___

> [function]
> last(Bag b)->Object

> [function-docs]
> Pick the last element in bag `b` (no order guarantees) 



___

> [function]
> natural_numbers()->Bag of Integer i

> [function-docs]
> The infinite set of all natural numbers `i` 



___

> [function]
> range(Number u)->Bag of Integer

> [function-docs]
> Construct bag of integers between `0` and `u` 



___

> [function]
> range(Number l,Number u)->Bag of Integer

> [function-docs]
> Construct bag of integers between `l` and `u` 



___

> [function]
> remove_null(Bag b)->Bag

> [function-docs]
> Remove all null values in bag `b` 



___

> [function]
> rowprops(Vector props,Vector vals)->Bag of (Object,Object)

> [function-docs]
> Generate bag of pairs from elements in vectors `props` and `vals` 



___

> [function]
> sample(Bag b,Integer s)->Bag

> [function-docs]
> Sample `s` elements from bag `b` 



___

> [function]
> section(Bag b,Number start,Number stop)->Bag

> [function-docs]
> Sub-bag from position `start` to `stop` in bag `b` (no order guarantees) 



___

> [function]
> tuples(Bag b)->Bag of Vector

> [function-docs]
> The tuples in bag `b` as vectors 



___

> [function]
> union(Bag x,Bag y)->Object

> [function-docs]
> The union of bags `x` and `y` 



___

> [function]
> unique(Bag b)->Bag

> [function-docs]
> Remove duplicates in bag `b` 


