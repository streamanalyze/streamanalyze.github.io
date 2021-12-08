# Model management functions:

> [function]create_model(Charstring model)->Charstring

> [function-docs]
> Create a new user `model` 



___

> [function]deploy_model(Vector of Charstring peers,Charstring model,
            Boolean upload_from_client)->Stream of Charstring

> [function-docs]
> Install `model` on `peers` if `upload_from_client` is `true` then 
>   the model is first uploaded from the local client to the nameserver before deployment.



___

> [function]deploy_model(Vector of Charstring peers,Charstring model)->Stream of Charstring

> [function-docs]
> Install `model` on `peers` 



___

> [function]download_model(Charstring model)->Charstring name

> [function-docs]
> Download `model` to peer's database 



___

> [function]download_model_files(Charstring model)->Bag of Charstring

> [function-docs]
> Download all files in user `model` on Stream Server 



___

> [function]download_textfile(Charstring path,Charstring file)->Charstring fullpath

> [function-docs]
> Download `file` in `path` under sa_home() 



___

> [function]loadedsystem(Charstring file)->Boolean

> [function-docs]
> Is master `file` loaded? 



___

> [function]loadedsystems()->Bag of Charstring

> [function-docs]
> Table of loaded OSQL master files 



___

> [function]loaded_models()->Bag of Charstring

> [function-docs]
> The models currently in database 



___

> [function]loaded_system_models()->Bag of Charstring

> [function-docs]
> The system models currently in database 



___

> [function]loadsystem(Charstring d,Charstring file)->Charstring

> [function-docs]
> Load master `file` with OSQL commands in directory `d` 



___

> [function]load_data(Charstring model,Charstring file)->Charstring

> [function-docs]
> Load data `file` in `model` into database 



___

> [function]load_local_model(Charstring model)->Charstring

> [function-docs]
> Install local user `model` 



___

> [function]load_model(Charstring model)->Charstring

> [function-docs]
> Install user `model` on Stream Server 



___

> [function]load_system_model(Charstring model)->Charstring

> [function-docs]
> Load system model named `model` 



___

> [function]migrate_database(Charstring model,Charstring file)->Charstring

> [function-docs]
> Migrate unloaded database in `file` of `model`
>      to current database schema 



___

> [function]model_folder(Charstring model)->Charstring

> [function-docs]
> The folder of user defined `model` 



___

> [function]model_functions(Charstring model)->Bag of Function

> [function-docs]
> Functions belonging to `model` 



___

> [function]send_textfile_to_peer(Charstring peer,Charstring file)->Charstring fullpath



___

> [function]server_user_model_files(Charstring model)->Bag of (Charstring,Charstring)

> [function-docs]
> The user `model` files on Stream Server 



___

> [function]system_model_file(Charstring filename)->Charstring

> [function-docs]
> Get the full file name of a system model file 



___

> [function]system_model_folder(Charstring model)->Charstring

> [function-docs]
> The folder of system defined `model` 



___

> [function]system_model_folder()->Charstring

> [function-docs]
> Get the full path name of system model file folder 



___

> [function]unload_database(Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload current user database to `file` in `model` 



___

> [function]unload_schema(Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload user `model` into OSQL `file` script 



___

> [function]upload_folder_to_server(Charstring peer,Charstring subfolder_on_server,
                       Charstring model)->Bag of Charstring



___

> [function]user_models()->Bag of Charstring

> [function-docs]
> The current user defined models 



___

> [function]user_model_files(Charstring model)->Bag of (Charstring,Charstring)

> [function-docs]
> Relative paths to all files in user `model` 



___

> [function]user_model_folder()->Charstring

> [function-docs]
> This user's model folder 


