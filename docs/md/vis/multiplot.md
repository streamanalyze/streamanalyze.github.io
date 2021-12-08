# Multi plot
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

STATIC-ONLY> <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp1.png"/>


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

STATIC-ONLY> <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp2.png"/>

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




STATIC-ONLY> <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/mp3.png"/>