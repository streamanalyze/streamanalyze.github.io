# Java interface

> [function]
> audio(Number windowsize,Number samplerate)->Stream of Vector of Number

> [function-docs]
> Reads from the computer microphone. Supported sample rates differs on 
>      different systems byt should always be one of the following: 
>      8000, 16000, 22050, 44100. 
>      Each datapoint is normalized between -1 and 1 



___

> [function]
> enable_java()->Bag of Charstring

> [function-docs]
> Connect to Java Runtime Environment in environment variable JAVA_HOME or
>      sa.engine/jre folder 



___

> [function]
> ips()->Bag of (Charstring,Charstring,Charstring)

> [function-docs]
> Get a list of all interfaces, their ip version and their address 



___

> [function]
> ipv4s()->Bag of (Charstring,Charstring,Charstring)



___

> [function]
> ipv4_network_interfaces()->Bag of (Charstring,Charstring,Charstring)



___

> [function]
> ipv6s()->Bag of (Charstring,Charstring,Charstring)



___

> [function]
> ipv6_network_interfaces()->Bag of (Charstring,Charstring,Charstring)



___

> [function]
> javagc()->Boolean

> [function-docs]
> Call Java's garbage collector 



___

> [function]
> java_grab_url(Charstring url)->Charstring

> [function-docs]
> Send a get request to url expecting a json response.



___

> [function]
> network_interfaces()->Bag of (Charstring,Charstring,Charstring)



___

> [function]
> output_audio(Stream of Vector windows,Number buffersize,Number samplerage)
            ->Boolean



___

> [function]
> readintensityimage(Charstring filename,Integer size)->Matrix



___

> [function]
> readintensityimage(Charstring filename)->Matrix



___

> [function]
> readintensityimage(Charstring filename,Integer width,Integer height)->Matrix



___

> [function]
> test_engine()->Charstring



___

> [function]
> test_java()->Charstring



___

> [function]
> writeintensityimage(Charstring filename,Matrix img)->Charstring


