# Development

> [function]
> all_code_files(Charstring path)->Bag of Charstring

> [function-docs]
> All project files under `path` 



___

> [function]
> all_code_files()->Bag of Charstring

> [function-docs]
> All project files 



___

> [function]
> all_code_files(Vector of Charstring extensions)->Bag of Charstring

> [function-docs]
> All project files with extension in `extensions` 



___

> [function]
> all_code_folders(Charstring path)->Bag of Charstring

> [function-docs]
> All project folders under `path` 



___

> [function]
> all_code_folders()->Bag of Charstring

> [function-docs]
> All project folders 



___

> [function]
> code_files(Charstring folder,Vector of Charstring extensions)
          ->Bag of Charstring file

> [function-docs]
> Full path names of the code files in `folder` 



___

> [function]
> code_folders(Charstring folder)->Bag of Charstring sd

> [function-docs]
> All source code folders under `folder` 



___

> [function]
> code_format(Charstring fn,Charstring format)->Boolean

> [function-docs]
> Print the code implementing OSQL function `fn` on console in `format`:
>      `osql`     : Source code
>      `objectlog`: Internal ObjectLog format
>      `slog`     : Internal SLOG format
>      `plan`     : Execution plan
>      `slap`     : Execution plan with embedded SLAP code 



___

> [function]
> code_root_folders()->Bag of Charstring path

> [function-docs]
> The root folders for all source code files 



___

> [function]
> excluded_paths(Charstring tag)->Vector of Charstring

> [function-docs]
> File name patterns excluded for code files 



___

> [function]
> file_configuration()->Charstring

> [function-docs]
> The current file meta-data used 



___

> [function]
> grep(Charstring pat,Charstring file)->Stream of Charstring

> [function-docs]
> Search for lines matching pattern `pat` in source `file` 
>      in current `pwd()` folder 



___

> [function]
> grep(Charstring str)->Stream of Charstring

> [function-docs]
> Search for lines matching pattern `pat` in files loaded into database 



___

> [function]
> included_code_extensions(Charstring tag)->Vector of Charstring

> [function-docs]
> Allowed extensions of code files 



___

> [function]
> included_paths(Charstring tag)->Vector of Charstring

> [function-docs]
> Code folder patterns under code_root_folder() 



___

> [function]
> largest_files(Number n,Charstring ext)->Bag of (Charstring,Integer)

> [function-docs]
> The `n` largest files having entension `ext` in the system 



___

> [function]
> largest_files(Number n)->Bag of (Charstring,Integer)

> [function-docs]
> The `n` largest files in the system 



___

> [function]
> lines_per_extension()->Bag of (Charstring,Number)

> [function-docs]
> The total number of files lines per extension 



___

> [function]
> loaded_files()->Bag of Charstring

> [function-docs]
> The source files loaded into the database  



___

> [function]
> objectlog(Charstring fn)->Boolean

> [function-docs]
> Print the ObjectLog definitions of the resolvents of `fn` 



___

> [function]
> pc(Function f)->Bag of Function r

> [function-docs]
> Print the execution plan of function `f` on the colsole. 
>      If `f` is a generic function display execution plans of its resolvents 



___

> [function]
> pc(Charstring fn,Charstring bpat)->Function

> [function-docs]
> Print the execution plan of function named `fn` 
>      for binding pattern `bpat` on the console 



___

> [function]
> pc(Charstring fn)->Bag of Function

> [function-docs]
> Print the execution plan of function named `fn` on the console.
>      If `fn` is generic display execution plans of its resolvents 



___

> [function]
> plan(Charstring fn)->Boolean

> [function-docs]
> Print the execution plans of the resolvents of `fn` 



___

> [function]
> plan_size(Charstring fn)->Number



___

> [function]
> slap(Charstring fn)->Boolean

> [function-docs]
> Print the execution plans of the resolvents of `fn` with SLAP code 



___

> [function]
> slog(Charstring fn)->Boolean

> [function-docs]
> Print the SLOG code of the resolvents of `fn` 



___

> [function]
> slog_compiled(Charstring fn)->Boolean

> [function-docs]
> Is some SLOG compilation made for `fn`? 



___

> [function]
> time_function(Charstring msg,Function fn,Vector args,Integer times)->Real

> [function-docs]
> The time spent to call the OSQL function `fn` with arguments `args`
>      `n` times. 
>      The systen will also print a message `msg` and the time on the console 



___

> [function]
> total_code_lines()->Number

> [function-docs]
> The total number of lines in all project files 



___

> [function]
> total_code_lines(Charstring ext)->Number

> [function-docs]
> The total number of lines in project files with extensiona `ext` 



___

> [function]
> trace_slog_compiler(Boolean flag)->Boolean

> [function-docs]
> Enable/disable tracing SLOG compilation traces on the console 


