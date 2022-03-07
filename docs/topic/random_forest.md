# random_forest functions:

> [function]
> randv(Integer dim,Integer len)->Vector of Integer



___

> [function]
> rf:classify(Bag of Decisiontree rf,Vector of Number v)->Vector

> [function-docs]
> The predicted class belonging of `v` by the random forest `rf`.
>         The resulting integer is the class index with the highest probability.
>         In the case of a tie, the lowest index is given. 



___

> [function]
> rf:decisiontree(Record r)->Decisiontree

> [function-docs]
> Convert a decision tree specified on record format
>         to sa.engine internal representation. 



___

> [function]
> rf:dt_classify(Decisiontree dt,Vector v)->Integer

> [function-docs]
> Use the Decisiontree `dt` to predict class belonging of `v`.
>         The resulting integer is the class index with the highest probability.
>         In the case of a tie, the lowest index is given. 



___

> [function]
> rf:dt_predict(Decisiontree dt,Vector v)->Vector

> [function-docs]
> Use the Decisiontree `dt` to predict class belonging of `v`.
>         The resulting vector is the count of each class. 



___

> [function]
> rf:dt_probability(Decisiontree dt,Vector v)->Vector of Number

> [function-docs]
> Use the Decisiontree `d` to predict class belonging of `v`.
>         The resulting vector `c` is the probability vector
>         where `c[i]` is the probability that that `v` belongs to class `i`. 



___

> [function]
> rf:generate_case_function(Charstring functionname,Charstring forestname,
                         Charstring tree_name)->Function

> [function-docs]
> Generate a case function `functionname` 
>    from the tree `tree_name`
>    in the forest `forestname` 



___

> [function]
> rf:gini_impurity(Bag bo)->Real



___

> [function]
> rf:grow_trees(Bag of (Integer,Vector of Number,Integer),Integer numtrees,
             Integer samples_per_tree,Vector of Integer split_features)
             ->Decisiontree

> [function-docs]
> Convenience function for generating a random forest 



___

> [function]
> rf:import_forest_into(Charstring dir,Charstring forestname)->Boolean

> [function-docs]
> Import a set of tree files in directory `dir` into a Random Forest
>       named `forestname`. The imported trees are then available in the
>       `random_forest(Charstring forestname, Charstring treename)` table. 



___

> [function]
> rf:probabilities(Bag of Decisiontree rf,Vector of Number v)->Vector of Number

> [function-docs]
> The collection of probability vectors of class belongings
>         from all decision trees in `rf` for `v`. 



___

> [function]
> rf:probability(Bag of Decisiontree rf,Vector of Number v)->Vector of Number

> [function-docs]
> The average probability vector of class belongings
>         from all decision trees in `rf` for `v`. 



___

> [function]
> rf:random_forest(Charstring forestname)->Bag of Decisiontree

> [function-docs]
> Helper function to obtain all trees in a forest `forestname` 



___

> [function]
> rf:random_forest_tree(Charstring forestname,Charstring treename)->Decisiontree

> [function-docs]
> The global table containing random forests.
>         Each forest has a name `forestname`
>         Each tree in the forest has a name `treename` 



___

> [function]
> rf:random_subset(Bag of (Integer,Vector of Number,Integer),Integer num)
                ->(Integer id,Vector of Number v,Integer c)

> [function-docs]
> Draw `num` points uniformly random from the bag `dp` 



___

> [function]
> rf:record(Decisiontree dt)->Record

> [function-docs]
> Convert a decision tree to record. 


