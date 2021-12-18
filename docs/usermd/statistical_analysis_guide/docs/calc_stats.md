# Computing the statistics over the data set

![Bar plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/barplot_matrix.png)

> [note] **Note:** This sections contains a lot of details, but if you read it through you will learn how to create the dataset for visualizing the above bar plot histogram comparison. You will also get a feeling for how you can create your own custom aggregator functions over streams, vectors and bags which is very useful when modeling data.

## Creating helper functions

In the file `helper_functions.osql` you can find a set of helper functions.

> [tip]**Tip:** Since SA Engine allows you to define your own functions it is always a good idea to create a helper function once you realize that you are writing the same parameterized query over and over.

### Statistics vector

The function `vstats` simply converts the tuple `(mean,stdev,min,max,cnt)` from `stats` into a vector.

```OSQL
create function vstats(Bag b) -> Vector 
  as select [mean,stdev,min,max,cnt]
       from Real mean, Real stdev, Real min, Real max, Integer cnt
      where (mean,stdev,min,max,cnt) = stats(b);
```

### Get statistics for a class

The function `get_stats` takes a class $ C_i $and returns a vector where the first element is the class $ C_i $for the stats and the second element is a vector of vector $ stats $ where the $ stats_k = [mean_k, stdev_k, min_k, max_k, cnt_k] $ for dimension $ k $.

```OSQL
create function get_stats(Number class) -> Vector
/* Get mean stdev min max and count for class `class` */     
  as [class, aggv(extract(class_stream(class)),
                  #"vstats")];
```

### Get windowed statistics

The function `get_windowed_stats` takes a class $ C_i $ and creates windows $ W_i $ where i is the order of the window and the size of the window is the second argument  $ w_size $ and returns a vector where the first element is $ C_i $.  and the second element i a vector of vector where each inner vector  $ V_i $ is the statistics for $ W_i $.

```OSQL
create function get_windowed_stats(Number class, Number window_size, boolean train) -> Vector
/* Get mean stdev min max and count for class `class` */     
  as select [class, (
            select vector of aggv(in(v),#"vstats")
              from vector of Vector v
             where v in winagg(class_stream(class,train), window_size, window_size))]; 
```

### Add windows stats to stored function

The function `add_windowed_1024_stats` takes the result from a call to `get_windows_stats` and fills the stored function `windowd_stats_1024` with the data.

```OSQL
create function add_windowed_1024_stats(Vector input) -> number
  as { declare Integer i, Number class, Vector of Vector of Vector of Number data;
    set i = 0;
    set class = input[1];
    set data = input[2];
    for each Vector of Vector of Number v where v in data {
        set windowed_stats_1024(i,class) = v;
        set i = i+1;
    };
    return i;
}; 
```

### Creating histograms

> [note] **Note:** as of  version 4.4 there is a built in function `histogram` which is highly optimized for these types of applications. View the following example implementation of `histogram_stream` as an example of what you can do with higher order functions such as `aggregate`.

Below you can find the OSQL code for creating histograms for a `Stream of Number`. The function `histogram_stream` uses the second order function `aggregate`:

```OSQL
> signature(apropos("aggregate"));
"aggregate(Bag b,Object e0,Function f)->Object"
"aggregate(Stream s,Object e0,Function f)->Stream"
"aggregate(Stream s,Object e0,Charstring fn)->Stream"
"aggregate(Vector v,Object e0,Function f)->Object"
"aggregate(Vector v,Object e0,Charstring fn)->Object"
"aggregate(Bag b,Object e0,Charstring fn)->Object"
```

Aggregate takes a collection of values  (`Vector`, `Bar`, or `Stream`) $ V $ an initial value $ V_0 $ and a function $ fn $ and calculates:

$$
V_i = fn(V_{i-1} , V_i)
$$

If $ V $ is a bag or vector then the final $ v_i $ is returned. If $ V $ is a stream then each $ v_i $ is emitted.

The function `histogram_stream` uses `bin_vector`  to create a so called "one-hot" vector of size $ sz $ where all elements are 0 except for the element $ i $ where $ i $ is the index in the histogram measurement $ x $ would have in a histogram with min $ lo $, max $ hi $ and number of bins $ bins $. And then aggregates these vectors with a starting vector of zeros and the function `+`.

```OSQL
create function bin_vector(Real x, Real lo, Real hi, Integer bins) -> Vector of Number
/* Create a one hot vector where the bin for x in the histogram is 1. All other indices 
are zero. */
  as select one_hot(bins,i)
       from Integer i
      where i = bins*(x-lo)/(hi - lo)+1;
      
      
create function histogram_stream(Stream of Number s, Number lo, Number hi, Number bins)
                      -> Stream of Vector of Integer
  /* Running count of elements in `s` being in intervals in `b` */
  as aggregate(bin_vector(s, lo,hi,bins), zeros(bins), '+');
```

### Calculate histogram for a class and dimension

The function `calc_histogram` takes a class, the dimension index, minimum and maximum values of the dimension and the number of bins you wish to split the histogram up in and returns a vector where the first element is the class, the second element the index of the dimension and the third is the histogram for the dimension in that class:

```OSQL
create function calc_histogram(Number class, Number min, Number max, Number bins) -> Vector
  as [class, histogram(extract(class_stream(class)), min,max,bins)];
```

If you recall the function `get_stats` it returns a vector where the first element is the class $ C_i $for the stats and the second element is a vector of vector $ stats $ where the $ stats_k = [mean_k, stdev_k, min_k, max_k, cnt_k] $ for dimension $ k $.

## Using a federation to parallelize the computation

Since we are working with quite a large data set we can speed up the computations by utilizing parallelism.
If you are running this in SA Studio Desktop be sure to go over to <a href="#/device_hub/">Device hub</a> and start a local federation before continuing.

If you are using SA Engine from the command line terminal you can start by issuing the following command

```OSQL
start_nameserver("");
```

### Starting a set of peers for parallel processing

Now that we have a federation up and running we can start 4 servers to utilize for parallel processing.
This is done using the `start_engine` function:

```LIVE
/* Start 4 servers to allow for some parallel processing */
start_engine("s"+iota(1,4),"");
```

The above command will start 20 SAS (SA Engine Servers) connected to the federation. Once they are started we want to load this model on each one:

```LIVE
/* Make sure all new servers have loaded the model */
ship("s"+iota(1,4),'load_model("statisitical_analysis")');
```

## Multicast receive

Multicast_receive takes a vector of peers $ P $ a function $ fn $ and a vector of arguments $ args $ and for each peer $ P_i $ collect the results of calling $ fn $ with arguments $ args_i $. For instance in the call below results in the following table:

| Peer | Function | Arguments |
| -------- | -------- | -------- |
| s1     | get_stats     | `[1]`     |
| s2     | get_stats     | `[2]`     |
| s3     | get_stats     | `[3]`     |
| s4    | get_stats     | `[4]`     |

If you recall the function `get_stats` it returns a vector where the first element is the class $ C_i $for the stats and the second element is a vector of vector $ stats $ where the $ stats_k = [mean_k, stdev_k, min_k, max_k, cnt_k] $ for dimension $ k $.

The query below will split the workload of calculating the stats for each class on a separate server and then add the result to
the stored function `stored_stats`.

```LIVE
select setfunction("stored_stats", [class,i],[data[i]])
  from Vector v, Number class, Number i, Vector data
 where v in multicastreceive(vectorof("s"+iota(1,4)),'get_stats',(
                select vector of [class,true]
                  from Number class
                 where class in iota(1,4)))
   and class = v[1]
   and data = v[2];

select class_name(class),label(i),stored_stats(class,i) 
  from Number class, Number i
 order by class, i asc;
```

The same method is used for calculating histograms. This time we use all of our 20 servers to let them calculate the histogram from one of the dimensions on one of the datasets.

```LIVE
select setfunction("stored_histogram", [class,i],[data[i]])
  from Vector v, Number class, Number i, Vector data
 where v in multicastreceive(vectorof("s"+iota(1,4)),
                             'calc_histogram',vectorof(.[range(4)]))
   and class = v[1]
   and data = v[2];;
```

Finally we fill our stored stats functions in the same way as before, using multicast to parallelize the computation and then updating the local database with the result.

```LIVE
select add_windowed_1024_stats(v)
  from vector v
 where v in multicastreceive(vectorof("s"+range(4)),
                                      'get_windowed_stats',(
             select vector of [class,1024,true]
               from Number class
              where class in range(4)));
```

If you wish to unload the data of your stored functions into a JSON file:

```OSQL
json:unload([#"histogram",#"windowed_stats_1024",#"stored_stats"],"statisitical_analysis","data2.json");
```