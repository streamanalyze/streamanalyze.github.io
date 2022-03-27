# Working with the CAN bus

>[note] **NOTE:** To run the examples here, you need a computer with support for `vcan`, which is is provided with Linux socketcan and Linux can-utils.

In the chapter [Working with recorded streams](/DL/docs/usermd/canbus-guide/docs/working-with-recorded-streams.md) we described how to read recorded CAN bus signals from a file. To read from the actual CAN bus you need to do a few adjustments.

**1.** Set up your CAN channels. This depends on what CAN bus reader you have on your device, but here is how to do it for `vcan0` and `vcan1`.

```OSQL
create can:channel(id, name, buffer_size, timeout) instances
    (1, "vcan0", 130112, 0.5),
    (2, "vcan1", 130112, 0.5);
```

**2.** Redirect the signal bus to read from the CAN bus.

```OSQL
set bus(thetype("can:signal")) = #'canbus_rx_bg';
```

And that is it. Now any call to either `can:signal_bus()`, `can:signal_stream()` or `can:ts_signal_stream()` will read signals from the CAN bus.

## Use canplayer to send frames on the CAN bus

You can use [canplayer](https://manpages.ubuntu.com/manpages/jammy/man1/canplayer.1.html), which is included in Linux can-utils, to both record from and send frames to the CAN bus. This can help you verify that your model is actually reading from the CAN bus and that the model works as intended.

To send recorded frames to the CAN bus with canplayer you simply run

```shell
$ cat j1939-can-data.log | canplayer vcan0=can0
```

which tells canplayer to send the contents of the file `j139-can-data.log` on the CAN bus and send frames received from `can0` to `vcan0`, where `vcan0` is a channel you have created with `can:channel()`.

