# KNN
**TODO: Introduction remains to be written!**
> [function]
> classdistances(Vector of Number x,Function disfn,Bag of (Object,
              Vector of Number))->Bag of (Number,Object)

> [function-docs]
> Given a distance function `disfn(x,y)`
>     calculate all distances from point x to the points
>     in set of points `cp` 



___

> [function]
> distance(Vector of Number x,Function disfn,Vector of Number y)->Number

> [function-docs]
> Compute the distance between `x` and `y` 
>      using the distance function `disfn(x,y)` 



___

> [function]
> knn(Vector of Number,Integer k,Function fn)->Bag



___

> [function]
> k_nearest(Vector of Number x,Integer k,Function disfn,Bag of (Object,
         Vector of Number))->Bag of (Object,Object)

> [function-docs]
> Find `k` nearest neighbours of point `x` 
>      among points in `cp` using distance function `disfn`. 



___

> [function]
> k_nearest_with_fn(Vector of Number x,Integer k,Function disfn,Function fn)
                 ->Bag of (Object,Object)


