The **Multi plot** visualization method can be used to configure how the different
visualization methods will be presented. This is done by calling the function
`visualize`. 

Visualize takes up to five arguments:
- `method` the method to use for visualization. Can be any of the charstrings
            listed in the visualization drop down.
- `width` the width of the container of the plot. Leave as 0 for default.
- `height` the height of the container of the plot. Leave as 0 for default.
- `css` a record of css rules to apply to the container of the plot.
- `params` a record of configuration parameters for each visualization method. 
           See sections below for what parameters are available for each 
           visualization method.

## Text
Text should be visualized with default settings:
```LIVE{"vis": "showMultiPlot"}
visualize("Text");
iota(1,5);
```

## Line plot
Visualize coming data as a line plot. Available parameter are:
- `numpoints` number of x points to show, not used if accumulate if true
    default is 200
- `yrange` range of the y-axis as a vector of number [min,max], default
    will scale according to minimum and maximum value in stream
- `accumulate` accumulate all points until end of stream instead of 
    showing them one after another default off

*Examples:*
```LIVE {"vis": "showMultiPlot"}
visualize("Line plot", 0,150,{},{"yrange": [-3,3], "accumulate": true});
section(simstream(0.001),0,500);

visualize("Line plot", 330,120,{"float": "left"}, {"numpoints": 50});
section(simstream(0.001),0,100);

visualize("Line plot", 330,120,{"float": "left"}, {});
section(simstream(0.001),0,100);
```

*Default settings example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Line plot");
simstream(0.05)
```
## Bar plot
Visualize coming data as a bar plot. Available parameters are:
- `params` record of params for the bar plot. Possible params are:
    - `colorcode` boolean, set to true to make each bar in a different color
    - `yrange` Vector of Number, [min, max] of y-axis.

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Bar plot", 345,200,{"float": "left"}, {});
[1,5,2,4,3,2.5,3.5];

visualize("Bar plot", 345,200,{"float": "left"}, {"colorcode": true});
[1,5,2,4,3,2.5,3.5];

visualize("Bar plot", 0,150,{"clear": "both"},{"yrange": [-1,3]});
select vector of sin(x/100*2*PI()) * 3 + 2
  from Number x
 where x in iota(0,100);
```

*Default settings example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Bar plot");
rfft(winagg(simstream(0.01),256,4));
```
## Scatter plot
Visualize coming data as a scatter plot. Scatter plot takes a 
`Vector of Vector of Number` where 
 v[1] = x-axis, 
 v[2] = y-axis, 
 v[3] = (optional) size of points
 v[4] = (optional) color class of points, set to -1 for black.
 
Available parameters are:
- `labels` Vector of Charstring where labels[1] = x-axis name and 
    labels[2] = y-axis name, default ["x","y"]
- `scaleSize` Number, set to 1 to make the circles size scale with the 
    x-axis.
- `no_stroke` Number set to 1 to avoid using black border on each point
- `xrange` Vector of Number `[min,max]` the range on the x-axis
- `yrange` Vector of Number `[min,max]` the range on the y-axis
 
*Example:*
 ```LIVE {"vis": "showMultiPlot"}
visualize("Scatter plot", 300, 300, {"float": "left"}, 
                 {"labels": ["cos(x)","sin(x)"], "no_stroke": 1});
select Vector of [cos(x),sin(x), 5, mod(x,3)]
  from Number x
 where x in iota(1,100);
 
visualize("Scatter plot", 300, 300, {"float": "left"},
                         {
                           "labels": ["cos(x)","sin(x)"],
                           "scaleSize": 1  
                         });
                         
select Vector of [cos(x),sin(x), 0.05, mod(x,3)]
  from Number x
 where x in iota(1,100);

```

*Default settings example:*

 ```LIVE {"vis": "showMultiPlot"}
visualize("Scatter plot");
select Vector of [cos(x),sin(x), 5, mod(x,3)]
  from Number x
 where x in iota(1,100);
 ```

## Parallel coordinates
Visualize the coming data as parallel coordinates parallel coordinates will
accumulate all the data in a stream and then display them. The data can either 
be vectors where each index in a vector if an axis, or it can be records where 
each key in the record in an axis.

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("p-coords",0,200);
select [x,sin(x),cos(x),tan(x)]
  from Number x
 where x in iota(1,100)/(2*PI());
 
visualize("p-coords",0,200);
select {
         "x": x,
         "sin(x)": sin(x),
         "cos(x)": cos(x),
         "tan(x)": tan(x)
       }
  from Number x
 where x in iota(1,100)/(2*PI());
```

*Default settings example:*
```LIVE {"vis": "showMultiPlot"}
visualize("p-coords");
select {
         "x": x,
         "sin(x)": sin(x),
         "cos(x)": cos(x),
         "tan(x)": tan(x)
       }
  from Number x
 where x in iota(1,100)/(2*PI());
```

## Labelled bar plot
Visualize coming data as a labelled bar plot. This visualization takes either
a `Vector of Number` or a record where each key is a number.

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Labelled bar plot", 345,345,{"float": "left"},{});
[1,2,3,4];

visualize("Labelled bar plot", 345,345,{"float": "left"},{});
{"a": 1, "b": 2, "c": 3, "d": 4};
```

## Pie chart
Visualize coming data as a pie chart. This visualization takes either
a `Vector of Number` or a record where each key is a number.
- `width` width of container in pixels, set to 0 for default
- `height` height of container in pixels, set to 0 for default
- `css` record containing css rules for container


*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Pie chart", 345,345,{"float": "left"},{});
[1,2,3,4];

visualize("Pie chart", 345,345,{"float": "left"},{});
{"a": 1, "b": 2, "c": 3, "d": 4};
```

## Geo JSON
Display a geojson object on google maps. Available parameter are:
- `noclear` set to 1 to disable clearing of the map when new data comes in.

Check out [geojson.io](http://geojson.io) for examples on Geo JSON.

Below is an example on how to create a stream of geojson lines with two
points each from a csv file containing vectors on the format 
`[longitude, latitude]`:
```LIVE {"vis": "showMultiPlot"}
visualize("Geo JSON", 800,600,{},{"noclear": 1});
select {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": coords
              }
            }
          ]
        }
  from vector of vector coords, Charstring file
 where file = system_model_file('data/bus.csv')
   and coords in winagg(csv:file_stream(file, 'read', 0.01),2,1)
```

*Example with a point:*
```LIVE {"vis": "showMultiPlot"}
visualize("Geo JSON");
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          17.6304817199707,
          59.85985912184788
        ]
      }
    }
  ]
};
```


## Marker
Visualize a stream of record as a moving point in google maps. Each record
should have two keys: `"lat"`, and `"lng"` which is the latitude and longitude
of the point in number format.

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Marker");
{"lat": 59.85985912184788, "lng": 17.6304817199707};
```

## Circles
Visualize a stream of record by continuously adding circles at each point.
Each record should have two keys: `"lat"`, and `"lng"` which is the latitude 
and longitude of the point in number format.

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Circles");
{"lat": 59.85985912184788, "lng": 17.6304817199707};
{"lat": 59.86985912184788, "lng": 17.6304817199707};
```


## Heat map
Visualize a stream of Vector Record as a heat map.
Each record should have two keys: `"lat"`, and `"lng"` which is the latitude 
and longitude of the point in number format.

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("heat map");
select Vector of pos
  from Charstring data_file,
       Stream of Vector raw_stream,
       Record pos
 where data_file =  system_model_file('data/car_ride.csv')    
   and raw_stream = csv:file_stream(data_file, 'read')
   and pos in geo_location(raw_stream);
```

## Intensity plot
Visualize coming data as an intensity image. This visualization takes a 
`Vector of Vector of Number` i.e `Matrix`. The matrix is normalized and then
displayed as an image where blue is the lowers value and red is the highest.

*Example:* 
```LIVE {"vis": "showMultiPlot"}
visualize("Intensity plot", 345,345,{"margin": "auto"},{});
winagg(rfft(audio(256,8000)),100,20);
```

> [note]  **Note:** this example requires Java installed and a microphone on your PC.
If you do not have Java installed see the
next example 

*Example without audio:*
```LIVE {"vis": "showMultiPlot"}
visualize("Intensity plot", 345,345,{"margin": "auto"},{});
winagg(rfft(winagg(simstream(0.005),256,1)),100,1)
```

## Markdown
Visualize coming data as markdown

*Example:*
```LIVE {"vis": "showMultiPlot"}
visualize("Markdown");
"## Markdown example.

Below are some bulletin points:
- one
- two
- three
";
```
