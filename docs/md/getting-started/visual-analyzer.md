# sa.studio

Download sa.engine from [https://download.streamanalyze.com](https://download.streamanalyze.com/) and follow the instructions there.

**Notice** that your default browser should preferably be Chrome for sa.studio to work correctly. 

Once sa.engine is installed you can start sa.studio by clicking on the icon <img src="/docs/images/sa.engine.png" height="40">. The following icons will appear in a new browser window:

<img src="/docs/images/revl.png">

Each icon, except the first **Blank** one, shows an example **OSQL** (Object Stream Query Language) expression for getting started.

The button **Blank** <img src="/docs/images/blank.png" height="30"> provides an empty screen where you can enter your own expressions for evaluation.

## Example Continuous Queries

To get a feeling for what you can do with sa.studio you should follow the instructions after clicking on each of the buttons **Numerical**, **Heartbeat**, **Line Plot**, **Simstream**, **Marker**, **Stops**, and **Sim FFT**.

__Numerical Expressions__

First open the query **Numerical**. The following numerical expression is already entered there as the first example:
```LIVE
1+sin(3.14)
```
Click the **play** button <img src="/docs/images/play.png" height="30"> and the result of evaluating the expression is displayed as output. You can switch between the current input and output by clicking the **Input** or **Output** buttons <img src="/docs/images/io.png" height="30">.

There is a library of math functions in sa.engine which you can use in numerical expressions. You can evaluate new expressions by clicking on the **Input** button and replacing `1+sin(2)` with some other expression. Try to cut-and-paste the expressions below into the input display and evaluate using the **play** button:
```LIVE {"vis":"showText"}
1+2*sqrt(4);

sin(3.2)+ln(2.1);

max(1,2)
```
Now you know the basic idea with sa.studio so continue with the other buttons. Click the cross <img src="/docs/images/cross.png" height="30"> in the tab  of the current display to close it.

__Heartbeat__

This example illustrates a call to a **continuous query** (CQ) by calling the function `heartbeat(period)` that returns the time spent from its start in seconds every `period` seconds. 

The example query **Heartbeat** is the statement:
```LIVE {"vis":"showText"}
heartbeat(1)
```
Since `heartbeat` returns an infinite stream of number it will run until you terminate it by pressing the stop button 
<img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/docs/stop.png" height="30">.

As another CQ you can concatenate a string with each heartbeat element by evaluating:
```LIVE
"Hello Streaming World " + heartbeat(1)
```
That was your first CQs. They are used in the first example app for Android in [sa.android SDK](../sa-android-sdk.md).


__Line plot__

The query **Line plot** applies the sine function on the elements in a `heartbeat` stream:
```LIVE automatic
sin(heartbeat(0.02))
```
With sa.studio you can choose among different ways of visualizing the result of a query in real-time by the **visualization method** button <img src="/docs/images/automatic.png" height="30"> to the right. Here the selected visualization method is **Automatic**  meaning that the actual visualization method is chosen by the system.  The automatic visualization method for streams of numbers, as in this case, is **Line plot**. The line plot visualization utilizes [D3.js](https://d3js.org/) for the real-time rendering.

You may may override the chosen visualization method by clicking the visualization button and select some other method. For example, try changing it to  **Text** <img src="/docs/images/text.png" height="30"> and see what happens. 


__Simstream__

Complex simulated real-time streams can be produced by applying a combination of sine computations over a `heartbeat()` stream. The built-in function `simstream(period)` is an example of such a function that simulates a mix of measurements by combining sine functions and emitting result every `period` seconds. The query **Simstream** illustrates this:
```LIVE automatic
simstream(0.02)
```
Simulated streams are very useful for testing real-time stream models, since they can be used with no physically connected sensors.

__Marker__

sa.engine visualizers can visualize the result of a CQ using web-based visualization tools, as illustrated by query **Marker** where a recorded stream in a system file `data/bus.csv` of geopositions of a moving vehicle is played back 10 times per second and visualized using [Google Maps](https://developers.google.com/maps/):
```LIVE
geo_location(csv:file_stream(system_model_file('data/bus.csv'), 'read', 0.1))
```
The function `system_model('data/bus.csv')` locates the system file `data/bus.csv`, and `geo_location(v)` converts a position vector `v` to the corresponding Google Maps location object.

Try changing the visualization method to **Circles** or **Text**.

__Stops__

The query **Stops** illustrates the use of a simple real-time model to infer when a vehicle has stopped or slowed down significantly. The example uses a recorded stream of GPS positions of a car and the result of the model is visualized by [Google Maps](https://developers.google.com/maps/). 

Try changing the visualization method to **Marker** or **Text**.

__Sim FFT__

The system is quite capable of doing complex computations over numerical data streams in real-time, as illustrated by query **Sim FFT** where the Fast Fourier Transform over a stream is visualized in real-time as bar charts using [D3.js](https://d3js.org/). This example will be further explained in section [Streams](../tutorial/streams.md).
