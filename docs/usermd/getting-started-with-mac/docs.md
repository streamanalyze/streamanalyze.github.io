# Getting started with Mac

> [note] **Note:** This guide is designed for running inside SA Studio. Doing so makes it possible to run the code blocks interactively (like a Jupyter Notebook). If you read this documentation on the regular documentation website some internal links might not work and you will only be able to read the code examples, not run them.

> [note]  **Note:** This guide requires Java to run. To check if you have Java installed open Terminal on your Mac and run the following command.

```shell
$ java -version
```

The command should print out the version number of Java if Java is installed. If Java is not installed you can download and install the appropriate version from [Oracle's Java Download Page](https://www.oracle.com/downloads/).

## Connect your Mac to the server

> [static-only] First you need to connect your Mac to the server. Follow the [Connecting an edge device](/docs/usermd/connecting-edge-device/docs) guide and come back here when your Mac is connected.

> [live-only] First you need to connect your Mac to the server. Follow the [Connecting an edge device](https://studio.streamanalyze.com/home?goto=1&dl=Iy9kb2NzLyZsb2FkX2V4dGVybmFsPXN0cmVhbWFuYWx5emUuY29tL2Nvbm5lY3RpbmctZWRnZS1kZXZpY2UmZ290bz1jb25uZWN0aW5nLWVkZ2UtZGV2aWNlL2RvY3MubWQ=) guide and come back here when your Mac is connected.

## Test your setup

Now that you have connected your Mac to the server it is time to test some queries.

**1.** Go to the OSQL editor by clicking the ![OSQL editor](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/osql-editor-icon.png "OSQL editor") icon.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" style="width:100%"/>

**2.** Open a new OSQL editor by clicking the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/open-new-osql-editor-button.png" alt="open-new-osql-editor-button.png" width="120"/> button.

**3.** Ensure that the queries will be evaluated on the server by selecting "server" in the device list at the bottom.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-osql-editor-device-selector-server.png" alt="sa-studio-osql-editor-device-selector-server.png" width="250"/>

**4.** In the editor window, write the query `listening_edges();`.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-enter-query.png" alt="sa-studio-osql-editor-enter-query.png" style="width:100%"/>

Then run the query by pressing the ![Run queries](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Run queries") icon to run the query. The result is a list of edges that are connected to the server. Your Mac should be present with the name "MACOS-EDGE".

```shell
["MACOS-EDGE"]
```

**5.** Change the device on which the queries are run by clicking <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> at the bottom (next to the run query button) and select `Macos-edge` from the list.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-osql-editor-device-selector-mac-edge.png" alt="sa-studio-osql-editor-device-selector-mac-edge.png" width="250"/>

Now when you run a query it will execute on your Mac.


**6.** Try executing a query on the Mac by having <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/device-selector-mac-edge.png" alt="device-selector-mac-edge.png" width="70" /> as selected device, delete the previous query from the editor window and execute the new query:

```shell
this_peerid();
```

This should output the string `"MACOS-EDGE"` which is the id of your Mac.

Also note that the local SA Engine instance in your Mac Terminal prompt should confirm that it ran the query `this_peerid()`.

```shell
2021-11-08T18:08:55.185 Running query 1: this_peerid();
2021-11-08T18:08:55.242 Query 1 finished
```

Now we have verified that your Mac is connected to the server, and that it can run queries retrieved from the server.


## Accessing the microphone

Now that you have tested that you can execute queries on the Mac it is time to do some tests with the microphone.

**1.** Test that you have your microphone working by running the following query while making some sound (ensure that you have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/device-selector-mac-edge.png" alt="device-selector-mac-edge.png" width="70" /> as selected device before running the query).

```sql
audio(256, 16000);
```

You might need to give Terminal permission to access the microphone. If so then simply press OK.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/mac-microphone-access-permission.png" alt="mac-microphone-access-permission.png"/>

Now when you make a sound you should see some activity in the output plot.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-osql-editor-audio-query.png" alt="sa-studio-osql-editor-audio-query.png" />


## Build a model

Now that we have tested the microphone it is time to build a simple model that detects a specific type of sound.


**1.** Create a simple audio frequency detection model by running the following query (ensure that you still have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/device-selector-mac-edge.png" alt="device-selector-mac-edge.png" width="70" /> as selected device).

```sql
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


**2.** Change the output selector to Line plot.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-mac-edge/sa-studio-osql-editor-output-selector-line-plot.png" alt="sa-studio-osql-editor-output-selector-line-plot.png" width="300"/>


**3.** Run the `audio_band()` model with the frequency interval `80` - `400` Hz.

```sql
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
