# Regression with deep neural network (DNN)

In this section we will show how to make predictions with a deep neural network (DNN).

## The DNN model

The model we use is a deep neural network that predicts the fuel efficiency (miles per gallon, MPG). It is similar to the model in the previous section but it takes multiple input values and has some hidden layers.

The model was trained and downloaded from the [regression with a deep neural network tutorial](https://www.tensorflow.org/tutorials/keras/regression#regression_with_a_deep_neural_network_dnn) on the official Tensorflow site.

It takes an input tensor with nine values (cylinders, displacement, horsepower, weight, acceleration, model year, Europe, Japan, and USA) and produces a single-valued ouptput tensor (miles per gallon).

$$[X_{1}, X_{2}, \ldots, X_{9}] \rightarrow [Y]$$

## Loading the model

Ensure that you are in the correct directory by changing to the tutorial dir.

```LIVE
cd(sa_home() + "/models/tensorflow-lite-tutorial");
```

Load the model with `tfl:read_binary_file` and store the result in the `tfl:model` table.   

```LIVE
set tfl:model('dnn_model') =
    tfl:read_binary_file("models/dnn_model.tflite");
```

## Inference

As described in the previous section, inference is done with the function `tfl:predict`. It takes the name of the model and a stream of batch inputs as input parameters.

So to use the DNN model for inference, simply run `tfl:predict` with the the model name and some vehicle data as input vectors. 

In this example we want to predict MPG for two vehicles with the following stats:

| Car        | Cylinders   | Displacement | Horsepower | Weight | Acceleration | Model year | Europe | Japan | USA |
| ---------- | ----------- | ------------ | ---------- | ------ | ------------ | ---------- | ------ | ----- | --- |
| #1         | 8           | 390.0        | 190.0      | 3850.0 | 8.5          | 70         | 0      | 0     | 1   |
| #2         | 8           | 360.0        | 215.0      | 4615.0 | 14.0         | 70         | 0      | 0     | 1   |


To do this we simply make a vector of stats for each car and put the vectors in a batch vector and pass it as a stream into `tfl:predict`.

```LIVE
roundto(extract(tfl:predict('dnn_model',
          streamof([[8, 390.0, 190.0, 3850.0, 8.5, 70, 0, 0, 1],
                    [8, 360.0, 215.0, 4615.0, 14.0, 70, 0, 0, 1]]))), 2);
```

The predictions should produce the following result.

```
[[[15.12]], [[11]]]
```

This means that the regression model predicts that "Car #1" has a fuel efficiency of approximately 15.12 MPG and "Car #2" has a fuel efficiency of approximately 11.0 MPG.
