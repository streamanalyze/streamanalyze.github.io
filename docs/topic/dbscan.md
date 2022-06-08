# dbscan

> [function]
> cluster_stats(Bag of Vector b,Number beta)->Vector of Number

> [function-docs]
>
> Calculates Precision, recall, `beta` F-measure and Rand-index for the labelled
> and classified data `d`.
> - `d` Bag of vector where each vector contains at least `[label, cluster_id]`
> - `beta` beta for F-measure set to 1 to do F1-measre
> The following table can be used for reference on how true positives(tp),
> false negatives (fn), true negatives (tn) and false positives(fp) is defined:
> 
> |                   | same cluster | different clusters |
> | :---------------- | :----------: | :----------------: |
> | Same class        | TP           | FN                 |
> | Different class   | FP           | TN                 |
> 
> The precision, recall F-measure and rand index is then calculated using
> the following formulas:
> - Precision formula: `tp/(tp+fp)`
> - Recall formula: `tp/(tp+fn)`
> - F-measure formula: `(beta^2 +1)*precision*recall/(beta*precision+recall)`
> - Rand index formula: `(tp+tn)/(tp+fp+tn+fn)`
> 
> returns: a vector of number where each index has the following metric:
> 1. precision
> 2. recall
> 3. Fbeta-measure
> 4. Rand index
> 
> 



___

> [function]
> dbscan:generate(Charstring name)->Object



___

> [function]
> dbscan:save_model(Charstring instance,Charstring model,Charstring file)->Boolean



___

> [function]
> dbscan:save_model(Charstring instance,Charstring model)->Boolean



___

> [function]
> false_negative(Bag of Vector b)->Number

> [function-docs]
> Number of item pairs that are in different cluster and belong to different 
> classes



___

> [function]
> false_positive(Bag of Vector b)->Number

> [function-docs]
> Number of items pairs that are in the same cluster but belong to different
> classes



___

> [function]
> get_dbscan_string(Charstring name)->Charstring

> [function-docs]
> 
> Generate functions for a dbscan instance named `name` This will create 
> dbscan functions prefixed with `<name>_` Look at the topic dbscan after 
> generating a table.
> 



___

> [function]
> true_negative(Bag of Vector b)->Number

> [function-docs]
> Number of item pair that are in different clusters and blong to different 
> classes
> 



___

> [function]
> true_positive(Bag of Vector b)->Number

> [function-docs]
> Number of item pairs that are in the same cluster and belong to the same 
> class 


