# Model management
**TODO: Introduction remains to be written!**
> [function]
> aws_cf:available(Record repo)->Bag of Charstring m



___

> [function]
> aws_cf:url_generator(Charstring name,Record repo,Charstring model,
                    Charstring version)->Charstring



___

> [function]
> create_model(Charstring model)->Charstring

> [function-docs]
> Create a new user `model` 



___

> [function]
> deploy_model(Vector of Charstring peers,Charstring model,
            Boolean upload_from_client)->Stream of Charstring

> [function-docs]
> Install `model` on `peers` if `upload_from_client` is `true` then 
>   the model is first uploaded from the local client to the nameserver before deployment.



___

> [function]
> deploy_model(Vector of Charstring peers,Charstring model)->Stream of Charstring

> [function-docs]
> Install `model` on `peers` 



___

> [function]
> download_model(Charstring model)->Charstring name

> [function-docs]
> Download `model` to peer's database 



___

> [function]
> download_textfile(Charstring path,Charstring file)->Charstring fullpath

> [function-docs]
> Download `file` in `path` under sa_home() 



___

> [function]
> github:url_generator(Charstring name,Record repo,Charstring model,
                    Charstring version)->Charstring



___

> [function]
> loadedsystem(Charstring file)->Boolean

> [function-docs]
> Is master `file` loaded? 



___

> [function]
> loadedsystems()->Bag of Charstring

> [function-docs]
> Table of loaded OSQL master files 



___

> [function]
> loaded_models()->Bag of Charstring

> [function-docs]
> The models currently in database 



___

> [function]
> loaded_system_models()->Bag of Charstring

> [function-docs]
> The system models currently in database 



___

> [function]
> loadsystem(Charstring d,Charstring file)->Charstring

> [function-docs]
> Load master `file` with OSQL commands in directory `d` 



___

> [function]
> load_data(Charstring model,Charstring file)->Charstring

> [function-docs]
> Load data `file` in `model` into database 



___

> [function]
> load_local_model(Charstring model)->Charstring

> [function-docs]
> Install local user `model` 



___

> [function]
> load_model(Charstring model)->Charstring

> [function-docs]
> Install user `model` on Stream Server 



___

> [function]
> load_system_model(Charstring model)->Charstring

> [function-docs]
> Load system model named `model` 



___

> [function]
> migrate_database(Charstring model,Charstring file)->Charstring

> [function-docs]
> Migrate unloaded database in `file` of `model`
>      to current database schema 



___

> [function]
> models:add_github_repo(Charstring name,Charstring organization,
                      Charstring repository,Charstring auth_token)->Boolean



___

> [function]
> models:add_official_repository(Charstring name,Charstring jwt)->Boolean



___

> [function]
> models:available()->Bag of Charstring

> [function-docs]
> Same as `models:available("default")` 



___

> [function]
> models:available(Charstring repo)->Bag of Charstring

> [function-docs]
> Get models available as `repo` 



___

> [function]
> models:create(Charstring model)->Charstring



___

> [function]
> models:create_release(Charstring model,Charstring version)->Charstring

> [function-docs]
> Create `version` of `model` - Unsigned.



___

> [function]
> models:create_release(Charstring model,Charstring version,Charstring ca_name,
                     Charstring pkey,Charstring pw)->Charstring

> [function-docs]
> Create a signed release `version` of `model` using the supplied ca private
> key and optional password for private key. 



___

> [function]
> models:get_repository_configurations()->Record



___

> [function]
> models:import(Charstring model,Charstring version)->Charstring

> [function-docs]
> same as `models:import("default",model,version)` 



___

> [function]
> models:import(Charstring repo,Charstring model,Charstring version)->Charstring

> [function-docs]
> Import `version` of `model` from **models:repository** with name `repo` 



___

> [function]
> models:install(Charstring file,Charstring name,Charstring version)->Charstring



___

> [function]
> models:installed_locally()->Bag of Charstring

> [function-docs]
> Get a bag of all locally installed models. 



___

> [function]
> models:is_published(Charstring repo,Charstring model,Charstring version)
                   ->Boolean

> [function-docs]
> Check if `version` of `model` is published on `repo` 



___

> [function]
> models:is_published(Charstring model,Charstring version)->Boolean

> [function-docs]
> same as `models:is_published("default",model,version)` 



___

> [function]
> models:publish(Charstring repo,Charstring model,Charstring version)->Charstring

> [function-docs]
> Publish `version` of `model` on `repo`. Note that you must
> have created a local release with the model and version before
> publishing it. See:
> 
> ```LIVE
> doc(apropos("models:create_release"))
> ```
> 



___

> [function]
> models:publish(Charstring model,Charstring version)->Charstring

> [function-docs]
> Same as `models:publish("default",model,version)` 



___

> [function]
> models:repository(Charstring name)->Record

> [function-docs]
> Stored function for keeping track of repositories to install
> model from. `name` must be unique and the record has the following
> format:
> ```
> {
>   "url": "http(s)://url.to.your.repo:port",
>   "base_path": "/models/",
>   "http_headers": {
>     "authorization": "token-for-auth",
>     "header2": "another header needed for connection",
>     ...
>     "headerN"; "Header n"
>   }
> }
> ```
> 
> You may add more fields to the record for your convenience but sa.enigne
> will not look at any other fields that these.
> 



___

> [function]
> models:update_repository_configurations(Record input)->Boolean



___

> [function]
> model_folder(Charstring model)->Charstring

> [function-docs]
> The folder of user defined `model` 



___

> [function]
> model_functions(Charstring model)->Bag of Function

> [function-docs]
> Functions belonging to `model` 



___

> [function]
> send_textfile_to_peer(Charstring peer,Charstring file)->Charstring fullpath



___

> [function]
> system_model_file(Charstring filename)->Charstring

> [function-docs]
> Get the full file name of a system model file 



___

> [function]
> system_model_folder(Charstring model)->Charstring

> [function-docs]
> The folder of system defined `model` 



___

> [function]
> system_model_folder()->Charstring

> [function-docs]
> Get the full path name of system model file folder 



___

> [function]
> unload_database(Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload current user database to `file` in `model` 



___

> [function]
> unload_schema(Charstring model,Charstring file)->Charstring

> [function-docs]
> Unload user `model` into OSQL `file` script 



___

> [function]
> upload_folder_to_server(Charstring peer,Charstring subfolder_on_server,
                       Charstring model)->Bag of Charstring



___

> [function]
> user_models()->Bag of Charstring

> [function-docs]
> The current user defined models 



___

> [function]
> user_model_files(Charstring model)->Bag of (Charstring,Charstring)

> [function-docs]
> Relative paths to all files in user `model` 



___

> [function]
> user_model_folder()->Charstring

> [function-docs]
> This user's model folder 


