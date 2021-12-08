
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
