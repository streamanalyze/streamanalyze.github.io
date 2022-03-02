# Getting started

This section describes how to do inference with a simple Tensorflow Lite model. 

## Loading the Tensorflow Lite plugin

The Tensorflow Lite plugin is not a part of the base system and needs to be loaded into SA Engine. Load the plugin by running the following query.

```LIVE
loadsystem(startup_dir() + "../extenders/tflite","tflite.osql");
```

## The model

The first model we use is a simple linear regression model that predicts the fuel efficiency (miles per gallon, MPG) for cars based on the vehicle's horsepower.

The model was trained and downloaded from the [linear regression with one variable tutorial](https://www.tensorflow.org/tutorials/keras/regression#linear_regression_with_one_variable) on the official Tensorflow site.

It takes an input tensor with a single value (horsepower) and produces a single-valued ouptput tensor (predicted miles per gallon).

$$[X] \rightarrow [Y]$$

The image below shows the model's training data points and resulting regression line.

![Linear regression model](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/tensorflow_lite_tutorial/horsepower_model_plot.png)

We see, for example, that for cars with around 50 horsepowers the model should predict an MPG around 30, and for cars with around 150 horsepowers the model should predict an MPG around 15.


## Loading the model

Ensure that you are in the correct directory by changing to the tutorial dir.

```LIVE
cd(sa_home() + "/models/tensorflow-lite-tutorial");
```

Load the model with `tfl:read_binary_file` and store the result in the `tfl:model` table.   

```LIVE
set tfl:model('horsepower') =
    tfl:read_binary_file("models/horsepower_model.tflite");
```


## Inference

Inference is done with the function `tfl:predict`.

```
tfl:predict(Charstring name,
            Stream of Vector of Vector of Number s)
  -> Stream of Vector of Vector of Vector of Number
```

The string `name` is the name we provided in the previous step when we loaded the TFL model. The model input is a tensor (in this case only containing a single value). The input tensor is wrapped in a batch vector. You can run multiple predictions at once by putting more than one input tensor in the batch vector, but we will cover batch runs later in this tutorial. And finally the batch vector is wrapped in a stream `s` and passed to `tfl:predict`.

The output of `tfl:predict` is a stream, so to get the value we wrap the query in a call to `extract`. Run the prediction by executing the following query.

```LIVE
roundto(extract(tfl:predict('horsepower', streamof([[180]]))), 2);
```

The query should produce the following result.

```
[[[9.93]]]
```

This means that the linear regression model predicts that a vehicle with 180 horsepowers has a fuel efficiency of approximately 9.93 miles per gallon.


## Input and output formats

As we mentioned, the input parameter `s` in `tfl:predict` is a stream of batches $\mathbf{b}$ of $N$ input tensors $\mathbf{v_i}$, where $N$ is the number of predictions (one prediction for each input tensor).

$$s = \text{streamof}\left( \mathbf{b} \right), \,\, where \,\, \mathbf{b} = \begin{bmatrix}
\mathbf{v_1} \\
\mathbf{v_2} \\
\vdots \\
\mathbf{v_N}
\end{bmatrix}$$

> [note] **Note:** `tfl:predict` currently only supports Tensorflow Lite models with a single input tensor.

> [exercise] In the example the input to the horsepower model was a single-valued tensor, which we represented with a vector `[180]`. We only wanted to run a single prediction, so our batch $\mathbf{b}$ only contained a single vector and the input parameter `s` was set to `streamof([[180]])`.

The output format is a stream of output batches. Each output batch $\mathbf{b}'$ is a vector of $N$ output vectors $\mathbf{v_i}'$ (one for each input vector $\mathbf{v_i}$) and, since a TFL model can have multiple output tensors, each output vector $\mathbf{v_i}'$ contains $M$ output tensors $\mathbf{t_{ij}}$, one for each output tensor in the model.

$$ \mathbf{b}' = \begin{bmatrix}
\mathbf{v_1}' \\
\mathbf{v_2}' \\
\vdots \\
\mathbf{v_N}'
\end{bmatrix}, \,\, \text{where} \,\, \mathbf{v_i}' = \begin{bmatrix}
\mathbf{t_{i1}} \\
\mathbf{t_{i2}} \\
\vdots \\
\mathbf{t_{iM}}
\end{bmatrix}
$$

> [exercise] In the example above the input vector `[180]` produced an output vector `[[9.93]]` containing a single tensor `[9.93]` as prediction result. And since the input batch only contained one input tensor, the output vector was the only element in the output batch `[[[9.93]]]`.


## Batch predictions

As mentioned above, `tfl:predict` can do prediction in batches. This reduces the amount of setup and tear down the plugin needs to do compared to if the same number of predictions were carried out by sequential calls to `tfl:predict`.

To do a batch prediction, simply provide more than one input tensor when calling `tfl:predict`. The following query predicts the MPG for two vehicles with 180 and 50 horsepowers using the horsepower model.

```LIVE
roundto(extract(tfl:predict('horsepower', streamof([[180], [50]]))), 2);
```

Executing the query should produce the following result since now we have two output vectors in the result (with one output tensor each).

```
[[[9.93]], [[31.86]]]
```

## Predictions from stream of data

We have previously used the method `streamof` to produce input to `tfl:predict` from hardcoded data. Just to show that prediction can be done on streams coming from other data sources we can simulate a regular stream of horsepowers by using the `simstream` function.

To run the horsepower model on a stream of simulated horsepower values we first create a function that generates a stream of values between 50 and 200 emitted every tenth of a second.

```LIVE
create function horsepower_stream()
  -> Stream of vector of vector of number
as select Stream of [[h]]
     from number h, number x
    where x in abs(simstream(0.1))*100
      and h = min(max(x, 50), 200);
```

Now we can simply use the function as input to `tfl:predict`.

```LIVE
extract(tfl:predict('horsepower', horsepower_stream()));
```

The result should be a stream of MPG values predicted from the horsepower values produced by `horsepower_stream`.

```
[[[31.8575820922852]]]
[[[31.8575820922852]]]
[[[31.8575820922852]]]
[[[31.8575820922852]]]
[[[26.6167335510254]]]
[[[22.4122943878174]]]
[[[31.8575820922852]]]
[[[31.8575820922852]]]
[[[26.1537971496582]]]
[[[7.09315490722656]]]
...
```
