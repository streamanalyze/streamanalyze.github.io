# Miscellaneous
String identifying the current version of sa.engine:
```
system_version() -> Charstring
```

Quit sa.engine: 
```
   quit;
```
If the system is registered as a peer it will be removed from the name server.

The redirect statement reads OSQL statements from a file:
```
redirect-stmt ::= '<' string-constant
```
Example
```
   < 'person.osql';
```

Load a master file, filename, containing an OSQL script defining a
subsystem:
```
   loadSystem(Charstring dir, Charstring filename)->Charstring
```

The current directory is temporarily set to `dir` while loading. The
file is not loaded if it was previously loaded into the database. To
see what master files are currently loaded, call:

```
   loadedSystems() -> Bag of Charstring
```

The value of OS environment variable `var`. 
```
   getenv(Charstring var)->Charstring value
```
Generates an error of variable not set.

Print an error message `msg` on the console and raises an exception:
```
   error(Charstring msg) -> Boolean
```

## Functions

> [function]
> autosave(Boolean stat)->Boolean



___

> [function]
> autosave()->Boolean



___

> [function]
> auto_commit(Boolean stat)->Boolean



___

> [function]
> erase_image()->Charstring

> [function-docs]
> Delete the current database image 



___

> [function]
> extlang(Charstring lang)->Boolean

> [function-docs]
> Enable access to external programming language `lang` 



___

> [function]
> getwatermark()->Object



___

> [function]
> image_file()->Charstring



___

> [function]
> load_extension(Charstring ext)->Boolean

> [function-docs]
> Load plugin named `ext` 



___

> [function]
> object_numbered(Integer i)->Object



___

> [function]
> oid_no(Object o)->Integer i

> [function-docs]
> The number identifying surrogate object `o` 



___

> [function]
> reload_extension(Charstring ext)->Boolean



___

> [function]
> save_database(Charstring image)->Charstring



___

> [function]
> save_image()->Charstring

> [function-docs]
> Save current database image on disk 



___

> [function]
> set_final(Charstring fn)->Boolean

> [function-docs]
> Declare function `fn` as final (no late binding) 



___

> [function]
> set_resulttypes(Object fn,Charstring lfn)->Bag of Function



___

> [function]
> set_stateful(Charstring fn)->Bag of Function

> [function-docs]
> Declare all resolvents of function named `fn` to be stateful 



___

> [function]
> startup_dir()->Charstring



___

> [function]
> stateful(Function fno)->Boolean

> [function-docs]
> Is resolvent `fno` stateful? 



___

> [function]
> substv(Object x,Object y,Object o)->Object

> [function-docs]
> Replace `x` with `y` in `o` 



___

> [function]
> unnest_arguments(Function fn)->Boolean


