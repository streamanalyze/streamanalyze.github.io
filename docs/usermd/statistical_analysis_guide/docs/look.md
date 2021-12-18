# Looking at the data

Now that we have the data on a more suitable format for streaming we can look at the raw dataset in a set of line plots using [Multi plot](/docs/md/vis/multiplot). Multi plot is a very powerful way for customizing the visualizations. Essentially you customize the visualization by providing a visualization record in the stream. There are some helper functions for this under the name space `multiplot:`. One of them is `multiplot:tagged_lineplots` which will take a stream of `[tag, value]` and create a grid of Line plots each plotting on tag.

Below is a query to view all of the raw datasets as a Line plot grid.

```LIVE {"vis":"automatic"}
// Warning this will take some time to render, it will read transfer and
// render around 13 000 000 points.           
multiplot:tagged_lineplots([1,2,3,4],vclass_names(),vlabels(),1,300);
merge_streams(select s from Stream s, Number i
               where s = tagger(i, winagg(class_stream(i),50000,50000)))
```

Below is  a screen shot of the final result:

![Line plots](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/stat_analysis/line_plots_raw.png)

Looking at this data it is obvious that the variance of the accelerometer is greatly affected by an object being shoved in the fan. Other than that it is hard to till of there are any patterns in the data set. There are some peaks here and there but those could just as well be from a bump in the table where the test rig was standing while recording. Further exploration is necessary in order to understand this dataset.

Since this dataset is roughly 13 000 000 data points a full sweep of all data points does take quite a while. A good place to start when exploring the data is then to create some statistics over the whole data set and in windows over the stream in order to reason out if there are any patterns we can find. The next section will go through how this is done.