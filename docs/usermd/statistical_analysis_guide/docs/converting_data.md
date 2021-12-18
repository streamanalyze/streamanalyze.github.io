# Looking at the dataformat.

The data we got is on a JSON-format. Which we can read into SA Engine using the `json:file_stream` function.
However if we look at the data everything is in on large JSON-object. On a PC we can easily load the whole JSON object
into main memory but it will cause a large overhead and it is not applicable for smaller edge devices. We can do that by reading in the JSON-Object once and then writing the values to a file in a more stream friendly manner. But first let us look at the JSON-Object structure.

```json
{
    "protected": {"ver": "v1", "alg": "HS256", "iat": 1614325643.0206501}, 
    "signature": "xxx", 
    "payload": {
        "device_name": "IMU3+PWM+Tach", 
        "device_type": "Smartfan", 
        "interval_ms": 1.25, 
        "sensors": [{"name": "accX", "units": "dig"}, {"name": "accY", "units": "dig"}, 
                    {"name": "accZ", "units": "dig"}, {"name": "tach", "units": "dig"}, 
                    {"name": "pwm", "units": "dig"}], 
        "values": [[...],...] <- 96 MB of readings.
    }
}
```

If you look at the JSON-Object the dimension information is under `payload->sensors` while the readings are under `payload->values`. The following query will read in

## Converting data

> [note] **Note:** If you are running these examples you need to set `data_file_path()` to the full path of the folder
> containing the .json files:
> ```
> set data_file_path() = "<PATH-TO-FOLDER-WITH-.JSON-FILES>";
>```

```LIVE
select json:write_file(output_file, vstream(sensor_values))
  from Charstring file,
       Record data_object,
       Vector of Vector sensor_values,
       Charstring output_file
 where some(data_file_path())
   and file in dir(data_file_path())
   and notany(like(file,"*streamed*"))
   and data_object in json:file_stream(data_file_path()+file)
   and sensor_values = data_object["payload","values"]
   and output_file = data_file_path()+"streamed_"+file
```

Once the above query is done you will have a set of new files beginning with `streamed` containing the sensor-readings in a JSON format more suitable for streaming.