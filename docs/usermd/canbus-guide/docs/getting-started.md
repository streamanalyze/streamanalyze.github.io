# Getting started

## CAN bus basics

A Controller Area Network (CAN bus) is a robust vehicle bus standard designed to allow microcontrollers and devices to communicate with each other's applications without a host computer.

It is a message-based protocol, where each message is a *frame* containing a *CAN bus identifier*, *frame identifier* and *payload*. The CAN bus identifier tells which CAN bus interface was used to produce the frame. The frame identifier tells which message the frame represents (can vary between different CAN bus interfaces). The payload contains the values of one or several measurements.

### DBC files

A CAN DBC file (CAN database) is a text file that contains information for decoding raw CAN bus data to 'physical values'.

There are some standard DBC formats, e.g., J1939 DBC for heavy-duty vehicles, that enables decoding of data across vehicle brands and models.

For example, raw CAN data from a truck could look something like this:

```
CAN ID    Data bytes
0CF00400  FF FF FF 68 13 FF FF FF
```

A CAN DBC with the decoding rules for the CAN ID can "extract" the signals from the data bytes. One such signal could be EngineSpeed:

```
Message  Signal       Value  Unit
EEC1     EngineSpeed  621    rpm
```

See [https://www.csselectronics.com/pages/can-dbc-file-database-intro](https://www.csselectronics.com/pages/can-dbc-file-database-intro) for a more detailed description of DBC files.


## Guide prerequisites

SA Engine has a data stream wrapper for CAN bus data streams. This guide assumes that the reader is familiar with the [Data stream wrappers](/docs/md/tutorial/data-stream-wrappers.md) section of the SA Engine documentation.

The SA Engine CANBUS data stream wraper comes with a few useful functions that will be used throughout this guide.

* `can:signal` - An object type representing a CAN signal.
* `can:channel` - An object type representing a CAN bus channel.
* `can:simulated_bus()` - Produces a random raw CAN bus stream at 10Hz.
* `can:signal_bus()` - Outputs a stream of measurements from a given set of signals (in timestamp-name-value triplets), called a *bus stream*.
* `can:signal_stream()` - Outputs a stream of vectors with measurements from a given set of signals, called a *signal stream*.
* `can:ts_signal_stream()` - Outputs a timestamped signal stream.
* `can:import_dbc()` - Import a CAN DBC file.

Other useful standard functions.

* `signals()` - Lists the names of all signals.

