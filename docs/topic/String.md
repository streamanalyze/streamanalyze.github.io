# String functions:
__String concatenation__

String concatenation is made using the `+` operator. Examples:
```
   "ab" + "cd" + "ef";  returns "abcdef"
   "ab"+12+"de"; returns "ab12de"
   "ab"+1+2; returns "ab12"
   1+2+"ab"; is illegal since the first argument of '+' must be a string!
```

__Match string against regular expression:__
```
   like(Charstring string, Charstring pattern) -> Boolean
```

In a pattern string `*` matches sequence of characters and `?` matches
a single character.

Examples:
```
   like("abc","??c") returns TRUE
   like("ac","a*c") returns TRUE
   like("ac","a?c") fails
   like("abc","a[bd][dc]"); returns TRUE
   like("abc","a[bd][de]"); fails
```

## Functions

> [function]
> aton(Charstring s)->Number

> [function-docs]
> Convert string `s` to number 



___

> [function]
> capitalize(Charstring s)->Charstring

> [function-docs]
> Capitalize string `s` 



___

> [function]
> charstring(Object x)->Charstring

> [function-docs]
> Cast `x` to string 



___

> [function]
> concat(Charstring x,Charstring y)->Charstring

> [function-docs]
> Concatenate strings `y` and `y`. Same as `x+y` 



___

> [function]
> length(Charstring str)->Integer

> [function-docs]
> Number of characters in string `str` 



___

> [function]
> like(Charstring str,Charstring pat)->Boolean

> [function-docs]
> Match string `str` against regualar expression `pat` 



___

> [function]
> like_i(Charstring str,Charstring pat)->Boolean

> [function-docs]
> Match string `str` against regualar expression `pat` ignoring case 



___

> [function]
> locate(Charstring substr,Charstring str)->Integer

> [function-docs]
> The position of the first occurrence of substring `substr` in `str` 



___

> [function]
> locate_right(Charstring substr,Charstring str)->Integer

> [function-docs]
> The position of the last occurrence of substring `substr` in `str` 



___

> [function]
> lower(Charstring s)->Charstring

> [function-docs]
> Lower case string `s` 



___

> [function]
> ltrim(Charstring chars,Charstring str)->Charstring

> [function-docs]
> Remove characters in `chars` from beginning of `str` 



___

> [function]
> not_empty(Charstring s)->Boolean

> [function-docs]
> Is string `s` empty or all whitespaced? 
>      The characters space, tab, or new line are counted as whitespace 



___

> [function]
> ntoa(Number x)->Charstring

> [function-docs]
> Convert number `x` to string 



___

> [function]
> plus(Charstring x,Object y)->Charstring r

> [function-docs]
> Concatenate strings `x` and `y`. Inverses produce prefix or suffix 



___

> [function]
> replace(Charstring str,Vector of Charstring from_str,
       Vector of Charstring to_str)->Charstring

> [function-docs]
> The string `str` with all occurrences of the first matching
>      strings in `from_str` replaced by the correspondig strings in `to_str` 



___

> [function]
> rtrim(Charstring chars,Charstring str)->Charstring

> [function-docs]
> Remove characters in `chars` from end of `str` 



___

> [function]
> section(Charstring str,Number l,Number u)->Charstring

> [function-docs]
> The substring of `str` starting at position `l` and ending at `u` 



___

> [function]
> skip(Charstring str,Number l)->Charstring

> [function-docs]
> Skip `l` characters in the beginning of string `str` 



___

> [function]
> split(Charstring str,Charstring delim)->Vector of Charstring

> [function-docs]
> Create a vector of substrings in `str` delimited by `delim` 
>      Example: `split('a bc d', ' ') -> ['a', 'bc','d'] 



___

> [function]
> split(Charstring str)->Vector of Charstring

> [function-docs]
> Unoack `str` into a vector of characters
>      Example: `split('abc') -> ['a', 'b', 'c'] 



___

> [function]
> stringify(Object o)->Charstring

> [function-docs]
> Convert object `o` to string.
>      The elements are stringified if `o` is bag or stream 



___

> [function]
> trim(Charstring chars,Charstring str)->Charstring

> [function-docs]
> Remove characters in `chars` from beginning and end of `str` 



___

> [function]
> unstringify(Charstring s)->Object o

> [function-docs]
> Parse string `s` to object 



___

> [function]
> upper(Charstring str)->Charstring uppr

> [function-docs]
> Upper case string `str` 



___

> [function]
> vref(Charstring str,Number i)->Charstring


