
> [note]  **Note:** Prerequisite(s): [Install on Android](/docs/usermd/getting-started/android/install.md)  

## Test your setup

Now that you have added your Android phone as an edge device to the server it is time to test some queries.

**1.** Go to the OSQL editor by clicking the ![OSQL editor](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/osql-editor-icon.png "OSQL editor") icon.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" width="700"/>

**2.** Open a new OSQL editor by clicking the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/open-new-osql-editor-button.png" alt="open-new-osql-editor-button.png" width="120"/> button.

**3.** Ensure that the queries will be evaluated on the server by selecting "server" in the device list at the bottom.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-osql-editor-device-selector-server.png" alt="sa-studio-osql-editor-device-selector-server.png" width="250"/>

**4.** In the editor window, write the query `listening_edges();`. 

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-enter-query.png" alt="sa-studio-osql-editor-enter-query.png" width="700"/>

Then run the query by pressing the ![Run queries](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Run queries") icon to run the query. The result is a list of edges that are connected to the server. Your Android phone should be present with the name "ANDROID-EDGE".

```shell
["ANDROID-EDGE"]
```

**5.** Change the device on which the queries are run by clicking <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> at the bottom (next to the run query button) and select `Android-edge` from the list.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-osql-editor-device-selector-android-edge.png" alt="sa-studio-osql-editor-device-selector-win-edge.png" width="250"/>

Now when you run a query it will execute on your Android edge device. 

**6.** Try executing a query on the Android edge device by having <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/device-selector-android-edge.png" alt="device-selector-android-edge.png" width="100" /> as selected device, delete the previous query from the editor window and execute the new query:

```LIVE {"peer":"Android-edge"}
this_peerid();
```

This should output the string `"ANDROID-EDGE"` which is the id of your Android edge device. 

Now we have verified that your Android phone is connected to the server, and that it can run queries retrieved from the server.


## Examine the sensors

Now that you have tested that you can execute queries on the Android edge device it is time to examine how we can interact with the sensors on the phone.

**1.** First we check what sensors (signals) we have access to. We do this by executing the following query (ensure that you have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/device-selector-android-edge.png" alt="device-selector-android-edge.png" width="100" /> as selected device).

```LIVE {"peer":"Android-edge"}
signals();
```

The query returns a set of the names of all the signals on the device and should include some of the following.

```shell
"accelerometer"
"magnetometer"
"gyroscope"
"light"
"step_detector"
"step_counter"
```

**2.** Plot the accelerometer signal by executing the folowing query.

```LIVE
signal_stream("accelerometer");
```

This shows the accelerometer readings in the output window. Shake the phone a bit it to see how the readings change. See if you can determine which movement direction corresponds to which line in the plot.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-osql-editor-accelerometer-plot.png" alt="sa-studio-osql-editor-accelerometer-plot.png" width="700"/>


## Develop a detect-shake model

Now that we have examined the accelerometer it is time to develop a simple model. Our model will use the accelerometer to signal if the phone is shaking. In its final form the model will signal `1` if the phone starts shaking, and `0` if it stops.

**1.** First we define a helping function that combines the three gravitation vectors in the stream from the accelerometer. This is done by typing in the function below and running it as a query (ensure that you still have <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/device-selector-android-edge.png" alt="device-selector-android-edge.png" width="100" /> as selected device).

```sql
create function gravity_acceleration() -> Stream of Number 
  as select Stream of sqrt(sum(g .^ 2))
       from Vector of Number g
      where g in signal_stream("accelerometer")
```

The query should return a string `#[OID <NUM> ]` which is the id of the function. 

**2.** Test the helping function by running the following query.

```sql
stdev(winagg(gravity_acceleration(),50,5));
```

The query passes "a window" over the stream and computes the standard deviation on each window. The standard deviation will be zero when the phone is not moving and some positive value when the accelerator readings change. Shake the phone and see how the plot changes.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-osql-editor-gravity-acceleration-plot.png" alt="sa-studio-osql-editor-gravity-acceleration-plot.png" width="700"/>


**3.** Define a function that signals if the shaking is above some threshold. This is done by running the following query.

```sql
create function shake_state(Number threshold) -> Stream of Number
  as select Stream of shakes
       from Number shakes, Number elem
      where elem in stdev(winagg(gravity_acceleration(),50,5))
        and shakes = case when elem > threshold then 1 
                          else 0 end
```

**4.** Test the shake state function by running the following query and shaking the phone.

```sql
shake_state(5);
```

The output plot should show a step function with value `1` if the phone is shaking and `0` when the phone is still.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-osql-editor-shake-state-plot.png" alt="sa-studio-osql-editor-shake-state-plot.png" width="700"/>


**5.** We want the final model to only emit values if the shake state changes. This is done by wrapping the function call in a `changed()` statement. We do this in a separate function by running the following query.

```sql
create function shakes(Number threshold) -> Stream of Number
  as changed(shake_state(threshold));
```

The output of `shakes` is better visualized by simply printing the values than plotting it in a diagram. So change the output from `Automatic` to `Text` in the output selector at the bottom next to the device selector.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-android-edge/sa-studio-osql-editor-output-selector-text.png" alt="sa-studio-osql-editor-output-selector-text.png" width="300"/>


**6.** Now our final model is ready. Try it by running the following query.

```sql
shakes(5);
```

It should emit the value `1` when the phone starts shaking, and the value `0` when it stops. Just what we wanted! 



## Conclusion

Congratulations! You have now developed your first model on an Android edge device.

> [static-only] Where to go from here:
> * Use the [documentation](http://docs.streamanalyze.com/) to learn more about OSQL and how you can build models and interact with edge devices.


> [live-only] Where to go from here:
> * Use the [documentation](/docs/) to learn more about OSQL and how you can build models and interact with edge devices.
