# *k*-means clustering

This model implements [*k*-means
clustering](https://en.wikipedia.org/wiki/K-means_clustering)

The first step is to generate a new instance of *k*-means for your
analysis.  This is done with the function `kmeans:generate(Charstring
name)`:

```LIVE
kmeans:generate('my_test');
```

The command will generate a number of *k*-means functions with the prefix
`kmeans_my_test:`. Indexed stored functions are generated to allow fast
training and inference on the model, along with functions for
populating the model with training data, training the model, and
inferring feature vectors.

To illustrate *k*-means we will generate random training data points in
two squares shapes using the following function:

```LIVE
create function gen_datapoint(Number rad, Number noise, Number i) 
                                   -> Vector of Number
  as [mod(i,2)*rad+frand(noise), rad * mod(i,2)+frand(noise)];
```

Try generating a vector of 1000 random data points with:

```LIVE {"vis":"showScatterPlot"}
select Vector of gen_datapoint(1, 1, range(1000));
```

The training set of data points is stored in the function
`kmeans_my_test:datapoints`.  It is populated with the function
`kmeans_my_test:add_data`. Lets populate it with two random circular
shapes:

```LIVE
kmeans_my_test:add_data(select Stream of gen_datapoint(1,0.2,range(1000)));
```

Now that we have populated our dataset with random points we can start
by visualizing them as a scatter plot:

```LIVE {"vis":"automatic"}
{"sa_plot":"Scatter plot", "labels": ["x", "y"]};
select Vector of kmeans_my_test:datapoints(n) from Number n;
```

Now that we have populated our training dataset with random 2D points
we move on to training the *k*-means model by calling the function
`kmeans_my_test:fit(Number max_iter, Number num_clusters)`. `max_iter` is the maximum
number of iterations when training, `num_cluster` the number of clusters to create. 
For more details on these parameter setting please read
[*k*-means](https://en.wikipedia.org/wiki/K-means_clustering)

*Example:*

```LIVE
kmeans_my_test:fit(10000,2);
```

The *k*-means model is now trained, so let's have a look at the
result. To visualize the clusters we use scatter plot where each point
is colored by its cluster. Two additional values in the input vectors 
to scatter plot specify the sizes and colors of the points, i.e. 
each vector can have the format
`[x,y,size,color]`. The color is specified as an integer in the
inteval *[-1,255]*.

*Example:*

```LIVE {"vis":"automatic"}
{"sa_plot": "Scatter plot", "size_axis": "none","color_axis":3};
select vector of v 
  from Vector v, Number cid, Vector of number row
  where row in (select stream of kmeans_my_test:datapoints(i) from Number i) 
   and cid = kmeans_my_test:classify(row)
   and v = concat(row,[cid]);
```

We can see the three differnet clusters here, each with a distinct color. Let's use this model to classify a stream of 2D datapoints. 
This is done using the function `kmeans_my_test:classify(Vector of Number feature Vector point) -> Number` Which return the closest
cluster for point `point`.

```LIVE {"vis":"automatic"}
{"sa_plot": "Scatter plot", "size_axis": "none","color_axis":3};
select vector of v 
  from Vector v, Number cid, Vector of number row
  where row in gen_datapoint(1,0.5,siota(1,10000))
   and cid = kmeans_my_test:classify(row)
   and v = concat(row,[cid]);
```

#Save the trained *k*-means model

You can create a user model of the kmeans instance `my_test` by callin the function 
`kmeans:save_model(charstring instance, Charstring model)`:

```LIVE
kmeans:save_model("my_test", "my_trained_kmeans_model");
```

The model `my_trained_kmeans_model` is now a regular model that can be found in the OSQL-editor and
deployed as any other regular user defined model.
