## Examples of queries:

Number of code folders:
```LIVE
count(all_code_folders())
```
Number of code files:
```LIVE
count(all_code_files())
```
Number of code lines:
```LIVE
total_code_lines()
```
10 largest files:             
```LIVE
largest_files(10)
```
Number of JavaScript code lines:
```LIVE
total_code_lines("js")
```
Number of Lisp code lines:
```LIVE
total_code_lines("lsp")
```
10 largest .h files:
```LIVE
largest_files(10,"h")
```
Code lines per extension (takes a while):
```LIVE
lines_per_extension();
```
Calls to unionfn i .c and .h code files:
```LIVE
grep("unionfn(", all_code_files(["c","h"]))
```
## Functions
