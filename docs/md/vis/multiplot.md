# Multi plot

## Multi plot records

When using the visualization method `Multi plot` you can prepend a stream with
a record giving it instructions on how to visualize the coming data.

These records are recognized by the key-value pair `sa_plot` for a single
visualization and `sa_plots` for multiple visualizationss.

```
sa_plot format:
{
  "sa_plot": <string>,
  "width": number,
  "height": number,
  "<visualization-param>": <value>
}

sa_plots format:
{
  "sa_plot": [<string>||<sa_plot>],
  "width": number,
  "height": number,
  "<visualization-param>": <value>
}
```

* **sa_plot** the visualization method to use.
* **sa_plots** vector of visualization methods to use. The outer options are
propagated to all sa_plot elements in vector. Override by defining them inside
a sa_plot record in the vector.
* **width** Width of the plot, in range (0,1) = % of container width, 
[1,infinity] width in pixels, 0 = default.
* **height** Height of the plot, in range (0,1) = % of container height, 
[1,infinity] width in pixels, 0 = default.
* **visualization-param** Are settings for the specific visualization.
  Some common seting include
    * **batch**: `<1|0>` - if 1 save data until end of stream. Otherwise stream
    as normal.
    * **labels**: `<vector>` with labels to display.
    * **memory**: `<number>` - When not using batch, `memory` determines how many points to be visualized in plot.

```LIVE {"vis":"showMultiPlot"}
{
  "sa_plot": "Line plot", 
  "labels":["cos","sin","mod","cos*sin"],
  "memory": 100
};
select [ cos(x), 
         sin(x), 
         mod(round(x),2), 
         cos(x)*sin(x)
       ]
  from Number x
 where x in heartbeat(0.01)*100
```


> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp1.png"/>


```LIVE {"vis":"showMultiPlot"}
{
  "sa_plot": "Line plot",
  "width": 400,
  "height": 400
};
select { "cos(x)": cos(x), 
         "sin(x)": sin(x), 
         "mod(x,2)": mod(round(x),2), 
         "cos(x)*sin(x)": cos(x)*sin(x)
       }
  from Number x
 where x in heartbeat(0.01)*100
```


> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp2.png"/>

You can also instruct it to visualize the data in many different ways:

```LIVE {"vis":"showMultiPlot"}
{ 
  "sa_plots": ["Line plot", "Scatter plot","Bar plot", "p-coords", "Pie chart"]
};
select simsig(x), sin(x), cos(x), (sin(x)+1.1)/(cos(x)+1.1)
  from Number x
 where x in iota(1,200)/10
 order by x;
```

> [static-only]  <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp3.png"/>


## Multi plot record generators

There are a few predefined convenience functions for generating multi plot records in the `multiplot:` namespace that can be useful when analysing data.

* `multiplot:barplot_matrix`
* `multiplot:generate_scatter_pcoords_grid`
* `multiplot:scatter_matrix`
* `multiplot:tagged_lineplots`

>[note]**A note on nomenclature:** In statistical analytics terms each sensor represents an *observable variable*. Each time we read a measurement from a sensor we say that we *sample* (or *observe*) a value from the variable. In this documentation we sometimes also use the name *dimension* for a variable, which comes from the dimension each variable represents in the n-dim sample space.


### Plotting grid of barplots for classified data

When doing statistical analysis of sensor measurements that have been classified it can be of use to display the data in a grid of bar plots where each row presents a class and each column represents a sensor.

To plot the measurements for different classes we can use `multiplot:barplot_matrix`. It produces a multiplot record for a grid of barplots with classes on the grid y-axis and measurements for each sensor on the x-axis.

Parameters:

1. Number of classes.
2. Number of variables (dimensions).
3. Vector of class names.
4. Vector of variable (dimension) names.
5. Height of plot windows.

The data format needs to be a vector of vector of vector of number, where the inner vector is a series of measurements from a specific sensor, each element of the middle vector represents a class, and the elements outer vector represents the variables.

So if we have $k$ classes $c = \{1,2,...,k\}$ and $n$ sensors (variables) $s = \{1,2,...,n\}$, and the measurement vector $vec_{cs}$ is the measurements of sensor $s$ for class $c$, then the data is on the format:
```
[
  [ vec_11, vec_21, ..., vec_k1 ],     // readings from sensor 1
  [ vec_12, vec_22, ..., vec_k2 ],     // readings from sensor 2
  ...                                  // ...
  [ vec_1n, vec_2n, ..., vec_kn ],     // readings from sensor N
]
```

So the inner vector of vector can be seen as a matrix with the columns representing classes and the rows representing sensors/variables.

**Example**

Let's say that you have a weather station with five (5) different sensors (temperature, humidity, etc). Let's also say that the measurements are taken during three (3) different states of the environment (e.g., raining, sunny, snowing). We call the states *classes*.

To plot the data we first call `multiplot:barplot_matrix` with the number of classes (3), the number of variables (5), the names of the classes, the names of the variables (we use generic names in this example), and finally the height of the plots (200). After the record-generating function call we provide the data on the required format.

```LIVE {"vis": "Automatic"}
multiplot:barplot_matrix(3, 5,
                         ["class1", "class2", "class3"],
                         ["var-1", "var-2", "var-3", "var-4", "var-5"],
                         200,true);

      // class 1        class 2             class3
[ [[1,2,3,4,5,6,7], [2,3,4,4,5,5,6], [2,3,4,8,9,9,7]],        // var 1
  [[7,6,5,4,3,2,1], [9,8,5,6,4,2,2], [9,6,5,3,5,3,5]],        // var 2
  [[2,2,3,4,2,2,3], [8,8,9,9,8,9,8], [22,21,15,13,16,11,10]], // var 3
  [[7,3,4,5,6,1,2], [1,2,0,0,7,3,4], [2,4,9,8,3,3,4]],        // var 4
  [[2,3,5,4,6,8,9], [1,1,2,3,4,4,4], [6,8,9,5,2,1,6]]]        // var 5
```

> [static-only] <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp_barplot_matric.png"/>

The result is a grid of bar plots with each row representing one class and each column representing one sensor.


### Parallel coordinate and scatter plots side-by-side

When doing statistical analysis of sensor measurements that have been classified it can be of use to display the data with parallel coordinates and scatterplots side-by-side.

To plot the data we can use `multiplot:generate_scatter_pcoords_grid`. It produces a multiplot record for a grid of plots with the first column being parallel coordinate plots of the data from each class and the second column being a 2D scatter plot of two specific variables.

Parameters:

1. Vector of class labels.
2. Vector of variable labels (dimensions).
3. Vector of the two variable labels to use in the scatter plot (as provided in (2)).
4. Label of variable to use for color map.
5. Height of plot windows.

The data format needs to be a stream of vector of number, where the vectors are measurement vectors with one value from each sensor PREPENDED by two elements representing the ID (disregarded by plot) and CLASS.

So if we have $K$ classes, $N$ varibles with observed values $s_i$ where $i = \{1,2,...,N\}$, then the data is on the format:
```
[
  [ 0, 1, s_1, s_2, ..., s_N ],     // class 1
  [ 0, 1, s_1, s_2, ..., s_N ],     // ...
  ...
  [ 0, 2, s_1, s_2, ..., s_N ],     // class 2
  [ 0, 2, s_1, s_2, ..., s_N ],     // ...
  ...
  [ 0, K, s_1, s_2, ..., s_N ],     // class K
  [ 0, K, s_1, s_2, ..., s_N ],     // ...
  ...
]
```

**Example**

Let's say that you have a weather station with five (5) different sensors (temperature, humidity, etc). Let's also say that the measurements are taken during three (3) different states of the environment (e.g., raining, sunny, snowing). We call the states *classes*.

To plot the data we first call `multiplot:generate_scatter_pcoords_grid` with the vector of class labels, the vector of variable labels, the two variables that we want to scatter plot, the variable we want to use for color mapping, and finally the height of the plots (200). After the record-generating function call we provide the data on the required format.

```LIVE {"vis": "Automatic"}
multiplot:generate_scatter_pcoords_grid(
    ["class1", "class2", "class3"],
    ["id", "class", "var-1", "var-2", "var-3", "var-4", "var-5"],
    ["var-1", "var-2"],
    "var-1",
    200);

vstream(
[
  [0,1,6,100,78,-21,8],  // class 1
  [0,1,3,110,70,-24,3],  // ...
  [0,1,2,120,64,-22,3],
  [0,1,7,105,77,-28,2],
  [0,1,3,130,80,-24,3],
  [0,2,5,150,71,-35,1],  // class 2
  [0,2,2,155,82,-18,8],  // ...
  [0,2,5,160,84,-13,2],
  [0,2,3,153,73,-16,5],
  [0,2,5,166,64,-13,5],
  [0,3,4,120,70,-35,4],  // class 3
  [0,3,1,118,72,-31,6],  // ...
  [0,3,2,112,77,-38,2],
  [0,3,2,115,77,-37,7],
  [0,3,7,117,66,-32,1]   
]
);
```

> [static-only] <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp_pcoord_scatter_grid.png"/>

The result is columns of plots with each row representing one class and the first column is a parallel corrdinate plot and the second is a scatter plot of two variables.
