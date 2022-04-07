# Creating a Scatter plot Matrix using Multi plot.

You can use Multi plot to create a scatter plot matrix.

```LIVE {"vis":"automatic"}
multiplot:scatter_matrix([1,2,4],["cos","sin","mod","cos*sin"],"mod","off");
select [ cos(x), 
         sin(x), 
         mod(round(x),2), 
         cos(x)*sin(x)
       ]
  from Number x
 where x in heartbeat(0.01)*100
```

The function  `multiplot:scatter_matrix` will simply create a record that will tell Multi plot to draw all scatter plots in a grid:

```LIVE
pp(multiplot:scatter_matrix([1,2],["cos","sin","mod","cos*sin"],"mod","off"));
```

Source:

```LIVE
sourcecode("multiplot:scatter_matrix");
```