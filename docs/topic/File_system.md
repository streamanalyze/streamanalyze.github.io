# File system functions:

> [function]
> all_files_under(Charstring folder)->Bag of (Charstring,Charstring)

> [function-docs]
> Get all files somewhere under `folder`
>      along with their relative path from `folder` 



___

> [function]
> base_filename(Charstring path)->Charstring

> [function-docs]
> The Unix style file name part of `path` 



___

> [function]
> create_folder(Charstring folder)->Charstring



___

> [function]
> dir(Charstring d)->Bag of Charstring

> [function-docs]
> List files in directory named `d`.
>      Empty `d` lists files in current working directory `pwd()` 



___

> [function]
> dir(Charstring path,Charstring pat)->Bag of Charstring d

> [function-docs]
> List files in directory `path` whose names match the pattern `pat` 



___

> [function]
> dir()->Bag of Charstring

> [function-docs]
> List files in current working directory `pwd()` 



___

> [function]
> directories_in(Charstring f)->Bag of Charstring

> [function-docs]
> Get names of all directories in folder `f` 



___

> [function]
> directoryp(Charstring path)->Boolean

> [function-docs]
> Is a `path` a directory? 



___

> [function]
> dirpath(Charstring file)->Charstring

> [function-docs]
> Convert `file` to Unix style filename ended with a single `/` 



___

> [function]
> filedate(Charstring file)->Timeval

> [function-docs]
> The time when `file` was last updated 



___

> [function]
> file_exists(Charstring file)->Boolean

> [function-docs]
> Does `file` exists? 



___

> [function]
> file_lines(Charstring file)->Number

> [function-docs]
> The number of lines in `file` 



___

> [function]
> find_file(Charstring folder,Charstring file)->Charstring

> [function-docs]
> Get full path to first occurence of `file` somewhere under `folder` 



___

> [function]
> folder_of(Charstring path)->Charstring f

> [function-docs]
> The Unix style folder name of `path` 



___

> [function]
> full_filename(Charstring path)->Charstring

> [function-docs]
> The Unix style name of file `path` 



___

> [function]
> full_filenames(Charstring f,Charstring pat)->Bag of Charstring

> [function-docs]
> Get the path names of the files in folder `f` that match pattern `pat` 



___

> [function]
> load_osql(Charstring file)->Charstring

> [function-docs]
> Evaluate OSQL statements in `file` 



___

> [function]
> load_osql(Charstring file,Charstring tn)->Charstring

> [function-docs]
> Evaluate OSQL statements in `file` belonging to topic named `tn` 



___

> [function]
> popd()->Charstring

> [function-docs]
> Go back to folder before last `pushd(path)` 



___

> [function]
> pushd(Charstring path)->Charstring

> [function-docs]
> Make `path` current working directory. Go back with `popd()` 



___

> [function]
> pwd()->Charstring

> [function-docs]
> The current working directory 



___

> [function]
> read_file(Charstring file)->Charstring

> [function-docs]
> Get contents of `file` as a string 



___

> [function]
> sa_home()->Charstring

> [function-docs]
> User's home folder 



___

> [function]
> subdirectories(Charstring f)->Bag of Charstring

> [function-docs]
> Get names of all directories under folder `f`, including `f` 



___

> [function]
> temp_folder()->Charstring

> [function-docs]
> User's folder for temporary files 



___

> [function]
> write_file(Charstring cont,Charstring filename)->Charstring

> [function-docs]
> Write `cont` into `filename` 



___

> [function]
> write_filepath(Charstring cont,Charstring path)->Charstring


