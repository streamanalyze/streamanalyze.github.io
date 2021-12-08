# Visualization

sa.studio can visualize the streams from sa.engine in many different 
ways. Text is the most general visualization method and can be used to view any
data. The four most common visualization methods are **Line plot**, **Bar plot**,
**Scatter plot**, and **Parallel Coordinates**.

These visualizations can all work with the same type of data:

```
// Incremental data types
Number
Vector of number 
Record
Timeval of Number
Timeval of Vector of Number
Timeval of Record
// Batch data types:
Vector of Vector of Number
Vector of Record
Timeval of Vector of Vector of Number
Timeval of Vector of Record
Vector of Timeval of Vector of Number
Vector of Timeval of Record
```

When visualizing the incremental data types the visualization method keeps a 
brief history of length depending on the visualization. When visualizing a 
batch data type, the whole graph if re-rendered without any history.



