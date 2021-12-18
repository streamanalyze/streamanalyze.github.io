# Making sense of the data.

Finally it is time to create some awesome looking graphs to make sense of this data we are working with.

## Scatter Parallel Coordinates plots

When I work with new datasets I usually go with two methods. The first one is as we saw earlier, visualizing the raw data as a time series plot. This allows me to identify patterns over time, but it might not be obvious how different datasets differ when there are a lot of dimensions. Thus my next step is to  plot the datasets as [Parallel Coordinates](https://en.wikipedia.org/wiki/Parallel_coordinates) and Scatter Plots.

Take a look at the result of the query below:

```LIVE {"vis":"automatic"}
/* Look at the data from two views. Using Parallell coordinates and scatter plots. */
multiplot:generate_scatter_pcoords_grid(vlabels(),
            ["i","idx","class","mean","stdev","min","max","cnt"],
            ["i","stdev"],"class",200);
select stream of concat([i,idx,c],windowed_stats_1024(i,c)[idx])
  from Integer i, Integer c, Integer idx
 where idx in range(5);
```

> [note] **Note:** This query is better viewed from the OSQL editor since it takes two columns. If you want a view as the screen shot below copy the query and paste it into the OSQL editor instead.

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/pcoords_scatter.png)

[Parallel Coordinates](https://en.wikipedia.org/wiki/Parallel_coordinates)  is a great tool for understanding high-dimensional data and the inter-dimensional correlation in the dataset. Each line in the parallel coordinates is on point in hyper-space where the points value in dimension N is where the line crosses dimension N. In this case the color of each line indicates what class the data point belongs to.

```LIVE
/* Compare histograms per xis and class */
multiplot:barplot_matric(4,5, ["Low Voltage","Normal","Object","Obstructed"],["x","y","z","tach","pwm"],150);
select vector of x
  from Vector x, Integer axis
 where axis in range(5)
  and x = (select vector of h
  from Vector h, Integer i
 where h = stored_histogram(i,axis)
 order by i)
```

### Conclusions so far.

So far when looking at the data we can conclude that the fan was probably rotated between recordings meaning that we would have to remove the rotations of the gravitational acceleration vector before using its absolute values for detecting different classes. However we can using the standard deviation easily detect if there is an object stuck in the fan (which makes sense logically as well).

This means that we now have three other classes left to separate using the Tachometer and PWM. Let's see what we can dig out.

## Scatter Plot Matrices.

Let's start by looking only at the standard deviation of the accelerometer dimensions in a scatter plot matrix.

Recall that `windowed_stats_1024` is a vector of vector where the outer dimension is the dimension `accx,accy,accz,tachometer,pwm` and the inner is the vector `[mean,stdev,min,max,cnt]` for each window.

The Query below will thus plot the standard deviation of x,y, and, z against each other in a scatter plot matrix:

```LIVE {"vis":"automatic"}
/* Create a scatter grid of the standard deviation of all axes */
multiplot:scatter_matrix([1,2,3],
                         ["x","y","z","tach","pwm","i","class"],
                         "class","off",150,0.5);
select vector of [x,y,z,tach,pwm,i,c]
  from Integer i, Number x, Number y,
       Number z, Number tach, Number pwm,
       Vector of vector v, Integer c
 where v = windowed_stats_1024(i,c)
   and x = v[1,2]
   and y = v[2,2]
   and z = v[3,2]
   and tach = v[4,2]
   and pwm = v[5,2];
```

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/scatter_matrix_acc.png)

> [note] **Note:** You can zoom in a scatter plot by clicking and dragging the mouse over a region you want to zoom into.  Double click the plot to zoom out. Try zooming in the from 0-500 on the z axis and 0-1000 on the x axis to get the image below

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/scatter_matrix_acc_zoomed.png)

These graph further support that we can easily separate class 3 from the rest of the classes. This is not news anymore since we got to the same conclusion before. But it is nice to verify.

### Comparing the mean of Tachometer and PWN.

Let's compare the mean of the Tachometer to the mean of the PWM:

```LIVE {"vis":"automatic"}
multiplot:scatter_matrix([4,5],
                         ["x","y","z","tach","pwm","i","class"],
                         "class","off",250,0.5);
select vector of [x,y,z,tach,pwm,i,c]
  from Integer i, Number x, Number y,
       Number z, Number tach, Number pwm,
       Vector of vector v, Integer c
 where v = windowed_stats_1024(i,c)
   and x = v[1,1]
   and y = v[2,1]
   and z = v[3,1]
   and tach = v[4,1]
   and pwm = v[5,1];
```

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/scatter_matrix_pwm_tach.png)

In these graph we see that there is a clear difference in Tachometer vs PWM for the class 1 (red, low voltage). If  you recall we these dimensions was not normally distributed and we are using mean over 1024 windows right now. To make sure that this relation is correct even on the raw data we will once again use `multicastreceive` and the helper function `get_tpwmc`.

`get_tpwmc` will select every unique point (tachometer, pwm) from a class stream. This means that we will not get any duplicate points. Since plotting 13 000 000 in the scatter plot will overload the browser this is an easy way to remove any points that is unnecessary to draw.

```OSQL
create function get_tpwmc(Integer c, boolean train) -> Bag of Vector                        
  as select distinct [tach,pwm,tach/pwm,c]
       from Number tach, Number pwm, vector v
      where v in case when train then class_stream(c) 
                      else test_class_stream(c) end
        and tach = v[4]
        and pwm = v[5];
```

Te following query will plot the raw Tachometer vs PWM:

```LIVE {"vis":"automatic"}
merge(
multiplot:scatter_matrix([1,2],
                         ["tach","pwm","tach/pwm","class"],
                         "class","off",350,1),
{"batch": 1});
multicastreceive((select vector of "s"+range(4)),
                 "get_tpwmc",[[1],[2],[3],[4]])
```

> [note] **Note:**  The use of `merge` to add the field `"batch":1` to the top level multi plot record.

![Scatter plot matrix](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/scatter_matrix_raw_pwm_tach.png)

We can see that the same relation between Tachometer and PWM is present on the raw data. This means that we have two methods using different signals to detect if the fan has an object in it (using the variance of the accelerometer) and comparing the Tachometer to the PWM to detect a Low Voltage. Separating normal operation of a obstructed fan might need some more advanced pattern analysis in order to figure out how they differ.

# Final thoughts

Hopefully this guide have given you an idea on how you can do data exploration using SA Engine. We found out that we could use the accelerometer variance to detect if an object is lodged in the fan; and we used the PWM ratio between Tachometer to separate Low Voltage from normal voltage. The final separation of an obstructed fan and normal operation will either require a more advanced pattern matching or another sensor input might be needed.

Finally as promised here is a full scatter plot matrix:

```LIVE {"vis":"automatic"}
/* Create a scatter grid of the standard deviation of all axes */
multiplot:scatter_matrix([1,2,3,4,5,6],
                         ["x","y","z","tach","pwm","i","class"],
                         "class","off",150,0.5);
select vector of [x,y,z,tach,pwm,i,c]
  from Integer i, Number x, Number y,
       Number z, Number tach, Number pwm,
       Vector of vector v, Integer c
 where v = windowed_stats_1024(i,c)
   and x = v[1,2]
   and y = v[2,2]
   and z = v[3,2]
   and tach = v[4,2]
   and pwm = v[5,2];
```