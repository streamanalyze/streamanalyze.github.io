# Creating Objects

The *create object* statement populates the database by creating objects and as instance(s) of a given [type](/docs/md/osql/defining-types.md) and all its supertypes.

The new objects are assigned *initial values* for specified *attributes* (properties).

Example:
```
   create Person(name, income, age) instances 
                ("Venus",3500,35), 
                ("Serena",3900,40)
```

The attributes can be any [updatable](/docs/md/osql/updates.md) OSQL function having the created type as its only argument, here `name()` and `age()`. One object will be created for each initializer. Each initializer includes a comma-separated list of initial values for the specified attribute functions. Initial values are specified as [expressions](/docs/md/osql/basic-constructs.md#expressions).

Example:

```
   create Person (name,income) instances
                 ("Kalle "+"Persson" , 3345*1.5)
```

The types of the initial values must match the declared result types of the corresponding functions.

Each initializer can have an optional [variable name](/docs/md/osql/basic-constructs.md#variables) which will be bound to the new object. The variable name can subsequently be used as a reference to the object.

Example:
```
   create Person(name, income) instances
         :pelle ("Per",3836)
```

Then the query `income(:pelle)` returns `3386`

Notice that [session variables](/docs/md/osql/basic-constructs.md#variables) such as `:pelle` are temporary and not saved in the database.

[Bag valued functions](/docs/md/osql/defining-functions.md#function-signatures) are initialized using the syntax `bag(e1,...)`.

Example:
```
   create Person (name,parents,income,age) 
     instances :adam ("Adam",null,2300,64), 
                :eve ("Eve",null,3200,63), 
               :cain ("Cain",bag(:adam,:eve),1500,44),
                     ("Abel",  bag(:adam,:eve),900,43),
               :seth ("Seth",bag(:adam,:eve),1700,42), 
             :lilith ("Lilith",bag(:adam,:eve),4500,40), 
               :noah ("Noah",bag(:seth,:lilith),5300,25),
               :ruth ("Ruth",:cain,500,24), 
                     ("Shem",  bag(:noah,:ruth),800,15),
                :ham ("Ham",bag(:noah,:ruth),3800,16),
                     ("Cush",:ham,10,2)
```

It is possible to specify `null` for a value when no initialization is desired for the corresponding function.

## Deleting objects

Objects are deleted from the database with the `delete` statement.

Example:
```
   delete :pelle
```

The system will automatically remove the deleted object from all stored functions where it is referenced. Deleted objects are printed as:
```
#[OID nnn *DELETED*]
```

The objects may be undeleted by `rollback`. The automatic garbage collector physically removes an OID from the database only if its creation has been rolled back or its deletion committed and it is not referenced from some variable or external system.
