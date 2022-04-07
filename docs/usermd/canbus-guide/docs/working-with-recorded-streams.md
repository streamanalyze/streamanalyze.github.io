# Working with recorded streams

When creating data analysis models it is preferable to work on recorded data in a laboratory setting rather than live data from a real vehicle. With the SA Engine CAN bus wrapper you can use CAN data recorded on the popular socketCAN format. And when your model is ready for production it is easy to switch data source from the recorded data to the real CAN bus.

>[note] **Note:** Ensure that you go through the steps in the [Importing DBC files](/DL/docs/usermd/canbus-guide/docs/importing-dbc-files.md) before continuing. It will import the DBC file and setup the signals needed for this guide.


## Changing the CAN data source

The default behavior for SA Engine CANBUS data wrapper model is to use `can:simulated_bus` to produce a random raw CANBUS stream for `can:signal_bus`, `can:signal_stream` and `can:ts_signal_stream`.

We can change the CAN signal stream to instead read CAN frames from a file. This guide comes with a recorded CAN data file `j1939-can-data.log` (socketCAN format) containing frames that can be decoded with the provided `j1939.dbc` DBC file.

`j1939-can-data.log`:
```
(1578926829.816750) can0 0CF00400#697E8C1C3500F48D
(1578926829.826750) can0 0CF00400#297D87F23400F487
(1578926829.836800) can0 0CF00400#197D83B73400F483
(1578926829.846750) can0 0CF00400#097D7F6A3400F47F
(1578926829.856850) can0 0CF00400#097D7D133400F47D
(1578926829.867200) can0 0CF00400#097D7DAC3300F47D
(1578926829.868950) can0 18FEF100#C300134000000030
(1578926829.876850) can0 0CF00400#017D7D3D3300F47D
...
```

To set the recorded file as the CAN data source we create a wrapper function that calls a CAN data file reader.

```LIVE
create function j1939_can_data_stream() -> Stream of Vector
  as can:playback_socketcan(sa_home() +
        'models/canbus-guide/j1939-can-data.log');
```

Then we need to set the CAN data source to run this function (in fact, any function with return type `Stream of Vector` can be used to simulate a CAN bus).

```LIVE
set bus(typenamed("can:signal")) = #'j1939_can_data_stream';
```

Now we can verify that the CAN data is streamed from the recorded file by reading the "EEC1_EngineSpeed" and "CCVS1_WheelBasedVehicleSpeed" signals from the CAN data stream.

```LIVE
can:signal_bus(["EEC1_EngineSpeed", "CCVS1_WheelBasedVehicleSpeed"]);
```

We see that the recorded file contains readings for engine speed and vehicle speed over a few seconds time period.

To get the signal measurements on vector format we can use `can:ts_signal_stream()` to read the CAN bus.

```LIVE
can:ts_signal_stream(["EEC1_EngineSpeed", "CCVS1_WheelBasedVehicleSpeed"]);
```
