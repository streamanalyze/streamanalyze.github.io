# Aggregate functions:
Aggregate functions compute a single result from the elements in a
bag.

Basic aggregate functions have one of their arguments declared as a bag
and return a single result:

```
    aggfn(Bag of Type1 x) -> Type2
```

Aggregate functions with a single argument can be used in group by queries.

## Functions

> [function]
> aggregate(Bag b,Object e0,Function f)->Object

> [function-docs]
> The aggregated value of bag `b` by function `f` with start value `e0` 



___

> [function]
> aggregate(Stream s,Object e0,Function f)->Stream

> [function-docs]
> Stream of values aggregated over stream `s` by function `f` with 
>      start value `e0` 



___

> [function]
> aggregate(Stream s,Object e0,Charstring fn)->Stream

> [function-docs]
> Stream of values aggregated over stream `s` by function named `fn` 
>      with start value `e0` 



___

> [function]
> aggregate(Vector v,Object e0,Function f)->Object

> [function-docs]
> The aggregated value of vector `v` by function `f` with start value `e0` 



___

> [function]
> aggregate(Vector v,Object e0,Charstring fn)->Object

> [function-docs]
> The aggregated value of vector `v` by function named `fn` 
>      with start value `e0` 



___

> [function]
> aggregate(Bag b,Object e0,Charstring fn)->Object

> [function-docs]
> The aggregated value of bag `b` by function named `fn` 
>      with start value `e0` 



___

> [function]
> aggv(Bag of Vector bv,Function fn)->Vector of Number

> [function-docs]
> Apply aggregate function `fn` on each position of the vectors in `bv` 



___

> [function]
> concatagg(Bag b)->Charstring

> [function-docs]
> Concatenate stringified elements in bag `b` 



___

> [function]
> count(Bag b)->Integer

> [function-docs]
> The number of elements in bag `b` 



___

> [function]
> histogram(Bag of Number b,Vector limits)->Vector of Integer

> [function-docs]
> Calculate a histogram over a bag `b`, with `limits` vector.
>   `limits` is a vector with `[min,max,number of bins]` 
>   the range for the histograms is always $ [min,max) $ 



___

> [function]
> histogram(Bag of Number b,Number min,Number max,Number bins)->Vector of Integer

> [function-docs]
> Calculate a histogram over a bag `b`, with `min`, `max`, and `bins`
>   the range for the histogram is always $ [min,max) $ 



___

> [function]
> histogram(Bag of Vector b,Vector of Vector limits)->Vector of Integer

> [function-docs]
> Calculate a histogram over a bag of vector `b`, with `limits` vector.
>   Limits must be a vector of the same dimension as each vector in `b` and:
>   
>   $$
>   limits_i = [min_i,max_i, bins_i]`
>   $$
> 
>   the range for the histograms is always $ [min,max) $ 



___

> [function]
> inject(Bag b,Object o)->Bag

> [function-docs]
> Inject 'o' between elements in bag 'b' 



___

> [function]
> max(Bag b)->Object

> [function-docs]
> Return the largest element in bag `b` 



___

> [function]
> mean(Bag b)->Real a

> [function-docs]
> Average of numbers in bag `b` 



___

> [function]
> median(Vector v)->Number

> [function-docs]
> The median of numbers in `v` 



___

> [function]
> median(Bag of Number b)->Number

> [function-docs]
> The median of numbers in `b` 



___

> [function]
> min(Bag b)->Object

> [function-docs]
> Return the smallest element in bag `b` 



___

> [function]
> notany(Bag b)->Boolean

> [function-docs]
> Is bag `b` empty? 



___

> [function]
> some(Bag b)->Boolean

> [function-docs]
> Is there any element in bag `b`? 



___

> [function]
> stdev(Bag b)->Real s

> [function-docs]
> Standard deviation of numbers in bag `b` 



___

> [function]
> sum(Bag b)->Number

> [function-docs]
> The sum of the numbers in bag `b` 



___

> [function]
> vectorize(Bag b)->Vector v


