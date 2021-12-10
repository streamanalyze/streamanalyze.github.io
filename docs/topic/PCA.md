# PCA functions:

> [function]
> lpcascore(Bag of (Vector of Number,Object),Number d)->(Vector of Number,
         Object label)

> [function-docs]
> Compute the `d` principal components of the data vectors in `b` 



___

> [function]
> pca(Bag of Vector of Number)->(Vector of Number,Matrix)



___

> [function]
> pcascore(Bag of Vector of Number b,Number d)->Vector of Number

> [function-docs]
> Compute the principal components of dimension `d` 
>     for the data vectors in `b` 



___

> [function]
> rank_dimensions(Bag of Vector of Number observations)->(Number,Number)

> [function-docs]
> Rank the dimensions in a set of `observations` by their variances 



___

> [function]
> rank_pca_dim(Vector sorted_pca)->(Number,Number)

> [function-docs]
> Rank the dimensions in a set of sorted PCA vectors by their variances 



___

> [function]
> sortpca(Vector of Number val,Matrix vec)->Vector

> [function-docs]
> Sort the output from `pca()` according to the eigenvalue magnitude 



___

> [function]
> unlabel(Bag of (Vector of Number,Object))->Vector of Number v



___

> [function]
> vref(Vector of (Number,Vector of Number),Number)->(Number,Vector of Number)


