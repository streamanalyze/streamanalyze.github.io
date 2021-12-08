# JSON functions:
A **record** represents a set of attributes and their corresponding
values of an artifact. For example, the following record may represent
that a person named `Tore` has the income `100000`:

```
{"name":"Tore", "income":100000}
```

Other commonly used terms for records are JSON objects, property
lists, or dictionaries.

Let's assign the record above to a variable `:t`:

```LIVE
set :t = {"name":"Tore", "income":100000};
:t
```

An attribute `a` in a record `r` can be accessed using the `r[a]`
notation, for example:

```LIVE
:t["name"]
```

## Functions

> [function]geodist(Record x,Record y)->Number

> [function-docs]
> Get the distance in meter between Google Maps locations `x` and `y` 



___

> [function]geo_coordinate(Record r)->Vector of Number

> [function-docs]
> Convert a Google Maps loction `r` to a coordinate vector 



___

> [function]geo_location(Vector v)->Record

> [function-docs]
> Convert a coordinate vector 'v' on format `[lng, lat]` into a Google Maps 
>      location 



___

> [function]json:file_stream(Charstring file)->Stream

> [function-docs]
> Stream of JSON objects in `file` 



___

> [function]json:load(Charstring model,Charstring file)->Charstring

> [function-docs]
> Load exported functions from JSON `file` in `model` 



___

> [function]json:request(Charstring url)->Record

> [function-docs]
> Read a JSON object from REST server in `url` 



___

> [function]json:sample(Charstring url,Number period)->Stream of Record

> [function-docs]
> Read a JSON object from REST server in `url` every `period` seconds 



___

> [function]json:serial_stream(Charstring sn,Integer br)->Stream

> [function-docs]
> json stream from serial port named `sp` with baud rate `br` 



___

> [function]json:serial_stream(Charstring sn,Integer br,Charstring flow_control,
                  Integer data_bits,Integer stop_bits,Integer parity)->Stream

> [function-docs]
> json stream from serial port named `sp` with baud rate `br` 



___

> [function]json:socket_stream(Charstring host,Integer sp,Object request)->Stream

> [function-docs]
> json stream from port `sp` on `host` 



___

> [function]json:socket_stream(Charstring host,Integer sp)->Stream

> [function-docs]
> json stream from port `sp` on `host` 



___

> [function]json:stringify(Object o)->Charstring



___

> [function]json:unload(Vector of Function fnol,Charstring model,Charstring file)
           ->Charstring

> [function-docs]
> Unload functions `fnol` into JSON `file` in `model` 



___

> [function]json:unload(Charstring fn,Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload function named `fn` as JSON `file` in `model` on server 



___

> [function]json:unstringify(Charstring string)->Object



___

> [function]json:unstringify_record(Charstring string)->Record



___

> [function]json:write_file(Charstring file,Stream s)->Charstring

> [function-docs]
> Write elements in stream `s` into `file` in JSON format 



___

> [function]json:write_file(Charstring file,Bag b)->Charstring

> [function-docs]
> Write elements in bag `b` into `file` in JSON format 



___

> [function]label_vector(Vector labels,Vector values)->Record

> [function-docs]
> Label the elements in vector `v` with corresponding `labels` 



___

> [function]make_record(Vector v)->Record

> [function-docs]
> Construct a record from a vector `v` of keys followed by values 



___

> [function]merge(Record x,Record y)->Record

> [function-docs]
> Combine records `x` and `y` 



___

> [function]put_record(Record r,Charstring k,Object v)->Record

> [function-docs]
> Set value of key `k` in record `r` to value `v` 



___

> [function]recordof(Bag of (Object,Object))->Record

> [function-docs]
> Construct a record from a bag of attribute/value pairs `b` 



___

> [function]record_length(Record r)->Integer

> [function-docs]
> The number of key/value pairs in a record `r` 



___

> [function]record_vector(Record r)->Vector v



___

> [function]vref(Record,Object)->Object


