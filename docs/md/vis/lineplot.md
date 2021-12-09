# Line plot
Lets start by looking at how **Line plot** works:
```LIVE {"vis":"showLine"}
simsig(siota(1,200)/10);
```

> [static-only]  <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/lp1.png"/>


> [note]   **Note:** You can click and drag the mouse vertically on the graph to zoom in 
the y-range. If you click and drag on the x-axis you can zoom it in as well.
Double click to reset zoom. 

Line plots also support several series:
```LIVE {"vis":"showLine"}
select [simsig(x), cos(x)]
  from Number x
 where x in siota(1,200)/10;
```


> [static-only]  <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/lp2.png"/>


When a record is received the key for each value is used as series label:
```LIVE {"vis":"showLine"}
select {"sim_sig(x)": simsig(x), "cos(x)": cos(x)}
  from Number x
 where x in range(200)/10
 order by x;
```


> [static-only]  <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/lp3.png"/>


> [note]   **Note:** You can click the colored square next to a series to toggle the 
visibility of the series 

When line plot receives one of the **batch** data types it will render a full
graph from the data:
```LIVE {"vis":"showLine"}
select {"sim_sig": simsig(x), "cos": cos(x)}
  from Number x
 where x in range(200)/10
 order by x;
```


> [static-only]  <img width="800px" src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/lp4.png"/>

