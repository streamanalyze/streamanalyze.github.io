# Time functions:
Objects of type `Timeval` represent absolute time points. The time
points are internally represented using [Coordinated Universal
Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)(UTC)
making them location independent. The time points are internally
represented as number of microseconds since 00:00:00, January 1st,
1970, which is called the
[epoch](https://en.wikipedia.org/wiki/Epoch_(computing)).

Get current time according to UTC by calling:
```LIVE 
utc_time()
```
The time format is `year-month-dateThour:minute:second:millisecondZ`. ``
The ending `Z` indicates UTC time, also called Greenwich Mean Time (GMT).

Get the local time by calling:
```LIVE 
local_time()
```
Notice that the local time string depends on where your sa.engine server is located.
As an alternative you can get a location independent local time string by calling:
```LIVE 
local_utc_time()
```
The ending `hh:ss` indicates the time shift in hours and minutes needed to get UTC time.

Get the current time point by calling:
```LIVE 
now()
```
Constants of type `Timeval` are written as `|UTC-time|`.

You can create new time points by adding or subtracting seconds from
time points using `+` or `-`, respectively:

```LIVE 
set :t1=now();
:t1 + 1;
:t1 - 1
```

You can get the time in seconds between two time points by using `-`, e.g.:
```LIVE 
set :t1 = now();
set :t2 = :t1 + 2;
:t2 - :t1
```


The function call `sleep(x)` makes the system sleep for x seconds. Try:
```LIVE 
set :t1 = now();
sleep(0.2);
now() - :t1
```

## Functions

> [function]clock()->Number

> [function-docs]
> The number of seconds since the system was started 



___

> [function]local_time(Timeval tv)->Charstring

> [function-docs]
> Convert time point `tv` into local ISO time string 



___

> [function]local_time()->Charstring

> [function-docs]
> The current time as local ISO time string 



___

> [function]local_utc_time(Timeval tv)->Charstring

> [function-docs]
> Convert time point `tv` into local UTC time string 



___

> [function]local_utc_time()->Charstring

> [function-docs]
> The current local time as ISO UTC time string 



___

> [function]minus(Timeval tv,Number sec)->Timeval

> [function-docs]
> `tv - sec` 



___

> [function]minus(Timeval tv1,Timeval tv2)->Real

> [function-docs]
> `tv2 - tv1` 



___

> [function]now()->Timeval

> [function-docs]
> Current time point 



___

> [function]parse_iso_timestamp(Charstring ts)->Timeval

> [function-docs]
> Convert ISO time string `ts` into time point 



___

> [function]plus(Number sec,Timeval tv)->Timeval

> [function-docs]
> `sec + tv` 



___

> [function]plus(Timeval tv,Number sec)->Timeval

> [function-docs]
> `tv + sec` 



___

> [function]real(Timeval tv)->Real r

> [function-docs]
> Convert time point `tv` into number of seconds since epoch 



___

> [function]rnow()->Real

> [function-docs]
> The current time as number of seconds since epoch 



___

> [function]sec(Timeval tv)->Integer

> [function-docs]
> Second in time point `tv` 



___

> [function]shift(Timeval tv,Number sec)->Timeval

> [function-docs]
> Shift `sec` seconds from time point `tv`. 
>      Same as `tv+sec` 



___

> [function]sleep(Number sec)->Number

> [function-docs]
> Sleep for `sec` seconds 



___

> [function]span(Timeval tv1,Timeval tv2)->Real

> [function-docs]
> The difference in seconds between time points `tv2` and `tv1`.
>      Same as `tv2-tv1` 



___

> [function]timestamp(Timeval o)->Timeval

> [function-docs]
> Get the timestamp of timestamped object `o` 



___

> [function]timeval(Number r)->Timeval t

> [function-docs]
> Convert number of seconds since epoch `r` into time point 



___

> [function]timeval(Vector tv)->Timeval

> [function-docs]
> The time point of a UTC time vector 
>     `[year, month, day, hour, minute, microsecond]` 



___

> [function]time_vector(Timeval tv)->Vector of Number

> [function-docs]
> The components of time point `tv` as a UTC time vector
>     `[year, month, day, hour, minute, microsecond]` 



___

> [function]time_zone()->Number

> [function-docs]
> Diffence in seconds between UTC and the current local time zone 
>      west of UTC 



___

> [function]ts(Object o)->Timeval

> [function-docs]
> Make a timestamped object for value `o` with current time 



___

> [function]ts(Timeval tv,Object o)->Timeval

> [function-docs]
> Make a timestamped object for `o` with time point `tv` 



___

> [function]usec(Timeval tv)->Integer

> [function-docs]
> Microsecond in time point `tv` 



___

> [function]utc_offset()->Number

> [function-docs]
> Difference in seconds between UTC and the current local time zone
>      west of UTC adjusted for daylight saving 



___

> [function]utc_time(Timeval tv)->Charstring

> [function-docs]
> Convert time point `tv` into ISO UTC time string 



___

> [function]utc_time()->Charstring

> [function-docs]
> The current time as ISO UTC time string 



___

> [function]value(Timeval o)->Object

> [function-docs]
> Get the value of timestamped object `o` 


