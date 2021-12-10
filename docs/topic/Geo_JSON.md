# Geo JSON functions:

SA Studio supports visualization on Google Maps using [Geo JSON](https://geojson.org).
You can try out and build your own GeoJSON object at [geojson.io](https://geojson.io),
create a Feature collection and copy the JSON object into SA Studio and run it with
**Geo JSON** visualization to view it inside SA Studio.


In addition to the GeoJSON standard SA Studio extends the format with a few propterties. All
of these properties are read from the `properties` field in a GeoJSON feature.

* `style` - a record with the styling of the Feature. All properties inside this record
    will be set using [Google maps declarative style rules](https://developers.google.com/maps/documentation/javascript/datalayer#declarative_style_rules)
    You can also just override the point fill color with the property `defaultFillColor` in the style object.
    If you with to change the icon of a GeoJSON point you can set `overrideIcon` and `overrideSelectedIcon` these icon records must follow
    [Google maps custom markers](https://developers.google.com/maps/documentation/javascript/custom-markers)
* `persistent` - true or false. If false or not set the GeoJSON object will be removed when a new data point is received in the visualization
  If true it will be kept.
* `id` - If a persistent object with the same id as the incoming GeoJSON object exists in the map then it will be replaced by the new one.
    This can be used to track several assets with an id by letting a GeoJSON object update itself.




## Functions

> [function]
> geojson:collection(Vector of Record features)->Record

> [function-docs]
> Create a GeoJSON feature collection of a vector of GeoJSON objects 



___

> [function]
> geojson:feature(Charstring geojsontype,Vector coords,Record props)->Record

> [function-docs]
> Create a GeoJSON line from the vector of `[longitude,latitude]` points
>     with `properties.`
>     



___

> [function]
> geojson:line(Vector of Vector coords,Record props)->Record

> [function-docs]
> Create a GeoJSON line from the vector of `[longitude,latitude]` points
>     with `properties.`
>     



___

> [function]
> geojson:point(Record r)->Record

> [function-docs]
> Create a GeoJSON point from a record `r` that describes the position
>      of the point as:
>         ```
>         {
>           'lat': latitude, 
>           'lng': longitude, 
>           'persistent': flag, 
>           'id': id
>         }
>         ```
>      * `lat`,`lng` - (Real) Latitude and Longitude of the point
>      * `persistent` - (Boolean) true/false is thi point permanent on the map?
>         if set to false the point will be removed when the next data arrives to
>         the Geo JSON visualization
>      * `id` - if `persistent==true` then `id` can be used to update the point.
>         i.e. when a new geojson:point arrives to the visualization and `id`
>         is set the older point with `id` will be removed before adding the new.  
>      The full record is put into the `properties` field of the GeoJSON feature.
>      Thus you can set any property the Google Maps supports for a GeoJSON point
>      such as `title`, or `icon`.
>   



___

> [function]
> geojson:point(Object longitude,Object latitude,Record props)->Record

> [function-docs]
> Create a GeoJSON point object for the geo-position `latitude`/`longitude`
>      with properties `props`
>   



___

> [function]
> geojson:point(Vector pos,Record props)->Record

> [function-docs]
> Create a GeoJSON point object for the geo-position `longitude`, `latitude`
>      with properties `props`
>   



___

> [function]
> geojson:polygon(Vector of Vector coords,Record props)->Record

> [function-docs]
> Create a GeoJSON Polygon from the vector of `[longitude,latitude]` points
>     with `properties.`
>     


