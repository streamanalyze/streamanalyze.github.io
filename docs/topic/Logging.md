# Logging functions:

> [function]console_logger(Boolean flag)->Boolean

> [function-docs]
> Print log messages on server console 



___

> [function]create_log_file(Charstring file)->Charstring

> [function-docs]
> Create `file` in current log directory 



___

> [function]delete_log_file(Charstring file)->Charstring

> [function-docs]
> Delete `file` in log directory 



___

> [function]file_stream(Charstring kind,Charstring file,Charstring option)->Stream

> [function-docs]
> Stream tuples from log `file` in format `kind` (`json` or `csv`).
>      `option` can be 'read', 'tail', or 'loop'



___

> [function]file_stream(Charstring kind,Charstring file,Charstring option,Number pace)
           ->Stream

> [function-docs]
> Playback log `file` in format `kind` (`json` or `csv`)
>      at `pace` in seconds.
>      `option` can be 'read', 'tail', or 'loop' 



___

> [function]file_stream(Charstring kind,Charstring file)->Stream

> [function-docs]
> Stream tuples from log `file` in format `kind` (`json` or `csv`) 



___

> [function]log_directory(Charstring dir)->Charstring

> [function-docs]
> Change current log directory to `dir` 



___

> [function]log_directory()->Charstring

> [function-docs]
> The current log directory where log files are located 



___

> [function]log_filename(Charstring file)->Charstring

> [function-docs]
> The full path of `file` in current log directory 



___

> [function]stream_logger(Stream s,Charstring kind,Charstring file,Charstring option)
             ->Stream

> [function-docs]
> Write records in stream `s` into log `file` 
>      in format `kind` (`json` or `csv`).
>      `option` can be: 
>               `new` if old log `file` is overwritten, or
>               `append` if old log `file` is extended  



___

> [function]write_logfile(Charstring kind,Charstring file,Stream s)->Charstring

> [function-docs]
> Write elements in stream `s` into new log `file` 
>      in format `kind` (`json` or `csv`) 


