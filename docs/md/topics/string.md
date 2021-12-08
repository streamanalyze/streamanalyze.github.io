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
