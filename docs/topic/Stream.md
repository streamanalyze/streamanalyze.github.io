# Stream
**TODO: Introduction remains to be written!**
> [function]
> changed(Stream s)->Stream

> [function-docs]
> Stream containing the elements of stream `s` that are different
>      than their predecessor 



___

> [function]
> changed(Stream of Vector s,Vector of Number indexes)->Stream of Vector

> [function-docs]
> Stream containing the vectors of stream `s` whose elements in `indexes`
>      are different than their predecessor 



___

> [function]
> concat(Stream a,Stream b)->Stream

> [function-docs]
> Concatenate streams `a` and `b` 



___

> [function]
> diota(Number pace,Number l,Number u)->Stream of Number

> [function-docs]
> Stream of natural numbers between `l` and `u`
>      with delays of `pace` seconds between produced stream elements 



___

> [function]
> extract(Stream s)->Bag

> [function-docs]
> Extract elements in stream `s` one by one as elements in a bag 



___

> [function]
> first(Stream s)->Object

> [function-docs]
> The first element in stream `s` 



___

> [function]
> first_n(Stream s,Number n)->Stream

> [function-docs]
> The stream of the first `n` elements in stream `s` 



___

> [function]
> heartbeat(Real pace)->Stream of Real

> [function-docs]
> Stream of seconds from start emitted at given `pace` in seconds 



___

> [function]
> heartbeat_wrap(Bag b,Number pace)->Stream

> [function-docs]
> Convert bag `b` into stream with sampling frequency `pace` 



___

> [function]
> histogram(Stream s,Vector limits)->Stream of Vector of Integer

> [function-docs]
> Calculate  a stream of histograms over stream `s`, with `limits` vector.
>   `limits` is a vector with `[min,max,number of bins]`
>   the range for the histograms is always $ [min,max) $ 



___

> [function]
> histogram(Stream of Number s,Number min,Number max,Number bins)
         ->Stream of Vector of Integer

> [function-docs]
> Calculate a stream histograms over a stream `s`, with `min`, `max`, and `bins`
>   the range for the histograms are always $ [min,max) $ 



___

> [function]
> histogram(Stream of Vector s,Vector of Vector limits)
         ->Stream of Vector of Vector

> [function-docs]
> Calculate a stream of histograms over a stream of vector `s`,
>   with `limits` vector. Limits must be a vector of the same dimension
>   as each vector in `s` and:
> 
>   $$
>   limits_i = [min_i,max_i, bins_i]
>   $$
> 
>   the range for the histograms is always $ [min,max) $ 



___

> [function]
> merge_streams(Bag of Stream b)->Stream

> [function-docs]
> Merge streams in bag `b` 



___

> [function]
> merge_streams(Stream s1,Stream s2)->Stream

> [function-docs]
> Merge streams `s1` and `s2` 



___

> [function]
> pivot_events(Vector keys,Stream of Vector bus)->Stream of Timeval of Vector

> [function-docs]
> Pivot stream `bus` of `[timestamp, key, value]`
>      into stream of timestamped vectors pivoted on `keys` 



___

> [function]
> pivot_streams(Vector of Stream vs,Vector iv)->Stream of Vector

> [function-docs]
> **DEPRECATED** use `streams:pivot` instead.
>      A stream of the most recently received values in `vs`,
>      having the vector `iv` as the initial element 



___

> [function]
> pivot_streams(Vector of Stream vs)->Stream of Vector

> [function-docs]
> **DEPRECATED** use `streams:pivot` instead.
>      A stream of the most recently received elements in `vs` 



___

> [function]
> playback(Stream s)->Stream

> [function-docs]
> Playback time stamped stream of vectors `s` with pace
>      according to time stamp in each first vector elements of `s` 



___

> [function]
> randstream(Real l,Real u)->Stream of Real

> [function-docs]
> Infinite stream of random numbers between `l` and `u` 



___

> [function]
> ravg(Stream s)->Stream of Real

> [function-docs]
> Running averages of elements in stream `s` 



___

> [function]
> rcount(Stream s)->Stream of Integer

> [function-docs]
> Stream of running count of elements in stream `s` 



___

> [function]
> readlines(Charstring file,Charstring delim,Number chunk)
         ->Stream of Vector of Charstring



___

> [function]
> readlines(Charstring file)->Stream of Charstring

> [function-docs]
> Stream of lines in `file` 



___

> [function]
> read_file_chunked(Charstring file,Integer chunk)->Stream



___

> [function]
> remote:function(Charstring peer,Charstring fn,Vector args)->Stream



___

> [function]
> remote:query(Charstring peer,Charstring query)->Stream



___

> [function]
> remote_function_stream(Charstring peer,Charstring fn,Vector args)
                      ->Stream of Vector

> [function-docs]
> Return stream of tuples from result of `fn(args)` on `peer` 



___

> [function]
> rsum(Stream s)->Stream of Real

> [function-docs]
> Stream of running averages of elements in stream `s` 



___

> [function]
> sample_every(Stream s,Real pace)->Stream

> [function-docs]
> Run stream `s` and emit values every `pace` seconds since the last value 



___

> [function]
> sample_stream(Bag expression,Real pace)->Stream

> [function-docs]
> Stream of `expression` evaluated every `pace` seconds 



___

> [function]
> save_last_element(Stream s,Function f)->Stream



___

> [function]
> section(Stream s,Number start,Number stop)->Stream

> [function-docs]
> The section of stream `s` starting at position `start`
>      and ending at `stop`. 



___

> [function]
> simsig(Real x)->Real

> [function-docs]
> A simulated harmonic stream reading `x` seconds from its start 



___

> [function]
> simstream(Real pace)->Stream of Real

> [function-docs]
> A simulated harmonic stream 



___

> [function]
> sink(Stream s)->Boolean

> [function-docs]
> Run stream `s` silently without extracting any elements 



___

> [function]
> siota(Number l,Number u)->Stream of Integer

> [function-docs]
> Stream of natural numbers between `l` and `u` 



___

> [function]
> skip(Stream s,Number n)->Stream

> [function-docs]
> Skip first `n` elements in stream `s` 



___

> [function]
> streamof(Stream s)->Stream



___

> [function]
> streamof(Bag b)->Stream

> [function-docs]
> Convert a bag `b` to a stream 



___

> [function]
> streams:debounce(Stream s,Number start_s,Number debounce)->Stream

> [function-docs]
> Debounce a stream sane as `streams:time_section` except for that the stop
>    condition is when `s` has not emitted any new values in the last `debounce`
>    seconds. 



___

> [function]
> streams:merge(Bag of Stream b)->Stream



___

> [function]
> streams:merge(Stream s1,Stream s2)->Stream

> [function-docs]
> Merge streams `s1` and `s2` 



___

> [function]
> streams:pivot(Vector of Stream vs,Vector iv)->Stream of Vector

> [function-docs]
> A stream of the most recently received values in `vs`,
>      having the vector `iv` as the initial element 



___

> [function]
> streams:pivot(Vector of Stream vs)->Stream of Vector

> [function-docs]
> A stream of the most recently received elements in `vs` 



___

> [function]
> streams:skip_s(Stream s,Number sec)->Stream

> [function-docs]
> Skip all elements arriving in the first `sec` seconds of
>    stream `s`. 



___

> [function]
> streams:timeout(Stream s,Number timeout)->Stream



___

> [function]
> streams:time_section(Stream s,Number start_s,Number stop_s)->Stream

> [function-docs]
> Skip elements arriving in first `start_s` seconds on stream s and stop after
>    `stop_s` seconds. Same as `section(stream,start,stop)` except for that the
>    start and stop values are in seconds.



___

> [function]
> streams:zip(Vector of Stream vs,Vector of Integer indices)->Stream of Vector

> [function-docs]
> A stream where each received values in `vs`,
>      is "zipped" together on the indices in `indices`.
>      Indices not in `indices` will have the latest seen value
>      on each emit



___

> [function]
> streams:zip(Vector of Stream vs)->Stream of Vector

> [function-docs]
> A stream where each received values in `vs`,
>      is "zipped" together one at a time. Should only
>      be used of streams have the same pace.



___

> [function]
> stream_function_tuples(Charstring peer,Charstring fn,Vector args)->Bag of Vector



___

> [function]
> timestamps(Number pace)->Stream of Charstring

> [function-docs]
> Stream of local timestamp UTC every `pace` seconds 



___

> [function]
> timestream(Number pace)->Stream of Timeval

> [function-docs]
> Stream of time stamps every `pace` seconds 



___

> [function]
> ts_simstream(Real pace)->Stream of Timeval of Real

> [function-docs]
> A sumulated time stamped harmonic stream 



___

> [function]
> vectorof(Stream b)->Vector v

> [function-docs]
> Convert finite stream to vector 



___

> [function]
> vstream(Vector v)->Stream

> [function-docs]
> Convert a vector `v` to a stream 



___

> [function]
> writelines(Stream s,Charstring file)->Charstring

> [function-docs]
> Create `file` by lines in stream `s` 


