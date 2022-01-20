# Vector functions:
Functions over vectors are divided into:

- **Numerical vector functions** operate on numerical vectors.

- **Sequence functions** operate on vectors whose
  elements can be of arbitrary type and need not be numerical.

- **Vector aggregate functions** operate on
  collections (bags) of vectors.


Notice that the [select vector statement](/docs/md/osql/vector-queries.md)
provides a powerful mechanism for constructing new vectors through
queries in terms of functions.

## Numerical vector functions

The following infix *operators* over numeric vectors `v` and `w`,
matrices `a` and `b`, and numbers `lambda` are defined:

| operation     | description                  | implemented as function
|:-------------:|:----------------------------:|-------------------------|
| `v + w`       | element-wise addition        | plus
| `v .+ w`       |     -"-                | plus
| `lambda + w`  | add number to elements       | plus
| `v + lambda`  |         -"-                  | plus
| `v - w`       | element-wise subtractions    | minus
| `v .- w`       |     -"-                 | minus
| `-v`          | negate elements              | uminus
| `v - lambda`  | subtract number from elements| minus
| `lambda - w`  | subtract elements from number| minus
| `v * w`       | scalar product            | times
| `a * b`       | matrix product            | times
| `v * b`       | scalar products            | times
| `a * w`       | scalar products            | times
| `v .* w`      | element-wise multiplications | elemtimes
| `lambda * w`  | multiply elements with number| times
| `v * lambda`  |            -"-               | times
| `v ./ w`      | element-wise division           | elemdiv
| `v / lambda`  | divide elements with number  | div
| `lambda / w`  | divide number with elements  | div
| `v .^ lambda` | element-wise exponent       | elempower

## Examples 

__Vector addition:__

*Add vector elements:*
```LIVE
[1,2,3]+[4,5,6];

[1,2,3].+[4,5,6]
```

*Number and vector addition:*
```LIVE
5+[1,2,3];

[1,2,3]+5
```

*Add nested vector elements:*
```LIVE
[[1],2,3]+[[4],5,6];

[[1],2,3].+[[4],5,6]
```

__Vector subtraction:__

*Subtract vector elements:*
```LIVE
[1,2,3]-[4,5,6];

[1,2,3].-[4,5,6]
```

*Number and vector subtraction:*
```LIVE
5-[1,2,3];

[1,2,3]-5
```

__Vector division:__

*Number and vector division:*
```LIVE
[1,2,3]/2;

3/[1,2,3]
```
*Element division:*
```LIVE
[1,2,3]./[4,5,6]
```

*Nested element division:*
```LIVE
[[1],2,3]./[[4],5,6]
```

__Multiply vector elements:__

*Scalar product:*
```LIVE
[1,2,3]*[4,5,6]
```

*Number and vector multiplication:*
```LIVE
[1,2,3]*5;

5*[1,2,3]
```

*Element multiplication:*
```LIVE
[1,2,3].*[4,5,6]
```

*Nested element multiplication:*
```LIVE
[[1],2,3].*[[4],5,[6]]
```

__Raise each element to a given exponent:__

```LIVE
[1,2,3] .^ 2
```

__Round each element in a vector of numbers to two decimals:__

```LIVE
roundto([3.14159,2.71828],2)
```

__Compute the max value of vector elements:__

```LIVE
max([1,2,3]);

max(["a","b","c"])
```

__Compute the min value of vector elements:__

```LIVE
min([1,2,3]);

min(["a","b","c"])
```

# Transforming vectors

The function `section(v,l,u), ` returns a *splice* of
a vector `v`, e.g.:

```LIVE
section([1,2,3,4,5],2,4)
```
The function `skip(v,n)` returns the part of vector `v` starting at
position `n+1`, e.g.:
```LIVE
skip(["a","b","c"],2)
```

The function `permute(v,indl)` permutes the elements of a vector, e.g.:
```LIVE
permute([1,2,3,4,5],[2,4])
```

# Matricies

The type `Matrix` is an alias for type `Vector of Vector of Number`.

Matrix multiplication is used when the function `times` (operator `*`)
is applied on matrices. The shapes of `a` and `b` must match, e.g.:
```LIVE
[[1,2],[3,4],[5,6]] * [[7,8],[9,10]]
```

The scalar product is computed when the function `times` (operator
`*`) is applied on vectors and on combinations of vectors and
matrices, e.g.two scalar multiplications:
```LIVE
[4,5,6] * [[1,2,3],[6,7,8]]
```
The function `transpose(m)` trasposes the matrix `m`, e.g.:
```LIVE
transpose([[1,2,3],[6,7,8]])
```



# Vector aggregate functions

Dimension-wise aggregates over bags of vectors can be computed using
the function `aggv()`.

*Example:*
```LIVE
   aggv((select [i, i + 10]
           from Integer i
          where i in range(1, 10)), thefunction('mean'))
```

**Notice** that the function `mean()` is overloaded and
  `thefunction()` has to be use to get the generic `mean()` function.

Each dimension in a bag of vector of number can be normalized using one of the normalization functions `meansub()`, `zscore()`, or `maxmin()`:
```
   meansub(Bag of Vector of Number b) -> Bag of Vector of Number
   zscore(Bag of Vector of Number b) -> Bag of Vector of Number
   maxmin(Bag of Vector of Number b) -> Bag of Vector of Number
```

`meansub()` transforms each dimension to a `N(0, s)` distribution
(assuming that the dimension was `N(u, s)` distributed) by subtracting
the mean u of each dimension.

`zscore()` transforms each dimension to a `N(0, 1)` distribution by
also dividing by the standard deviation of each dimension.

`maxmin()` transforms each dimension to be on the `[0, 1]` interval by
applying the transformation `(w - min) ./ (max - min)` to each vector
w in bag b where max and min are computed using `aggv(b, #' max')`
and `aggv(b, #'min')` respectively. 

*Example:*
```LIVE
   meansub((select [i, i/2 + 10]
              from Integer i
             where i in range(1, 5)))
```

## Functions

> [function]
> abs(Vector v)->Vector of Number

> [function-docs]
> The absolute values in vector `v` 



___

> [function]
> aggv(Bag of Vector bv,Function fn)->Vector of Number

> [function-docs]
> Apply aggregate function `fn` on each position of the vectors in `bv` 



___

> [function]
> argmax(Vector v)->Integer i

> [function-docs]
> Indicies of the largest elements in `v` 



___

> [function]
> concat(Vector v,Vector w)->Vector

> [function-docs]
> Concatenate vectors `v` and `w` 



___

> [function]
> dim(Vector v)->Integer

> [function-docs]
> Size of vector `v` 



___

> [function]
> div(Vector v,Number lambda)->Vector of Number

> [function-docs]
> Divide elements in vector `v` with `lambda`, `v / lambda` 



___

> [function]
> div(Number lambda,Vector w)->Vector of Number

> [function-docs]
> Divide `lambda` with each element in vector `w`, `lambda / w` 



___

> [function]
> elemdiv(Vector v,Vector w)->Vector of Number

> [function-docs]
> Divide elements in vector `v` with elements in `w`, `v ./ w` 



___

> [function]
> elempower(Vector v,Number exp)->Vector of Number

> [function-docs]
> Compute `power(e,exp)` for each element `e` in vector `v`, `v .^ exp` 



___

> [function]
> elemtimes(Vector v,Vector w)->Vector of Number

> [function-docs]
> Multiply vectrors `v` and `w` element by element, `v .* w` 



___

> [function]
> euclid(Vector v,Vector w)->Real

> [function-docs]
> Euclidean distance between vectors `v` and `w` 



___

> [function]
> fft(Vector v)->Vector of Complex

> [function-docs]
> Full FFT over a vector 



___

> [function]
> geodist(Vector v,Vector w)->Real

> [function-docs]
> The surface distance in meters between geographic 
>      position vectors `[latitude, longitude]`, `v` and `w` 



___

> [function]
> ifft(Vector v)->Vector of Number

> [function-docs]
> Inverse full FFT 



___

> [function]
> irfft(Vector v)->Vector of Number

> [function-docs]
> IRFFT over vectors of numbers producing vectors on number 



___

> [function]
> manhattan(Vector of Number v,Vector of Number w)->Number

> [function-docs]
> Manhattan distance between vectors `v` and `w` 



___

> [function]
> max(Vector v)->Object

> [function-docs]
> The largest element in vector `v` 



___

> [function]
> maxmin(Bag of Vector of Number b)->Vector of Number

> [function-docs]
> Transform to [0, 1]: Subtract min, divide by (max - min) 



___

> [function]
> maxnorm(Vector of Number v,Vector of Number w)->Real

> [function-docs]
> Maxnorm distance between vectors `v` and `w` 



___

> [function]
> mean(Vector v)->Real

> [function-docs]
> Average of vector of numbers `v` 



___

> [function]
> meansub(Bag of Vector of Number b)->Vector of Number

> [function-docs]
> Transform to N(0, s): Subtract mean(v) 



___

> [function]
> min(Vector v)->Object

> [function-docs]
> The smallest element in vector `v` 



___

> [function]
> minkowski(Vector of Number v,Vector of Number w,Number r)->Real

> [function-docs]
> Minkowski distance of degree `r` between vectors `v` and `w` 



___

> [function]
> minus(Vector v,Vector w)->Vector of Number r

> [function-docs]
> Subtract elements in vectors `v` and `w`, `v .- w` 



___

> [function]
> minus(Vector v,Number lambda)->Vector of Number

> [function-docs]
> Subtract `lambda` from each element in vector `v`, `v - lambda` 



___

> [function]
> minus(Number lambda,Vector w)->Vector of Number

> [function-docs]
> Subtract `lambda` from each element in vector `w`, `lambda - w` 



___

> [function]
> new_vector(Integer dim,Object e)->Vector

> [function-docs]
> Construct vector of size `dim` will all elements being `e` 



___

> [function]
> numvector(Object x)->Vector of Number

> [function-docs]
> Cast `x` to vector of numbers 



___

> [function]
> ones(Number dim)->Vector of Integer

> [function-docs]
> Construct vector of `dim` 1:s 



___

> [function]
> permute(Vector v,Vector of Number indl)->Vector

> [function-docs]
> Reorder vector `v` on index positions in `indl` 



___

> [function]
> plus(Vector v,Vector w)->Vector of Number r

> [function-docs]
> Add elements in vectors `v` and `w`, `v .+ w` 



___

> [function]
> plus(Vector v,Number lambda)->Vector of Number

> [function-docs]
> Add `lambda` to each element in vector `v`, `v + lambda` 



___

> [function]
> plus(Number lambda,Vector w)->Vector of Number

> [function-docs]
> Add `lambda` to each element in vector `w`, `lambda + w` 



___

> [function]
> rfft(Vector v)->Vector of Number

> [function-docs]
> RFFT over vectors of numbers 



___

> [function]
> section(Vector v,Number l,Number u)->Vector r

> [function-docs]
> The subvector of vector `v` starting at position `p` and ending at `u` 



___

> [function]
> skip(Vector v,Number n)->Vector

> [function-docs]
> Skip first `n` elements in vector `v` 



___

> [function]
> stdev(Vector v)->Real

> [function-docs]
> Standard deviation of vector of numbers `v` 



___

> [function]
> sum(Vector v)->Number

> [function-docs]
> The sum of the numbers in vector `v` 



___

> [function]
> times(Vector v,Vector w)->Number

> [function-docs]
> Scalar product of vectors `v` and `w`, `v * W` 



___

> [function]
> times(Number lambda,Vector w)->Vector of Number

> [function-docs]
> Multiply `lambda` with elements in `w`, `lambda * w` 



___

> [function]
> times(Vector v,Number lambda)->Vector of Number

> [function-docs]
> Multiply elements in vector `v` with `lambda`, `v * lambda` 



___

> [function]
> times(Vector of Number v,Matrix m)->Vector of Number

> [function-docs]
> Vector-matrix multiplication, `v * m` 



___

> [function]
> times(Matrix a,Matrix b)->Matrix

> [function-docs]
> Matrix multiplication, `a * b` 



___

> [function]
> times(Matrix m,Vector of Number w)->Vector of Number

> [function-docs]
> Matrix-vector multiplication, `m * v` 



___

> [function]
> transpose(Matrix m)->Matrix

> [function-docs]
> Transpose matrix `m` 



___

> [function]
> uminus(Vector v)->Vector of Number

> [function-docs]
> Negate numbers in vector `v`, `-v` 



___

> [function]
> vdiff(Vector v,Vector w)->Vector

> [function-docs]
> Elements in vector `v` that are not in vector `w` 



___

> [function]
> vectorize(Bag b)->Vector v



___

> [function]
> vmean(Bag of Vector of Number bv)->Vector of Number

> [function-docs]
> Mean vector for a given bag of vectors `bv` 



___

> [function]
> zeros(Number dim)->Vector of Integer

> [function-docs]
> Construct vector of `dim` 0:s 



___

> [function]
> zscore(Bag of Vector of Number b)->Bag of Vector of Number

> [function-docs]
> Transform elements in the vectors in `b` into normal distributions
>      centered around zero 


