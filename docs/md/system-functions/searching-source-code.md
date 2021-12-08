## Searching Source Code

The source code of all functions except some basic system functions are stored in the database. You can retrieve the source code for a particular function, search for functions whose names contain some string, or make searches based on the source code itself. Some system functions are available to do this.

Get all functions in the system whose names contains the string `str`: 
```
   apropos(Charstring str) -> Bag of Function
```
Only the generic name of the function is used in the search. The string is not case sensitive. 

For example, `apropos("qrt")` returns all functions whose generic
name contains `qrt`.

Retrieve the documentation the function named `fn`:
```
   doc(Charstring str) -> Bag of Charstring
```
For example, `doc("sqrt")` returns the documentation of the function `sqrt()`.

Retrieve the source code of a function `f`:
```
  sourcecode(Function f) -> Bag of Charstring
```

Retrieve the source code of a function named `fname`:
```
  sourcecode(Charstring fname) -> Bag of Charstring
```
For generic functions the sources of all resolvents are returned. 

For example, to find all functions whose definitions contain the string `tclose` you can run the query:
```
   select distinct f
     from Function f, Charstring sc
    where like_i(sc,"*tclose*")
      and sourcecode(f)=sc
```

Get the functions calling the function `f`:
```
  usedwhere(Function f) -> Bag of Function c
```

Get the functions called from the function `f`:
```
useswhich(Function f) -> Bag of Function c
```

Get all user defined functions in the database:
```
userfunctions() -> Bag of Function
```

Get all user defined types in the database:
```
usertypes() -> Bag of Type
```

Get all functions where one of the arguments are of type `t`:
```
allfunctions(Type t)-> Bag of Function
```
