
## Scatter plot

Scatter plot works with all the data types as well. But it makes the most sense
when there are at least two dimensions. Lets start by creating a streaming
unit circle:

```LIVE {"vis":"showScatterPlot"}
select [cos(x), sin(x)]
  from Number x
where x in heartbeat(0.01)*10/(2*PI())

```




> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/sp0.png"/>

> [note]    **Note:** You can click and drag the mouse on the graph to zoom in. 
Double click to reset zoom. 

**Scatter plot** can also show different sizes and colors on each point as well
as be reconfigured on what to show on each axis. Lets create a stream with
a few more dimension to play around with: 

```LIVE {"vis":"showScatterPlot"}
select { "cos(x)": cos(x), 
         "sin(x)": sin(x), 
         "mod(x,2)": mod(round(x),2), 
         "cos(x)*sin(x)": cos(x)*sin(x)
       }
  from Number x
 where x in heartbeat(0.01)*100
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/sp1.png"/>

> [exercise] **Exercise:** Select `cos(x)*sin(x)` as the color-axis. Then play around with
setting the different axes.


When using batch data types scatter plot simply renders all the given points:
```LIVE {"vis":"showScatterPlot"}
select vector of { "cos(x)": cos(x), 
         "sin(x)": sin(x), 
         "mod(x,2)": mod(round(x),2), 
         "cos(x)*sin(x)": cos(x)*sin(x)
       }
  from Number x
 where x in heartbeat(0.01)*100
 limit 100
```


> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/sp2.png"/>