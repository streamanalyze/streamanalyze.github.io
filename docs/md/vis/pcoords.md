
## Parallel coordinates

**Parallel coordinates** is a very good alternative when visualizing many 
dimensions. [Wikipedia](https://en.wikipedia.org/wiki/Parallel_coordinates)

> [note]  Parallel coordinates are a common way of visualizing high-dimensional geometry and analyzing multivariate data.
To show a set of points in an n-dimensional space, a backdrop is drawn consisting of n parallel lines, typically vertical and equally spaced. A point in n-dimensional space is represented as a polyline with vertices on the parallel axes; the position of the vertex on the i:th axis corresponds to the i:th coordinate of the point. 

```LIVE {"vis":"showParallellCoordinates"}
select { "cos(x)": cos(x), 
         "sin(x)": sin(x), 
         "mod(x,2)": mod(round(x),2), 
         "cos(x)*sin(x)": cos(x)*sin(x)
       }
  from Number x
 where x in heartbeat(0.01)*100
```

> [static-only]  <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/pc1.png"/>

Batch:

```LIVE {"vis":"showParallellCoordinates"}
select vector of { "cos(x)": cos(x), 
         "sin(x)": sin(x), 
         "mod(x,2)": mod(round(x),2), 
         "cos(x)*sin(x)": cos(x)*sin(x)
       }
  from Number x
 where x in heartbeat(0.01)*100
 limit 100
```


> [static-only]  <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/pc2.png"/>
> [note]  **Note:** You can drag on each axis label to reorder the dimensions. Click 
and drag on an axis to only view selected lines. Click on part of the axis 
that isn't selected to remove selection. 

