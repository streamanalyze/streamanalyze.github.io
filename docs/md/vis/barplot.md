
## Bar plot.

**Bar plot** works on the same data as **Line plot** but is better suited for
the Vector and Record data.


```LIVE {"vis":"showBar"}
rfft(winagg(simstream(0.01),256,4))
```

> [static-only] <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/bp1.png"/>

> [note]   **Note:** You can click and drag the mouse vertically on the graph to zoom in 
> the y-range. Double click to reset zoom. 

When **Bar plot** gets a record the keys for each value will be used as labels:

```LIVE {"vis":"showBar"}
{
  "x": 10,
  "y": 5,
  "z": 13
}
```

With batch data types you get a slider at the top of the graph that lets you 
slide through all of the data in the batch:

```LIVE {"vis":"showBar"}
select vector of x
  from Vector x
where x in rfft(winagg(simstream(0.01),256,4))
limit 100
```
