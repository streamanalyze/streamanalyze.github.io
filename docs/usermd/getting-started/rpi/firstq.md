
> [note]  **Note:** Prerequisite(s): [Install on Rasperry Pi](/docs/usermd/getting-started/rpi/install.md) 

# Executing your first query

## Test your setup

Now that you have added your Raspberry Pi as an edge device to the server it is time to test some queries.

**1.** Go to the OSQL editor by clicking the ![OSQL editor](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/osql-editor-icon.png "OSQL editor") icon.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio.png" alt="sa-studio.png" style="width:100%"/>

**2.** Open a new OSQL editor by clicking the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/open-new-osql-editor-button.png" alt="open-new-osql-editor-button.png" width="120"/> button.

**3.** Ensure that the queries will be evaluated on the server by selecting "server" in the device list at the bottom.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-osql-editor-device-selector-server.png" alt="sa-studio-osql-editor-device-selector-server.png" width="250"/>

**4.** In the editor window, write the query `listening_edges();`. 

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-enter-query.png" alt="sa-studio-osql-editor-enter-query.png" style="width:100%"/>

Then run the query by pressing the ![Run queries](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Run queries") icon to run the query. The result is a list of edges that are connected to the server. Your Raspberry Pi should be present with the name "PI-EDGE".

```shell
["EDGE1","PI-EDGE"]
```

**5.** Change the device on which the queries are run by clicking <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png"  /> at the bottom (next to the run query button) and select `Pi-edge` from the list.

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-osql-editor-device-selector-pi-edge.png" alt="sa-studio-osql-editor-device-selector-pi-edge.png" width="250"/>

Now when you run a query it will execute on your Raspberry Pi. 


**6.** Try executing a query on the Raspberry Pi edge device by having  <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/device-selector-pi-edge.png" alt="device-selector-win-edge.png" width="70" /> as selected device, delete the previous query from the editor window and execute the new query:


```shell
this_peerid();
```


This should output the string `"PI-EDGE"` which is the id of your Raspberry Pi edge device. 

Also note that SA Engine instance on the Raspberry Pi should confirm in your SSH session that it ran the query `this_peerid()`. 

```shell
2021-10-18T14:38:32.392 Running query 1: this_peerid();
2021-10-18T14:38:32.444 Query 1 finished
```

Now we have verified that your Raspberry Pi is connected to the server, and that it can run queries retrieved from the server.


## Deploy and run a model

Now that you have tested that you can execute queries on the Raspberry Pi edge device it is time to deploy a simple model. Our model will be a simple mathematical transform that converts temperature values from Celsius to Farenheit. First we will create the model and save it on our server. Then we will deploy it to the edge and run it.

**1.** Right click on "User models" and then select "Create new model".

![add-user-model.png](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/add-user-model2.png "add-user-model2.png")

**2.** Write the model name "my_ctof" in the dialog that appears and click "Ok".

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/new-model-dialog2.png" alt="new-model-dialog2.png" style="width:100%"/>

This creates a new folder "my_ctof" with three files.

![sa-studio-osql-editor-user-models-my-ctof.png](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-user-models-my-ctof.png "sa-studio-osql-editor-user-models-my-ctof.png")

**3.** Click on the `master.osql` file and add the following to the file by pasting it into the editor window:

```sql
create function ctof(Number c) -> Number
  /* Convert a Celsius degree `c` to Fahrenheit */ 
  as c * 9 / 5 + 32;
```

**4.** Save the file by clicking the ![Save](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/save-icon.png "Save") icon in the top right corner (or pressing `Ctrl-s`).

Unsaved files are marked in the editor tab with an aterisk `*` next to its name. When you save the file the asterisk disappears.

**5.** Verify that `my_ctof` has been added to your models by running the `user_models();` query in a new OSQL tab. The steps for running a query in a new tab is:

   1. Click the plus sign in the top right corner and select "New OSQL tab".

![sa-studio-osql-editor-new-osql-tab.png](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/sa-studio-osql-editor-new-osql-tab.png "sa-studio-osql-editor-new-osql-tab.png")

   2. Ensure that you have selected the correct device (now it should be set to <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" />).

   3. Write the query (`user_models();`) in the editor tab.

   4. Run the query with the ![Run queries](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/run-queries-icon.png "Run queries") icon in the bottom left corner.

The output should include `"my_ctof"`.

**6.** Now you can deploy the model by running the following query (on the <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" />):

```shell
deploy_model(["pi-edge"],"my_ctof");
```

The edge device answers with its peer id (`"PI-EDGE"`) when the model has been deployed. Note that the SA Engine instance confirmes that the model was loaded in the Raspberry Pi SSH session.

```shell
2021-11-08T10:33:33.306 Running query 2: _download_commit_model('my_ctof')
Reading OSQL statements from "/home/pi/SA/models/my_ctof/master.osql"
2021-11-08T10:33:36.930 Query 2 finished
2021-11-08T10:33:36.932 Terminating coroutines for 2
2021-11-08T10:33:36.932 Query 2 cancelled
2021-11-08T10:33:36.950 Query 2 cancelled
```

**7.** Now you can run the model on the edge by simply changing device to <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/device-selector-pi-edge.png" alt="device-selector-win-edge.png" width="70" /> and run the following query:

```shell
ctof(32);
```

You should get the result `89.6` from your edge device. 

**8.** You can also ship queries to edges from the server by using the built-in function `edge_cq(Charstring edge, Charstring query)` which evaluates `query` on `edge`.

Try this by first ensuring that you have selected <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-win-edge/device-selector.png" alt="device-selector.png" width="60" /> as your device and run the following query: 

```shell
edge_cq('pi-edge', 'ctof(72)');
```

You should get the result `161.6` from your edge device.

## Get a stream of readings from the temperature sensor.
On a Raspberry Pi you can access the temperature reading by the file `/sys/class/thermal/thermal_zone0/temp`. Each reading is in `celsius * 1000`

To get a stream of temperature readings you can use the `csv:file_stream` function with `"loop"` as option.


```
edge_cq("pi-edge", "
        csv:file_stream('/sys/class/thermal/thermal_zone0/temp', 'loop',0.1)/1000
        ");;
```


<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/pi_read_sensor_csv.png" alt="pi_read_sensor_csv.png" style="width:100%" />


You are now looking at a stream of temperature readings from the internal sensor on the CPU.

## Defining a signal of the temperature sensor.

To wrap this up, let's add some meta-data to `my_ctof` model that contains the necessary steps to add the 
temperature sensor as a signal in sa.engine. Copy the following OSQL-statements and paste them into the `master.osql` file for the model **my_ctof**:

```
create Signal (name, doc) instances
 ("CPU_temp", "Temperature reading from the CPU tempereature sensor");
 
set ts_signal_stream(signal_named("CPU_temp")) =
  (select stream of ts(temp)
    from Number temp
   where [temp] in csv:file_stream('/sys/class/thermal/thermal_zone0/temp', 
                                   'loop',0.1)/1000);
```

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-model-with-metadata.png" alt="sa-studio-model-with-metadata.png" style="width:100%" />


Save the file and then re-deploy the model to `pi-edge`:

```
deploy_model(["pi-edge"],"my_ctof");
```

If you call the function `signals()` on the Raspberry pi now you will see that we have a signal called `CPU_temp` defined:

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-osql-editor-signals-pi-edge.png" alt="sa-studio-osql-editor-signals-pi-edge.png" />


You can now get a stream of the temperature signal by running:

```
edge_cq('pi-edge', 'signal_stream("CPU_temp")');
```

<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-osql-editor-signal-stream-temp-pi-edge.png" alt="sa-studio-osql-editor-signal-stream-temp-pi-edge.png"  />



To get a stream of readings in Fahrenheit simply apply the function `ctof` to each number in the signal stream:

```
edge_cq('pi-edge', '
          select ctof(c) 
            from Number c 
           where c in signal_stream("CPU_temp")
        ');
```
<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/getting-started-guides/community-edition-pi-edge/sa-studio-osql-editor-signal-stream-f-temp-pi-edge.png" alt="sa-studio-osql-editor-signal-stream-f-temp-pi-edge.png"  />



## Conclusion

Congratulations! You have now deployed your first model to a Raspberry Pi edge device and used it on the built in CPU temperature sensor.

Where to go from here:
> [live-only] * Use the [documentation](/docs) to learn more about OSQL and how you can build models and interact with edge devices.

> [static-only] * Use the [documentation](http://docs.streamanalyze.com/) to learn more about OSQL and how you can build models and interact with edge devices.
