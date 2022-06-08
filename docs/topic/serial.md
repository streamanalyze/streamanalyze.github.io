# serial

> [function]
> serial:streamer(Charstring serial_port,Integer baud_rate,Integer start_byte,
               Integer stop_byte,Integer data_len)->Stream of Binary

> [function-docs]
> 
> Get a stream of binary from a serial port named `serial_port`.
> The streamer works by looking for `start_byte` in the serial stream, when it
> finds a `start_byte` it will look `data_len+1` bytes ahead to check if it is
> a `stop_byte`. If this is the case the `data_len` bytes between `start_byte`
> and `stop_byte is emitted.
> 
> Example binary stream for `serial:sreamer("COM8",115200,0x55,0xAA,8)`:
> ```
>  Start byte                               Stop byte
>  |                                            |
> 0x55 0x01 0x02 0x03 0x04 0x05 0x06 0x07 0x08 0xAA
>       |                                  |
>       |---------- 8 bytes of data -------| 
> ```
> You can use `unpack` to get individual numbers from the binary object.
> 


