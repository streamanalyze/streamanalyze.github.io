# Detect low voltage by comparing measured Tach vs expected given PWM

This section will go through how you can use the local database to get calculate expected Tachometer readings given a PWM. We can then use this to compare with the measured PWM and Tachometer. If the difference is to high then we might expect the voltage to be too low.

```OSQL
create function tach(Integer pwm) -> Number;


create function get_tach(Integer pwm) -> Number
   as select x
        from Number x, Integer i, Integer diff
       where x = tach(i)
         and diff = abs(pwm - i)
         order by diff asc
         limit 1;
```

> [note] **Note:** Notice how `get_tach` will find the entry in the `tach` function with the closest pwm reading.

We can fill the `tach` function with the following query:

```OSQL
select add_function("tach", [p],[ta])
  from Integer p, Number ta
 where (p,ta) in (
     select distinct pwm, tach
       from Integer pwm, Integer tach, Vector v
      where v in class_stream(2)
        and tach = Number(v[4,1])
        and pwm = round(Number(v[5,1])));
```

## Looking at difference

```LIVE {"vis":"automatic"}
{'sa_plot': 'Scatter plot', 
 'labels':['pwm','tach', 'rati',"class","i"],
 "y_axis": "rati", "color_axis": "class", "size_axis": "off"};         
select vector of [pwm,tach,tach/get_tach(pwm),c,i]
  from Integer i, Number tach, Number pwm,
       Vector of vector v, Integer c
 where v = windowed_stats_1024(i,c)
   and c in([1,2,4])
   and tach = v[4,1]
   and pwm = v[5,1]
```

Now lets predict of the test set and see the result:

## Testing the fit.

The following query will classify each point in a stream of 1024 stats over the whole training set. **Remember** that we are only trying to identify  Low Voltage. That's why we set the label for every other dataset to -1).

```LIVE {"vis":"automatic"}
set :v = (select Vector of [
              v[1], 
              is_low_voltage(pwm,tach),
              tach,
              pwm
            ]
            from Vector v, Number tach, Number pwm
           where v in merge_streams(bag(test_stream(1,1),
                                        test_stream(2,-1),
                                        test_stream(3,-1),
                                        test_stream(4,-1)))
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