# A band pass filter model

As an example of an algebraic signal processing model we define in
OSQL a [band pass
filter](https://en.wikipedia.org/wiki/Band-pass_filter) over the
microphone audio stream through the following steps:

1. Convert the microphone stream to a stream of frequency spectra by
   applying
   [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform) (OSQL
   function `rfft()` on the windows from the `audio()` data stream
   function.

2. Mask off the elements in the frequency spectra outside a given
   frequency interval by a **frequency mask** function `band_mask()`.

3. Convert the filtered frequency spectra back to an audio stream
   using the inverse FFT function `irfft()`.

We first define the frequency mask function `band_mask(sz, l, u)` that
generates a vector `v` of size `sz` where `v[i]=1` for `i` in the
interval `[l,u]` and 0 otherwise. It is defined by as:

```LIVE
create function band_mask(Number sz, Number lb, Number ub) -> Vector of Number
  /* Make a mask vector of size `sz` with ones in range `[lb,ub]`
     and zeroes otherwise */
  as select Vector of x
       from Number x, Number i
      where i in range(sz) 
        and x = case when i >= lb and i <= ub then 1
                     else 0
                end
      order by i;

```

Try the `band_mask`:

```LIVE {"vis":"showText"}
band_mask(10,3,5)
```

The function `band_mask()` creates a new vector by using a `select
Vector of` statement. 

> [note]   **Note:** In general `select` statements filter, transform, or
generate collections of objects of different kinds. In this case the
`select Vector of x` statement generates a new vector where each
element `x` is a number. 

In order to use `band_mask()` to filter out frequencies outside the
range `[400,800]` in frequency vectors of size 256 of the audio stream
`audio(256, 16000)` we need to call `band_mask(256, 400/16000*256*2+1,
800/16000*256*2+1)` (= `band_mask(256, 13, 65)`). This filter formula
can in general be expressed as a function `freq_mask(sz, hz, lfreq,
ufreq)`:

```LIVE
create function freq_mask(Number sz, Number hz, Number lfreq, Number ufreq)
                        -> Vector of Number
    as band_mask(sz, lfreq/hz*sz*2+1, ufreq/hz*sz*2+1)
```


Make a frequency mask for frequencies in the band `[400,800]` of an
audio frequency vector of size 256 with sampling frequency 16000:

```LIVE {"vis":"showText"}
freq_mask(256, 16000, 400, 800)
```

The following CQ makes a band pass filter in the band `[400,800]`
applied on the audio stream `audio(256, 16000)`:

```LIVE {"vis":"showBar"}
irfft(freq_mask(256, 16000, 400, 800) .* rfft(audio(256, 16000)))
```
Visualize it as **Bar plot** and clap your hands.

You can visualize the frequency spectrum as a bar plot of the stream
from this query:

```LIVE {"vis":"showBar"}
freq_mask(256, 16000, 400, 800) .* rfft(audio(256, 16000))
```

> [exercise]  **Exercise:** Change the frequency band to `[400,2000]` and see what
happens.


__The final model__

Define the audio band pass filter as a function:
```LIVE
create function audio_band_filter(Number sz, Number hz, Number lfreq, Number ufreq)
                                -> Stream of Vector of Number
  as irfft(freq_mask(sz, hz, lfreq, ufreq) .* rfft(audio(sz, hz)))
```

Try your new real-time data stream analysis model by evaluating and
visualizing while making noise:

```LIVE {"vis":"showBar"}
audio_band_filter(256, 16000, 400, 800)
```
> [exercise] **Exercise:** Save the functions `audio_band_filter()`,
`band_mask()`, and `freq_mask()` as a model

