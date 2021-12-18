# Use DBSCAN to cluster dataset

This section will quickly outline how to use DBSCAN on the Tachometer and PWM in the dataset. For more details on how DBSCAN works checkout [the documentation for DBSCAN](/docs/systemmd/dbscan/docs)

```OSQL
// Create DBSCAN instance

load_system_model("dbscan");

dbscan:generate("tach_pwm");
```

```OSQL
// Add Tach and PWM (4,5) to DBSCAN model for all data
// EXCEPT low voltage (which is the outlier we want to
// Identify)
tach_pwm:dbscan_add_data(select [v[4,1],v[5,1]]
                          from Vector v, Integer i, Integer c
                         where v = windowed_stats_1024(i,c)
                           and c != 1);
```

If you recall the Tachometer vs PWM graph:

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/scatter_matrix_pwm_tach.png)

The Low Voltage class was separate from all other classes. That is why we add the `c != 1`. We want to fit the DBSCAN model on the data that is not Low Voltage. That way can use a failure to classify a point as an indication of Low Voltage.

## Fitting the model

One of the hyper parameters of DBSCAN is the min distance between points. To figure out a good min distance one has to do some explorations. One way to get an indication of a good distance is to measure the distance to the closest neighbor for every datapoint:

```LIVE {"vis":"automatic"}
{'sa_plot': 'Line plot', 'batch':1, 'labels':['Label 1'], 'memory':200};
select d
  from number a, number d
 where a in range(count(extent(#"tach_pwm:datapoints")))
   and d = mean(select dist
                  from number dist, number b
                 where a != b
                   and dist = euclid(tach_pwm:datapoints(a),
                                     tach_pwm:datapoints(b)) 
                 order by dist asc limit 3)
```

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/min_dist.png)

Except for some outliers we have a consistent min distance below 30, let's start with that as hyper parameter to DBCSAN. Min points is set to 3.

```OSQL
//Fit the model
tach_pwm:dbscan(30,3)
```

Look at the clusters:

```LIVE {"vis":"automatic"}
{"sa_plot":"Scatter plot",
 "color_axis":"cluster",
 "size_axis": "none",
 "labels": ["cos(x)", "sin(x)","cluster"]};
select Vector of [v[1],v[2],cid]
  from Number cid, Number pid, Vector v
 where pid in tach_pwm:clustered_points(cid)
   and v = tach_pwm:datapoints(pid);
```

## Testing the fit.

The following query will classify each point in a stream of 1024 stats over the whole training set. **Remember** that we are only trying to identify  Low Voltage as an outlier. That's why we set the label for every other set to 1 (since we only had one cluster in the DBSCAN model).

```LIVE {"vis":"automatic"}
set :v = (select Vector of [
              v[1], 
              tach_pwm:dbscan_classify([tach,pwm],30,1),
              tach,
              pwm
            ]
            from Vector v, Number tach, Number pwm
           where v in merge_streams(bag(test_stream(1,-1),
                                        test_stream(2,1),
                                        test_stream(3,1),
                                        test_stream(4,1)
                                        ))
             and tach = v[2,4,1]
             and pwm = v[2,5,1]);
```

Then we can use `cluster_stats` which takes a bag of vector where each vector contains `[actual, predicted]` and calculates Precision, Recall, F-measure, Rand-index:

```LIVE
pp(label_vector(["Precision","Recall","F-measure","Rand-index"],
             cluster_stats(in(:v),1)));
```

If you use the same training values as defined here you will see that you get a precision around 0.76 which is not terrible, but not very good either. Let's take a look at the predictions in a scatter plot.

```LIVE {"vis":"automatic"}
{
  'sa_plot': 'Scatter plot', 
  'labels':['label','predict',"tach","pwm"],
  'x_axis': 'tach', 'y_axis': 'pwm', 'color_axis': 'predict',
  'size_axis': 'off'
};
:v
```

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/dbscan_res.png)

With some further investigation it was found that the Tachometer was much higher in the test set for class 4 (obstructed) than the rest. That is what you see with the two separate groupings to the right in the graph above.

```OSQL
dbscan:save_model("tach_pwm", "statisitical_analysis","tach_pwm");
```