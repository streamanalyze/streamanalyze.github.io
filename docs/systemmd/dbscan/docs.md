# Density-based spatial clustering of applications with noise (DBSCAN)

This model implements [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN)

The first step is to generate a new instance of DBSCAN for your
analysis.  This is done with the function `dbscan:generate(Charstring
name)`:

```LIVE
dbscan:generate('my_test');
```

The command will generate a number of DBSCAN functions with the prefix
`my_test:`. Indexed stored functions are generated to allow fast
training and inference on the model, along with functions for
populating the model with training data, training the model, and
inferring feature vectors.

To illustrate DBSCAN we will generate random training data points in
circular shapes using the following function:

```LIVE
create function gen_datapoint(Number rad, Number noise, Number i) 
                                   -> Vector of Number
  as [rad * sin(i*2*pi()/100)+frand(noise)-noise/2, 
      rad * cos(i*2*pi()/100)+frand(noise)-noise/2];
```

Try generating a vector of 100 random data points with:

```LIVE
select Vector of gen_datapoint(1, 0.2, range(100));
```

Here we notice that the automatic scaling make the shape oval rather
than circular. This can be fixed by changing the visualization to
**Multi plot** and prefixing it with a **visual formatting**.

*Example:*

```LIVE
{"sa_plot":"Scatter plot"};
select Vector of gen_datapoint(1, 0.2, range(100));
```

See [Visualization](/docs/md/vis/README.md) for further
details.

The training set of data points is stored in the function
`my_test:datapoints`.  It is populated with the function
`my_test:dbscan_add_data`. Lets populate it with two random circular
shapes:

```LIVE
my_test:dbscan_add_data(select Stream of gen_datapoint(1,0.2,range(1000)));
my_test:dbscan_add_data(select Stream of gen_datapoint(0.5,0.2,range(500)));
```

Now that we have populated our dataset with random points we can start
by visualizing them as a scatter plot:

```LIVE {"vis":"automatic"}
{"sa_plot":"Scatter plot", "labels": ["cos(x)", "sin(x)"]};
select Vector of my_test:datapoints(n) from Number n;
```

Now that we have populated our training dataset with random 2D points
we move on to training the DBSCAN model by calling the function
`my_test:dbscan(Number eps, Number minPts)`. `eps` is the maximum
distance between points for being classified as neighbors, `minPts` is
the minimum number of neighbor points to be classified as a
cluster. For more details on these parameter setting please read
[DBSCAN](https://en.wikipedia.org/wiki/DBSCAN)

*Example:*

```LIVE
my_test:dbscan(0.1,3);
```

The DBSCAN model is now trained, so let's have a look at the
result. To visualize the clusters we use scatter plot where each point
is colored by its cluster. The points for each cluster id are stored
in the function `my_test:clustered_points(Number cluster_id)`. Two
additional values in the input vectors to scatter plot specify the
sizes and colors of the points, i.e. each vector can have the format
`[x,y,size,color]`. The color is specified as an integer in the
inteval *[-1,255]*.

*Example:*

```LIVE
{"sa_plot":"Scatter plot",
 "color_axis":"cluster",
 "size_axis": "none",
 "labels": ["cos(x)", "sin(x)","cluster"]};
select Vector of [v[1],v[2],cid]
  from Number cid, Number pid, Vector v
 where pid in my_test:clustered_points(cid)
   and v = my_test:datapoints(pid);
```

We can see two clusters here, the inner and the outer circle. Let's
use this model to classify a stream of 2D data points. This is done by
using the function `my_test:dbscan_classify(Vector feature_vector,
Number eps, Number minpts) -> Number`, which returns -1 if the point
is an outlier and the cluster id if it belongs to a cluster.

We generate a random data set by calling:

```LIVE
{"sa_plot":"Scatter plot"}; 
select vector of gen_datapoint(bag(0.5,1),0.3,iota(1,200))
```

This generates 400 datapoints, having the radii 0.5 and 1. The noise
is 0.3.

*Siimulated classification:*

```LIVE
{"sa_plot":"Scatter plot",
 "color_axis":"cluster", 
 "size_axis": "none",
 "labels": ["cos(x)", "sin(x)", "cluster"]};
select Vector of [v[1], v[2],label]
  from Vector v, Number label
 where v in gen_datapoint(bag(0.5,1),0.3,iota(1,200))
   and label = my_test:dbscan_classify(v, 0.1, 3);
```

# Save the trained DBSCAN model

Save the dbscan instance `my_test` to a model by callin the function 
`dbscan:save_model(charstring instance, Charstring model, Charstring file)`:

```LIVE
dbscan:save_model("my_test", "my_trained_dbscan_model");
```

> **Note:** If you look into the generated files for the model `my_trained_dbscan_model` a file named
> `master-weights.json` which contains all the DBSCAN data for tour DBSCAN instance.

If you do not want to save the DBSCAN instance in the file `master-weights.json` then you can use the function
`dbscan:save_model(charstring instance, Charstring model, Charstring file)` which will save it in 
the file `file` under model `model` instead.