> [note]  **Note:** Prerequisite(s): [Install on windows](/docs/usermd/getting-started/windows/install.md) 
## Test your setup

Now that you have added your local Windows machine as an edge device to the server it is time to test some queries.

**1.** Go to the OSQL editor by clicking the ![OSQL editor](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/osql-editor-icon.png "OSQL editor") icon.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" width="800"/>

**2.** Open a new OSQL editor by clicking the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/open-new-osql-editor-button.png" alt="open-new-osql-editor-button.png" width="120"/> button.

**3.** Ensure that the queries will be evaluated on the server by selecting "server" in the device list at the bottom.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-device-selector-server.png" alt="sa-studio-osql-editor-device-selector-server.png" width="250"/>

**4.** In the editor window, write the query `listening_edges();`. 

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-enter-query.png" alt="sa-studio-osql-editor-enter-query.png" width="800"/>

Then run the query by pressing the ![Run queries](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Run queries") icon to run the query. The result is a list of edges that are connected to the server. Your Windows machine should be present with the name "WIN-EDGE".

```shell
["WIN-EDGE"]
```

**5.** Change the device on which the queries are run by clicking <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> at the bottom (next to the run query button) and select `Win-edge` from the list.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-device-selector-win-edge.png" alt="sa-studio-osql-editor-device-selector-win-edge.png" width="250"/>

Now when you run a query it will execute on your Windows edge device. 


**6.** Try executing a query on the Windows edge device by having <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector-win-edge.png" alt="device-selector-win-edge.png" width="70" /> as selected device, delete the previous query from the editor window and execute the new query:

```shell
this_peerid();
```

This should output the string `"WIN-EDGE"` which is the id of your Windows edge device. 

Also note that the local SA Engine instance in your Windows CMD prompt should confirm that it ran the query `this_peerid()`. 

```shell
2021-10-18T14:38:32.392 Running query 1: this_peerid();
2021-10-18T14:38:32.444 Query 1 finished
```

Now we have verified that your Windows machine is connected to the server, and that it can run queries retrieved from the server.


##  Accessing the microphone

Now that you have tested that you can execute queries on the Windows machine it is time to do some tests with the microphone.

> [note]  **Note:** This step requires Java. If Java is not installed you can download and install the appropriate version from [Oracle's Java Download Page](https://www.oracle.com/java/technologies/downloads)  


**1.** Test that you have your microphone working by running the following query while making some sound (ensure that you have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector-win-edge.png" alt="device-selector-win-edge.png" width="70" /> as selected device before running the query).

```sql
audio(256, 16000);
```

Now when you make a sound you should see some activity in the output plot.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-audio-query.png" alt="sa-studio-osql-editor-audio-query.png" width="600"/>


## Build a model

Now that we have tested the microphone it is time to build a simple model that detects a specific type of sound.


**1.** Create a simple audio frequency detection model by running the following query (ensure that you still have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector-win-edge.png" alt="device-selector-win-edge.png" width="70" /> as selected device).

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

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-output-selector-line-plot.png" alt="sa-studio-osql-editor-output-selector-line-plot.png" width="400"/>


**3.** Run the `audio_band()` model with the frequency interval `80` - `400` Hz.

```sql
audio_band(80, 400);
```

If you make a humming sound the model should detect it and emit the frequencies. If you instead make a whistle sound, which produces frequencies significantly higher than 400 Hz, the model will ignore it and not emit anything. 

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-audio-band-query.png" alt="sa-studio-osql-editor-audio-band-query.png" width="600"/>


## Conclusion

Congratulations! You have now developed your first model on a Windows edge device.
STATIC-ONLY> 
Where to go from here:
* Use the [documentation](http://docs.streamanalyze.com/) to learn more about OSQL and how you can build models and interact with edge devices.


LIVE-ONLY> 
Where to go from here:
* Use the [documentation](/docs/) to learn more about OSQL and how you can build models and interact with edge devices.
