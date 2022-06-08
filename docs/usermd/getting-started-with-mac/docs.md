# Getting started with Mac

> [note] **Note:** This guide is designed for running inside SA Studio. Doing so makes it possible to run the code blocks interactively (like a Jupyter Notebook). If you read this documentation on the regular documentation website some internal links might not work and you will only be able to read the code examples, not run them.

> [note]  **Note:** This guide requires Java to run. To check if you have Java installed open Terminal on your Mac and run the following command:
>
>```shell
>$ java -version
>```
>
>The command should print out the version number of Java if Java is installed. If Java is not installed you can download and install the appropriate version from [Oracle's Java Download Page](https://www.oracle.com/downloads/).


## Connect your Mac to the server

> [static-only] First you need to connect your Mac to the server. Follow the [Connecting an edge device](/docs/usermd/connecting-edge-device/docs) guide and come back here when your Mac is connected.

> [live-only] First you need to connect your Mac to the server. Follow the [Connecting an edge device](https://studio.streamanalyze.com/home?goto=1&dl=Iy9kb2NzLyZsb2FkX2V4dGVybmFsPXN0cmVhbWFuYWx5emUuY29tL2Nvbm5lY3RpbmctZWRnZS1kZXZpY2UmZ290bz1jb25uZWN0aW5nLWVkZ2UtZGV2aWNlL2RvY3MubWQ=) guide and come back here when your Mac is connected.

## Test your setup

Now that you have connected your Mac to the server it is time to test some queries.

**1.** Select "server" in the device list at the bottom and run the following query by pushing the ![Play](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Play") icon.

```LIVE
listening_edges();
```

The result is a list of edges that are connected to the server. Your device should be present with the name you gave it when connecting the edge.

```shell
["MACOS-EDGE"]
```

**2.** You can change which device the queries are run on by clicking the device selector <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> at the bottom of the code block (next to the play button). Try this and select your edge device from the list. Now when you run a query it will execute on your edge device. Run the following query on your edge device.

```LIVE {"peer":"Server"}
this_peerid();
```

This should output the name you gave your edge device when connecting it to the server.

Also note that the local SA Engine instance in your device's terminal prompt should confirm that it ran the query `this_peerid()`.

```shell
2021-10-18T14:38:32.392 Running query 1: this_peerid();
2021-10-18T14:38:32.444 Query 1 finished
```

Now we have verified that your Mac is connected to the server, and that it can run queries received from the server.


## Accessing the microphone

Now that you have tested that you can execute queries on the Mac it is time to do some tests with the microphone.

**1.** Test that you have your microphone working by running the following query while making some sound (ensure that you have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/device-selector-mac-edge.png" alt="device-selector-mac-edge.png" width="70" /> as selected device before running the query).

```LIVE {"peer":"Mac-edge","vis":"Bar plot"}
audio(256, 16000);
```

You might need to give Terminal permission to access the microphone. If so then simply press OK.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/mac-microphone-access-permission.png" alt="mac-microphone-access-permission.png"/>

Now when you make a sound you should see some activity in the output plot.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-osql-editor-audio-query.png" alt="sa-studio-osql-editor-audio-query.png" />


## Build a model

Now that we have tested the microphone it is time to build a simple model that detects a specific type of sound.


**1.** Create a simple audio frequency detection model by running the following query (ensure that you still have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/device-selector-mac-edge.png" alt="device-selector-mac-edge.png" width="70" /> as selected device).

```LIVE {"peer":"Mac-edge"}
create function audio_band(Number low, Number up)
                         -> Stream of Number
    as select Stream of hz
         from Number hz, Number index, Number max, Number windowSize,
              Number sampleRate, Vector of Number w
        where windowSize = 512
          and sampleRate = 16000
          and w in rfft(audio(windowSize, sampleRate))
          and max = max(w)
          and w[index] = max
          and hz = index * sampleRate/windowSize  * 0.5
          and hz >= low
          and hz <= up
          and max > 0.001;
```

The model analyzes the audio stream in real time to detect whether it contains sound with frequencies in a given interval. To accomplish this it carries out a few steps.

1. It transforms the audio stream into a stream of frequency spectra windows by applying the Fast Fourier Transform `rfft()` on each window from the raw `audio()` function.

2. It finds the dominating frequency in each transformed window, i.e., the index of the strongest frequency in each spectrum.

3. It selects only those windows where the dominating frequency is within the given frequency interval.

4. It only emits the detected result if the strength of the signal is larger than 0.001. This is to filter out background noise.


**2.** Run the `audio_band()` model with the frequency interval `80` - `400` Hz.

```LIVE {"peer":"Mac-edge", "vis":"Line plot"}
audio_band(80, 400);
```

If you make a humming sound the model should detect it and emit the frequencies. If you instead make a whistle sound, which produces frequencies significantly higher than 400 Hz, the model will ignore it and not emit anything.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-osql-editor-audio-band-query.png" alt="sa-studio-osql-editor-audio-band-query.png" />



## Conclusion

Congratulations! You have now developed your first model on a Mac edge device.
> [static-only] Where to go from here:
> * Use the [documentation](http://docs.streamanalyze.com/) to learn more about OSQL and how you can build models and interact with edge devices.


> [live-only]
> Where to go from here:
> * Use the [documentation](/docs/) to learn more about OSQL and how you can build models and interact with edge devices.
