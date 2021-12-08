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
