# Accessing data in files

The file system where an sa.engine server is running can be accessed with a number of system functions:

The function `pwd()` returns the path to the current working directory of the server:
```
pwd() -> Charstring path
```

The function `cd()` changes the current working directory of the server:
```
cd(Charstring path) -> Charstring
```

The function `dir()` returns a bag of the files in a directory:
```
dir() -> Bag of Charstring file
dir(Charstring path) -> Bag of Charstring file
dir(Charstring path, Charstring pat) -> Bag of Charstring file
```

The first optional argument `path` specifies the path to the directory. The second optional argument `pat` specifies a regular expression (as in like) to match the files to return. The function `file_exists()` returns true if a file with a given name exists:
```
file_exists(Charstring file) -> Boolean
```

The function `directoryp()` returns true if a path is a directory:
```
directoryp(Charstring path) -> Boolean
```

The function `filedate()` returns the write time of a file with a given name:
```
filedate(Charstring file) -> Date
```

## Reading and writing files

The function `readlines()` returns the lines in a file as a bag of strings:
```
readlines(Charstring file) -> Stream of Charstring
readlines(Charstring file, Charstring sep) -> Stream of Charstring
```
The optional second argument `sep` specifies the character used to separate the lines. The default is the standard line separator.

The function `csv_file_tuples()` reads a CSV (*Comma Separated Values*) file. Each line is returned as a vector.

For example, if a file named *myfile.csv* contains the following lines:
```
1,2.3,a b c
4,5.5,d e f
```
the result from the call `csv_file_tuples("myfile.csv")` is a stream containing these vectors:
```
{1,2.3,"a b c"}
{4,5.5,"d e f"}
```

The CSV reader can, e.g., read CSV files saved by EXCEL, but is has to be in **English** format.

The function `csv:write_file()` writes the vectors in a bag `b` into a file in CSV (Comma Separated Values) format so that it can loaded into, e.g., Excel.
```
csv:write_file(Charstring file, Bag b) -> Boolean
```
For example, the following statement:
```
csv:write_file("myoutput.csv", bag({1,"a b",2.2},{3,"d e",4.5})
```
produces the a file `myoutput.csv` having these lines:
```
1,a b,2.2
3,d e,4.5
```
