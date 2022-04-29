# OSQL Syntax

For the syntax we use [BNF notation](https://en.wikipedia.org/wiki/Backus-Naur_form) with the following special constructs:

```
A ::= B C: A consists of B followed by C.
A ::= B | C, alternatively (B | C): A consists of B or C.
A ::= [B]: A consists of B or nothing.
A ::= B-list: A consists of a sequence of one or more Bs.
A ::= B-commalist: A consists of one or more Bs separated by commas.
'xyz': The keyword xyz.
```
The following *statements* can be entered to an sa.engine REPL:

```
statement ::=
      create-type-stmt                | 
      delete-type-stmt                |
      create-object-stmt              |
      delete-object-stmt              |
      create-function-stmt            |
      delete-function-stmt            |
      query                           |
      update-stmt                     |
      for-each-stmt                   |
      set-session-variable-stmt       |
      declare-session-variable-stmt   |
      commit-stmt                     |
      rollback-stmt                   |
      validate-stmt                   |
      quit-stmt                       |
      exit-stmt
```

*Identifiers* have the syntax:

```
identifier ::= ('_' | letter) [identifier-character-list]

identifier-character ::= alphanumeric | '_'

```
*Variables* have the syntax:
```
variable ::= local variable | session-variable
     
local-variable ::= identifier

session-variable ::= ':' identifier
```
Syntax of *session variable declare statements*:
```
session-variable-declare-stmt ::=  'declare' session-variable-declaration-commalist

session-variable-declaration ::= type-spec session-variable

type-spec ::= 
      type-name | 
      'Bag of' type-spec | 'Vector of' type-spec | 'Stream of' type-spec

```
Syntax of *session variable assignments*:
```
set-session-variable-stmt ::= 'set' session-variable '=' expression
```
Syntax of *constants*:
```
constant ::=
      integer-constant | real-constant | boolean-constant |
      string-constant | time-stamp | functional-constant  | 'null'

integer-constant ::= ['-'] digit-list

real-constant ::= decimal-constant | scientific-constant

decimal-constant ::= ['-'] digit-list '.' [digit-list]

scientific-constant ::= decimal-constant ['e' | 'E'] integer-constant

boolean-constant ::= 'true' | 'false'
```
*Strings* have syntax:  
```
string-constant ::= string-separator character-list string-separator

string-separator ::= ''' | '"'
```
Syntax of *simple values*:
```
simple-value ::= constant | variable
```
Syntax of *expressons*:
```
expression ::=
      simple-value | function-call | collection-constr | casting |
      key-lookup | '(' query ')' | case-expression 
```

Syntax of *collections*:
```
collection-constr ::= bag-constr | vector-constr | record-constr

bag-constr ::= bag(expression-commalist)

vector-constr ::= '[' expression-comma-list ']'

record-constr ::= '{' key-value-comma-list '}'

key-value ::= string-constant ':' expression
```
Syntax of *comments*:
```
comment ::= '/*' character-list '*/'
```
Syntax of *define type*:
```
create-type-stmt ::=
      'create type' type-name ['under' type-name-commalist];

type-name ::= identifier
```
Syntax of *delete type*:
```
delete-type-stmt ::= 'delete type' type-name
```
Syntax of *creating objects*:
```
create-object-stmt ::=
      'create' type-name ['(' generic-function-name-commalist ')'] 
      'instances' initializer-commalist

generic-func>tion-name ::= identifier

initializer ::= variable | [variable] '(' expression-commalist ')'
```
Syntax of *deleting objects*:
```
delete-object-stmt ::= 'delete' variable
```

Syntax of *queries*:
```
query ::= 
      select-query              |
      select-vector-query       |
      select-stream-query       |
      expression
```
Syntax of *function calls*:
```
function-call ::=
      function-name '(' [parameter-value-commalist] ')' |
      expression infix-operator expression |
      tuple-expression

infix-operator ::=
      '+' | '-' | '*' | '/' | '<' | '>' | '<=' | '>=' | '=' | '!=' | 'in' | '^'

parameter-value ::= 
      expression |
      '(' select-query ')' |
      tuple-expression

tuple-expression ::= '(' expression-commalist ')'
```
Syntax of *case expressions*:
```
case-expression ::=
      'case' when-clauses ['else' expression] 'end'
      
when-clauses ::=
      'when' expression 'then' expression [when-clauses]
```
Syntax of *validate statement*:
```
validate-stmt ::=
      'validate' string-constant check-clauses

check-clauses ::=
      'check' expression '=>' expression [check-clauses]
```

Syntax of a *select query*:
```
select-query ::=
      'select' ['distinct']
      [select-clause]
      [into-clause]
      [from-clause]
      [where-clause]
      [group-by-clause]
      [order-by-clause]
      [limit-clause]

select-clause ::= expression-commalist

into-clause ::= 'into' variable-commalist

from-clause ::= 'from' variable-declaration-commalist

variable-declaration ::= type-spec local-variable

where-clause ::= 'where' predicate-expression

group-by-clause ::= 'group by' expression-commalist

order-by-clause ::= 'order by' expression ['asc' | 'desc']

limit-clause ::= 'limit' expression
```

Syntax of *predicate expressions*:
```
predicate-expression ::=
      predicate-expression 'and' predicate-expression |
      predicate-expression 'or' predicate-expression  |
      '(' predicate-expression ')'                    |
      expression
```
Syntax of *select vector queries*:

```
select-vector-query ::=
      'select Vector of' expression
      ['distinct']
      [select-clause]
      [into-clause]
      [from-clause]
      [where-clause]
      [group-by-clause]
      [order-by-clause]
      [limit-clause]
```
Syntax of *select stream queries*:

```
select-query ::=
      'select Stream of' expression
      [select-clause]
      [from-clause]
      [where-clause]
      [limit-clause]
```
Syntax of `key lookup`:
```
key-lookup ::= expression '[' expression-commalist ']'
```
Syntax of *defining functions*:

```
create-function-stmt ::= 'create function' function-signature [function-body]

function-signature ::= generic-function-name argument-spec '->' result-spec 

argument-spec ::= '(' [argument-declaration-commalist] ')'  

argument-declaration ::= type-spec [local-variable] [key-constraint]

key-constraint ::= 'key' | 'nonkey'

result-spec ::= argument-spec | tuple-result-spec  

tuple-result-spec ::= ['Bag of'] '(' argument-declaration-commalist ')'  

function-body ::=
      'as' query |
      'as stored' |
      procedural-function-definition |
      foreign-function-definition
```
*Function names* have syntax:
```
function-name ::= generic-function-name | resolvent-name

resolvent-name ::= type-name-list '.' generic-function-name '->' type-name-list

type-name-list ::= type-name | type-name '.' type-name-list
```
*Castings* have the syntax:
```
casting ::= 'cast' (expression 'as' type-spec)
```
*Delete function* syntax:
```
delete-function-stmt ::= 'delete function' function-name
```
Syntax of *functional constants*:
```
functional-constant ::= '#' string-constant
```

Syntax of *update statements*:
```
update-stmt ::= update-op update-item [from-clause] [where-clause]

update-op ::= 'set' | 'add' | 'remove'

update-item ::= function-name '(' expression-commalist ')' '=' expression
```

Syntax of *procedural statements*:

```
procedural-function-definition ::= block | procedure-stmt

procedure-stmt ::=
      create-object-stmt |
      delete-object-stmt |
      for-each-stmt |
      update-stmt |
      set-local-variable-stmt |
      query |
      case-stmt |
      commit-stmt |
      abort-stmt |
      loop-stmt |
      while-stmt |
      open-stmt |
      fetch-stmt |
      close-stmt

block ::=  
      '{' ['declare' variable-declaration-commalist ';']
              procedure-stmt-semicolonlist
      '}'

return-stmt ::= 'return' expression

for-each-stmt ::=
      'for each' variable-declaration-commalist
                 [where-clause] 
                 procedure-body

case-stmt ::=
      'case' when-statements ['else' statement] 'end'
      
when-statements ::=
      'when' expression 'then' statement [when-statements]

set-local-variable-stmt ::= 'set' local-variable '=' expression

while-stmt ::= 'while' expression 'do' procedure-stmt-semicolonlist 'end while'

loop-stmt ::= 'loop' procedure-stmt-semicolonlist 'end loop'

leave-stmt ::= 'leave'
```
