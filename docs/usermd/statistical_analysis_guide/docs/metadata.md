# Create a meta data model for the dataset.

Before we start working with the data it is always a good idea to set up some metadata about the dataset. This section will go through the OSQL inside `metadata.osql` and walk you through each function definition in it.

> [tip]**Tip:** This section has a lot of details in it. What it goes through is the definition of utility functions for this work flow.
> If you are OK with not knowing 100% of all the details and want to get to the results faster you can skip this page.

## Class name

First off it's usually beneficial to create a function that maps from a number to class name. This way it's easy to represent the classes on a nominal scale. The function `class_name` does just that.

```OSQL
create function class_name(Number i) -> Charstring
/* Function that stores the class name for class `i` */
  as stored;

create function class_index(Charstring class) -> Number 
/* Convencience function, inverse of class name */
    as inverse of class_name;
```

## Label

Just as it's convenient to be able to represent a class as a number it is convenient to have a mapping from the index on which a dimension is. The function `label` stores the name of the dimension on the i:th index in every datapoint.

```OSQL
create function label(Number i) -> Charstring
/* Function that stores the label for dimension `i` */
  as stored;
```

## Class file

To avoid having to type each file in full when working a nice function to have is one that maps a class number to the set of files containing that class. If several files are used you can `sample` x number of files from it for training and use the rest for testing etc. as well.

```OSQL
create function class_file(Number i) -> Bag of Charstring
/* Function to store file name for class `i` */
  as stored;

create function test_class_file(Number i) -> Bag of Charstring
/* Functio nto store file name for test data of class `i` */
  as stored;


```

## Stored stats

This function will be used to store statistics about each dimension for each class. Each statistics vector will contain `[mean, standard deviation, min, max, cnt]`.

```OSQL
create function stored_stats(Number class, Number dimension) -> Vector of Number;
```

## Class stream

This function will essentially create a stream of all data points of a class given the class number

```OSQL
create function class_stream(Number class) -> Stream of Vector of Number
  as json:file_stream(data_file_path()+class_file(class));
  
create function test_stream(Number class) -> Stream of Vector of Number
  as json:file_stream(data_file_path()+test_class_file(class));

create function class_stream(Number class, boolean train) -> Stream of Vector of Number
  as case when train then class_stream(class)
          else test_stream(class) end;
```

## Added the meta data to the model.

Finally now that that we have our first meta-data models let's fill the functions with some data:

```OSQL
set class_name(1) = "low_voltage";
set class_name(2) = "normal";
set class_name(3) = "object";
set class_name(4) = "obstructed";

set label(1) = "AccX";
set label(2) = "AccY";
set label(3) = "AccZ";
set label(4) = "Tach";
set label(5) = "pwm";

add class_file(1) = "streamed_fan_low_voltage_training_odr800.1vacjopm.json";
add class_file(2) = "streamed_fan_normal_training_odr800.1vace6rv.json";
add class_file(3) = "streamed_fan_object_training_odr800.1vbsq976.json";
add class_file(4) = "streamed_fan_obstructed_training_odr800.1vac7vl7.json";

add test_class_file(1) = "streamed_fan_low_voltage_test_odr800.1vb9j096.json";
add test_class_file(2) = "streamed_fan_normal_test_odr800.1vce2061.json";
add test_class_file(3) = "streamed_fan_object_test_odr800.1vb9fued.json";
add test_class_file(4) = "streamed_fan_obstructed_test_odr800.1vb9ajnj.json";

```

## Windows statistics

The `windowed_stats_1024` function will keep record of
windowed statistics for each dimension in each class:

```OSQL
create function windowed_stats_1024(Integer id, Integer class) -> Vector of Vector of Number 
  as stored;
```

## A few final convenience functions

As a final convenience we create a bunch for functions that will give us vectors of the files, class names an labels ordered on the number identifying each file/class/label.

We also add a function called tagger which will come in handy when looking at the raw data. It simply transforms a stream of `x` into a stream of `[tag,x]`. This one will come in handy in the next section.

```OSQL
/* Utility functions for the visualization */
create function vclass_names() -> Vector of Charstring
  as select vector of class_name(i)
       from Number i 
      order by i asc;

create function vlabels() -> Vector of Charstring
  as select vector of label(i)
       from Number i 
      order by i asc;

create function vfiles() -> Vector of charstring
  as select vector of class_file(i)
       from Number i
      order by i asc;

create function tagger(Object tag, Stream s) -> Stream of Vector
  as select stream of [tag,x]
       from Object x
      where x in s;

create function concat_tagger(Object tag, Stream s) -> Stream
  as select stream of concat([tag],x)
       from Vector x
      where x in s;

```