# Stream functions:

> [function]changed(Stream s)->Stream

> [function-docs]
> Stream containing the elements of stream `s` that are different 
>      than their predecessor 



___

> [function]changed(Stream of Vector s,Vector of Number indexes)->Stream of Vector

> [function-docs]
> Stream containing the vectors of stream `s` whose elements in `indexes`
>      are different than their predecessor 



___

> [function]concat(Stream a,Stream b)->Stream

> [function-docs]
> Concatenate streams `a` and `b` 



___

> [function]diota(Number pace,Number l,Number u)->Stream of Number

> [function-docs]
> Stream of natural numbers between `l` and `u` 
>      with delays of `pace` seconds between produced stream elements 



___

> [function]extract(Stream s)->Bag

> [function-docs]
> Extract elements in stream `s` one by one as elements in a bag 



___

> [function]first(Stream s)->Object

> [function-docs]
> The first element in stream `s` 



___

> [function]first_n(Stream s,Number n)->Stream

> [function-docs]
> The stream of the first `n` elements in stream `s` 



___

> [function]heartbeat(Number pace)->Stream of Number

> [function-docs]
> Stream of seconds from start emitted at given `pace` in seconds 



___

> [function]heartbeat_wrap(Bag b,Number pace)->Stream

> [function-docs]
> Convert bag `b` into stream with sampling frequency `pace` 



___

> [function]merge_streams(Bag of Stream b)->Stream

> [function-docs]
> Merge streams in bag `b` 



___

> [function]merge_streams(Stream s1,Stream s2)->Stream

> [function-docs]
> Merge streams `s1` and `s2` 



___

> [function]pivot_events(Vector keys,Stream of Vector bus)->Stream of Timeval of Vector

> [function-docs]
> Pivot stream `bus` of `[timestamp, key, value]`
>      into stream of timestamped vectors pivoted on `keys` 



___

> [function]pivot_streams(Vector of Stream vs,Vector iv)->Stream of Vector

> [function-docs]
> A stream of the most recently received values in `vs`, 
>      having the vector `iv` as the initial element 



___

> [function]pivot_streams(Vector of Stream vs)->Stream of Vector

> [function-docs]
> A stream of the most recently received elements in `vs` 



___

> [function]playback(Stream s)->Stream

> [function-docs]
> Playback time stamped stream of vectors `s` with pace
>      according to time stamp in each first vector elements of `s` 



___

> [function]predwin(Stream s,Integer c,Object p,Function e,Function l,Boolean start_entered)
       ->Stream of Vector

> [function-docs]
> Form predicate windows over stream `s` by applying the window delimination
>      functions `e` and `l` on sliding change windows over `s` of size `cw`
>      with stride 1. A new window is started when `e(cw,p)` is true or at the
>      begining if `start_entered=true` 
>      and ended when `l(cw, p)` is true 



___

> [function]predwin(Stream s,Integer c,Object p,Function e,Function l)->Stream of Vector

> [function-docs]
> Form predicate windows over stream `s` by applying the window delimination
>      functions `e` and `l` on sliding change windows over `s` of size `cw`
>      with stride 1. A new window is started when `e(cw,p)` is true 
>      and ended when `l(cw, p)` is true 



___

> [function]randstream(Real l,Real u)->Stream of Real

> [function-docs]
> Infinite stream of random numbers between `l` and `u` 



___

> [function]ravg(Stream s)->Stream of Number

> [function-docs]
> Running averages of elements in stream `s` 



___

> [function]rcount(Stream s)->Stream of Number

> [function-docs]
> Stream of running count of elements in stream `s` 



___

> [function]readlines(Charstring file,Charstring delim,Number chunk)
         ->Stream of Vector of Charstring



___

> [function]readlines(Charstring file)->Stream of Charstring

> [function-docs]
> Stream of lines in `file` 



___

> [function]read_file_chunked(Charstring file,Integer chunk)->Stream



___

> [function]remote_function_stream(Charstring peer,Charstring fn,Vector args)
                      ->Stream of Vector

> [function-docs]
> Return stream of tuples from result of `fn(args)` on `peer` 



___

> [function]rsum(Stream s)->Stream of Number

> [function-docs]
> Stream of running averages of elements in stream `s` 



___

> [function]sample_every(Stream s,Number pace)->Stream

> [function-docs]
> Run stream `s` and emit values every `pace` seconds since the last value 



___

> [function]sample_stream(Bag expression,Number pace)->Stream

> [function-docs]
> Stream of `expression` evaluated every `pace` seconds 



___

> [function]save_last_element(Stream s,Function f)->Stream



___

> [function]section(Stream s,Number start,Number stop)->Stream

> [function-docs]
> The section of stream `s` starting at position `start` 
>      and ending at `stop`. 



___

> [function]simsig(Real x)->Real

> [function-docs]
> A simulated harmonic stream reading `x` seconds from its start 



___

> [function]simstream(Number pace)->Stream of Real

> [function-docs]
> A simulated harmonic stream 



___

> [function]simwinstream(Number pace,Number sz)->Stream of Vector of Real



___

> [function]sink(Stream s)->Boolean

> [function-docs]
> Run stream `s` silently without extracting any elements 



___

> [function]siota(Number l,Number u)->Stream of Integer

> [function-docs]
> Stream of natural numbers between `l` and `u` 



___

> [function]skip(Stream s,Number n)->Stream

> [function-docs]
> Skip first `n` elements in stream `s` 



___

> [function]streamof(Stream s)->Stream



___

> [function]streamof(Bag b)->Stream

> [function-docs]
> Convert a bag `b` to a stream 



___

> [function]timestamps(Number pace)->Stream of Charstring

> [function-docs]
> Stream of local timestamp UTC every `pace` seconds 



___

> [function]timestream(Number pace)->Stream of Timeval

> [function-docs]
> Stream of time stamps every `pace` seconds 



___

> [function]ts_simstream(Number pace)->Stream of Timeval of Number

> [function-docs]
> A sumulated time stamped harmonic stream 



___

> [function]twinagg(Stream of Timeval s,Number size,Number stride)
       ->Stream of Timeval of Vector

> [function-docs]
> Stream of time windows over stream `s`  represented as 
>      time stamped vectors where:
>      `size` is the window size in seconds
>      `stride` is the window stride in seconds 



___

> [function]twinagg(Stream of Timeval s,Number size,Number stride,Timeval start)
       ->Stream of Timeval of Vector

> [function-docs]
> Stream of time windows over stream `s`  represented as 
>      time stamped vectors where:
>      `size` is the window size in seconds
>      `stride` is the window stride in seconds
>      `start` is the point in time where the windowing should start. 



___

> [function]vectorof(Stream b)->Vector v

> [function-docs]
> Convert finite stream to vector 



___

> [function]vstream(Vector v)->Stream

> [function-docs]
> Convert a vector `v` to a stream 



___

> [function]winagg(Stream s,Number size,Number stride)->Stream of Vector

> [function-docs]
> Stream of count windows over stream `s` represented as vectors where:
>      `size` is the number of elements in each window
>      `stride` is the number of elements in the window stride 



___

> [function]writelines(Stream s,Charstring file)->Charstring

> [function-docs]
> Create `file` by lines in stream `s` 


