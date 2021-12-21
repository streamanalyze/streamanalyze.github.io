# Identifying sounds

In this tutorial it is shown how to identify sounds from an audio
stream. It utilizes the built-in database to store pre-recorded
[feature vectors](https://en.wikipedia.org/wiki/Feature_(machine_learning)) of
a number of sounds. Then a CQ is run that continuously identifies and
reports when the audio stream contains some of these sounds.

This result of the tutorial was demonstrated in the
[video](https://dl.streamanalyze.com/demo/DEMOWiP_2_KHALID_MAHMOOD.mp4)
presented 2021-08-26 at the
[IEEE Smartcomp 2021](https://www.smart-comp.info/) conference.

To begin with, let's create a table of feature vectors in the local
database of our stream server (or edge client if you are using an
Android device connected to the stream server). In sa.engine, tables
are represented as tabulated functions called *stored
functions*. Stored functions are defined by an `as stored` phrase:

```LIVE
create function sound_anomaly(Charstring id) -> Vector of Integer fv
  /* The feature vector for anomaly named `id` */
  as stored;

```

The approach we are taking for identifying unusual sounds is to make a
model to extract feature vectors from the sound stream and store the
feature of the sound anomaly named `id` in `sound_anomaly(id)`.  We
identify a sound anomaly when a received computed feature vector in the
live audio stream is close to some pre-recorded feature vector in the
table. We choose to use [`euclid(v,w)`](/docs/md/tutorial/basic-functions.md) to measure
the distance between feature vectors `v` and `w`.

In the previous [tutorial](/docs/md/tutorial/audiostream.md) we computed vectors of
sound intensities for different frequencies in the audio stream by
using `rfft()`. In this tutorial we define a feature vector as the
indices of the `k` strongest signals in each frequency spectrum by the
function:

```LIVE
create function top_indices(Vector of Number v, Integer k) 
                          -> Vector of Integer
  /* Indices of `k` largest elements in `v` */
  as select Vector of i
       from Integer i, Number x
      where x = v[i]
      order by x desc
      limit k;
```

The body of the function `top_indices(s,k)` is an example of an OSQL
*vector query* returning a vector. Vector queries are defined by the
keyword `Vector` just after the `select`. Notice how `order by` and
`limit` is used to form av vector of the indices `i` of the strongest
frequencies in `v`. Test it by calling:

```LIVE
top_indices([1,5,2,7], 3);
```

The next step is to define a function to produce a stream of feature
vectors from the live raw audio stream:

```LIVE
create function sound_features() -> Stream of Vector of Integer
  /* Produce a sound feature vector by selecting the indicies of the
     five strongest signals in the frequency spectrucm of the audio 
     stream */ 
  as select Stream of top_indices(e,5)
       from Vector of Number e
      where e in rfft(audio(512,16000))
        and max(e)>0.1;
```

Notice the noise cancellation by `max(e)>0.01`!

> [exercise] **Exercise:** Test `sound_features()` visualized as bar plot while
whistling or clapping your hands! What happens when there is noise
cancellation? Did it work? If not, fix it!
Also visualize as text and remember how the feature vectors of
whistling and humming looked.


Now we define a function to find the identity `id` of the feature vector
in `sound_anomaly(id)` being closest within `radius` from a feature
vector `fv`:
```LIVE
create function closest_anomaly(Vector of Integer fv, Real radius)
                              -> Charstring
  /* Get the anomaly closest to the audio feature vector `fv` 
     within the distance `radius` */
  as select id
       from Charstring id, Number dist
      where dist = euclid(fv,sound_anomaly(id))
        and dist <= radius
      order by dist
      limit 1
```

To test `closest_anomaly(fv, radius)` we first need to populate
`sound_anomaly(id)` by setting the sound anomaly `whistle` by the
*database update*:

```LIVE
set sound_anomaly("Whistle") = first(sound_features())
```

The function `first(s)` returns the first element in stream `s`.

> [note]   Wait a little bit after you have started the above update before you
whistle. If the update returns before the whistle happens, the feature vector
of some disturbance has been recorded by mistake. 

> [exercise] Repeat the update for humming.  Make sure that the table
`sound_features()` has the correct feature vectors for both whistling
and humming.


Now we can test our model by running this continuous query:

```LIVE
closest_anomaly(sound_features(),50)
```

See [Topic->Stream](/docs/topic/Stream) for more on functions over
streams. For example, how do you remove the repetitions of detected
features in the query above?

The [next tutorial](/docs/md/tutorial/edge-query.md) explains how to develop models
running on edge devices.



