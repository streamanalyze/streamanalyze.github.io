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
