# Visualizing geographical data using GeoJSON.
SA Studio supports visualization on Google Maps using [Geo JSON](https://geojson.org).
You can try out and build your own GeoJSON object at [geojson.io](https://geojson.io).

Example of a single point:

```LIVE {"vis":"showGeoJSON"}
geojson:point(17.640617787837982,59.85822408829443,{})
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj1.png"/>

A point with custom style and a label:

```LIVE {"vis":"showGeoJSON"}
geojson:point(17.640617787837982,59.85822408829443,
              {"style": {"label": "SA HQ"}})
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj2.png"/>

By default all added features are removed when new data arrives:


```LIVE {"vis":"showGeoJSON"}
geojson:point(17.630586326122284, 59.859743971785704,
              {"style": {"label": "Old SA HQ"}});
geojson:point(17.640617787837982,59.85822408829443,
              {"style": {"label": "SA HQ"}})
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj3.png"/>

This can be remedied by setting `persistent` to `true` in the properties Record:

```LIVE {"vis":"showGeoJSON"}
geojson:point(17.630586326122284, 59.859743971785704,
              {"persistent": true,"style": {"label": "Old SA HQ"}});
geojson:point(17.640617787837982,59.85822408829443,
              {"persistent": true,"style": {"label": "SA HQ"}})
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj4.png"/>

If you wish to move a point you can set persistent to `true` and add an `id` property:

```LIVE {"vis":"showGeoJSON"}
geojson:point(17.630586326122284, 59.859743971785704,
              {"persistent": true,"id":"office",
               "style": {"label": "SA HQ"}});
geojson:point(17.630586326122284, 59.859743971785704,
              {"persistent": true,
               "style": {"label": "Old SA HQ"}});
geojson:point( 17.646524012088776, 59.858205232414065,
              {"persistent": true,
               "style": {"label": "Uppsala train station"}});              
              
geojson:point(17.640617787837982,59.85822408829443,
              {"persistent": true,"id":"office",
               "style": {"label": "SA HQ"}});
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj5.png"/>

> [note]  **Note:** When using an id to track points you can click on it to mark it with a different color. 


Geo JSON also supports Lines:

```LIVE {"vis":"showGeoJSON"}
geojson:line([[17.630586326122284, 59.859743971785704],
                  [17.640617787837982,59.85822408829443],
                  [17.646524012088776, 59.858205232414065]],
              {"style": {"strokeColor":"red", "fillColor": "red",
                         "strokeWeight": 1}});
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj6.png"/>

Polygon:

```LIVE {"vis":"showGeoJSON"}
geojson:polygon([[[17.630586326122284, 59.859743971785704],
                  [17.640617787837982,59.85822408829443],
                  [17.646524012088776, 59.858205232414065],
                  [17.630586326122284, 59.859743971785704]]],
              {"style": {"strokeColor":"red", "fillColor": "red",
                         "strokeWeight": 1}});
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj7.png"/>

Using all we've seen so far:



```LIVE {"vis":"showGeoJSON"}
geojson:point(17.630586326122284, 59.859743971785704,
              {"persistent": true,"id":"office",
               "style": {"label": "SA HQ"}});
geojson:point(17.630586326122284, 59.859743971785704,
              {"persistent": true,
               "style": {"label": "Old SA HQ"}});
geojson:point( 17.646524012088776, 59.858205232414065,
              {"persistent": true,
               "style": {"label": "Uppsala train station"}});              

geojson:point(17.640617787837982,59.85822408829443,
              {"persistent": true,"id":"office",
               "style": {"label": "SA HQ"}});
geojson:polygon([[[17.630586326122284, 59.859743971785704],
                  [17.640617787837982,59.85822408829443],
                  [17.646524012088776, 59.858205232414065],
                  [17.630586326122284, 59.859743971785704]]],
              {"persistent": true,
               "style": {"strokeColor":"red", "fillColor": "red",
                         "strokeWeight": 1}});               

geojson:line([[17.630586326122284, 59.859743971785704],
              [17.640617787837982,59.85822408829443],
              [17.646524012088776, 59.858205232414065]],
              {"persistent": true,
               "style": {"strokeColor":"blue",
                         "strokeWeight": 10}});
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj8.png"/>

This can of course be made into a feature collection as well:



```LIVE {"vis":"showGeoJSON"}
geojson:collection(
   [geojson:point(17.630586326122284, 59.859743971785704,
              {"style": {"label": "Old SA HQ"}}),
    geojson:point( 17.646524012088776, 59.858205232414065,
              {"style": {"label": "Uppsala train station"}}),              
    geojson:point(17.640617787837982,59.85822408829443,
              {"style": {"label": "SA HQ"}}),
    geojson:polygon([[[17.630586326122284, 59.859743971785704],
                      [17.640617787837982,59.85822408829443],
                      [17.646524012088776, 59.858205232414065],
                      [17.630586326122284, 59.859743971785704]]],
              {"style": {"strokeColor":"red", "fillColor": "red",
                         "strokeWeight": 1}}),          
    geojson:line([[17.630586326122284, 59.859743971785704],
                  [17.640617787837982,59.85822408829443],
                  [17.646524012088776, 59.858205232414065]],
              {"style": {"strokeColor":"blue",
                         "strokeWeight": 10}})])
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj9.png"/>

Lets simulate two persons walking (well, flying) from Old SA HQ and Uppsala Train Station to the current SA HQ.

```LIVE {"vis":"showGeoJSON"}
set :old_sa_hq = [17.630586326122284, 59.859743971785704];
set :new_sa_hq = [17.640617787837982,59.85822408829443];
set :station = [17.646524012088776, 59.858205232414065];

create function interpolate_between(Vector of Number p1,
                                    Vector of Number p2,
                                    Integer steps,
                                    Number pace,
                                    Charstring name)
                                    -> Stream of Record
  as select stream of geojson:point(p,
                                   {"persistent": true,
                                    "id": name,
                                    "style": {"label": name}})
       from Integer i, Vector delta, Vector p
      where delta = (p2-p1)/steps
        and i in diota(pace,1,steps)
        and p = p1+delta*i;



merge_streams(bag(
    interpolate_between(:old_sa_hq, :new_sa_hq, 10,1, "Johan"),
    interpolate_between(:station, :new_sa_hq, 4,1, "Erik")));
```

> [static-only]  <img  src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/visualization/geoj10.png"/>

See [Topics -> Geo JSON](/docs/topic/Geo_JSON) for more info on GeoJSON in SA Studio