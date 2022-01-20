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
