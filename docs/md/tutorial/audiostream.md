## Querying the microphone

If you run the desktop version of sa.studio it will start a stream
server on your PC. If you also have Java installed you will have
access to the **audio steam** from your microphone in the stream
server as a built-in foreign function:

``` 
audio(Number ws, Number sr) -> Stream of Vector of Number 
```

`audio()` returns a raw data stream of microphone readings with
sampling rate `sr` packed into tumbling windows (i.e. vectors) of size
`ws`.

In this tutorial it will be shown how to analyze such audio
streams. 


> [note]  **Note:** This tutorial assumes that you have downloaded and installed the
> desktop version of sa.studio on your PC. You must also have Java
> installed.
>
> If you are running this on the web based 'sandbox' version of
> sa.studio you must first register an edge device with a microphone
> (Such as Android, Raspberry Pi, or PC) to the stream server on the
> web. How this is done is explained in [Edge
> devices](/docs/md/edge_devices/README.md).
>
>  An alternative to connecting an edge device is to define a synthetic
> audio signal generator along the guidelines in the tutorial [Simulated
> audio](/docs/md/tutorial/simulated-audio.md).


Test that you have your microphone working by visualizing with `Bar
plot` the following CQ while making some sound:

```LIVE {"vis":"showBar"}
audio(256,16000)
```

Now, let's make a CQ that analyzes the audio stream in real time to
detect whether it contains sound with frequencies in a given
interval. We will do the following:

1. Transform the audio stream into a stream of frequency spectra windows
   by applying the [Fast Fourier
   Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
   `rfft()` on each window from the raw `audio()` function.

2. Find the dominating frequency in each transformed window, i.e. the
   index of the strongest frequency in each spectrum.

3. Select only those windows where the dominating frequency is within the
   given frequency interval.

The following CQ detects when the dominating frequency from the
microphone is in the interval `[80,400]`:

```LIVE {"vis":"showLine"}
select Stream of hz
  from Number hz, Number index, Number max, Number windowSize, 
       Number sampleRate, Vector of Number window
 where windowSize = 512
   and sampleRate = 16000
   and window in rfft(audio(windowSize,sampleRate))
   and max = max(window) 
   and window[index] = max
   and hz = index * sampleRate/windowSize  * 0.5
   and hz >= 80
   and hz <= 400
```

> [note]  **Note:** Stop the previous query to the microphone before you run this query; otherwise the microphone line will be busy.

Run the query in sa.studio with visualization method **Line plot**
while humming.

> [note]  **Note:** The equality operator (`=`) specifies a *filter* where the
expressions on the left and the right hand sides must be equal. Notice
that this is a comparison, not an assignment!


You will notice that stream elements are produced even if there is
silence, which happens because there is always some background noise.
To filter out background noise weaker than `0.001` you can refine the
CQ to:

```LIVE {"vis":"showLine"}
select Stream of hz
  from Number hz, Number index, Number max, Number windowSize, 
       Number sampleRate, Vector of Number window
 where windowSize = 512
   and sampleRate = 16000
   and window in rfft(audio(windowSize,sampleRate))
   and max = max(window) 
   and window[index] = max
   and hz = index * sampleRate/windowSize  * 0.5
   and hz >= 80
   and hz <= 400
   and max > 0.001
```
Now no stream is produced when there is silence, unless there is some
background noise stronger than 0.001. Try the CQ while whistling or
humming, and you will notice that the whistling does not produce any
stream elements since it is outside the frequency band `[80,400]`.

:::EXERCISE
**Exercise:** Make a query to find out your current background noise
level.
:::
### <a name="define-model-function"> Defining a Model Function </a>

In order to re-use the above CQ for different frequency bands we can
define a function `audio_band()` representing a model that returns a stream 
of microphone readings for a given frequency band:
```LIVE
create function audio_band(Number low, Number up)
                         -> Stream of Number
    as select Stream of hz
         from Number hz, Number index, Number max, Number windowSize, 
              Number sampleRate, Vector of Number w
        where windowSize = 512
          and sampleRate = 16000
          and w in rfft(audio(windowSize,sampleRate))
          and max = max(w) 
          and w[index] = max
          and hz = index * sampleRate/windowSize  * 0.5
          and hz >= low
          and hz <= up
          and max > 0.001
```
Try the model function by visualizing as **Line plot** the following
CQ while humming or whistling:
```LIVE {"vis":"showLine"}
audio_band(80,400)
```

The  [next tutorial](/docs/md/tutorial/sounds.md)shows how to make a model to detect
unusual sounds.
