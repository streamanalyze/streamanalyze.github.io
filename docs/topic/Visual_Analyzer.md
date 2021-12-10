# Visual Analyzer functions:

> [function]
> va(Charstring connection,Charstring server)->Boolean

> [function-docs]
> Run the Visual Analyzer on port 3001 



___

> [function]
> va()->Boolean

> [function-docs]
> Run the Visual Analyzer on port 3001 



___

> [function]
> va_options()->Record

> [function-docs]
> Stored options for the visual analyzer default is none.
> The record may contain the following options:
>   `auth` - Boolean, enable login on the visual analyzer. Add users to the 
>            visual analyzer with the function 
>            `_va_create_user(Charstring user, Charstring pw)`
>   `port` - Number, the portnumber for http access to the visual analyzer
>   `server` - Charstring, name of default sa.engine server connected to the 
>              nameserver to send queries to.
>   `ca` - Charstring, path to certificate authority (.crt) file used for https 
>          access
>   `key` - Charstring, path to private key file (.key) to use for https access
>   `cert` - Charstring, path to certificate file (.crt) for the private key
>            to use for https access
>   `httpsPort` - Number port to use for https access, if https is enabled http
>                 port will redirect to this port.
>   All of the https options must be set for https to be enabled. 



___

> [function]
> ws()->Boolean

> [function-docs]
> Start a Stream Server and web server, but no browser 


