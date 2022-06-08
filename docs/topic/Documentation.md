# Documentation

> [function]
> add_topic(Function f,Charstring topic)->Topic

> [function-docs]
> Add `topic` to function `f` 



___

> [function]
> alltopics()->Bag of Topic

> [function-docs]
> All topics in database 



___

> [function]
> apropos(Charstring str)->Bag of Function

> [function-docs]
> Functions whose names contain `str` 



___

> [function]
> create_topic(Charstring tn)->Topic t

> [function-docs]
> Create a new topic named `tn` 



___

> [function]
> current_topics(Vector of Charstring tn)->Bag of Topic

> [function-docs]
> Associate topics in `tn` with succeeding function definitions 



___

> [function]
> doc(Function fn)->Bag of Charstring

> [function-docs]
> Documentation of function `fn` 



___

> [function]
> doc(Charstring fn)->Bag of Charstring

> [function-docs]
> Documentation of function named `fn` 



___

> [function]
> doc(Topic t)->Charstring

> [function-docs]
> Documentation of functions in topic `t` 



___

> [function]
> file:current_folder()->Charstring

> [function-docs]
> Get the folder of the current file, or current working
> directory if no file is being loaded. 



___

> [function]
> functions(Topic t)->Bag of Function

> [function-docs]
> The functions associated with topic `t` 



___

> [function]
> mddoc(Function fn)->Bag of Charstring

> [function-docs]
> Documentation of function `fn` in Markdown format. 



___

> [function]
> mddoc(Charstring fn)->Bag of Charstring

> [function-docs]
> Documentation of function named `fn` in Markdown format. 



___

> [function]
> mddoc(Topic t)->Charstring

> [function-docs]
> Documentation of functions in topic `t` as Markdown 



___

> [function]
> name(Topic t)->Charstring nm

> [function-docs]
> The name of topic `t` 



___

> [function]
> signature(Function f)->Bag of Charstring

> [function-docs]
> The signature of resolvent `f` or
>      the signatures of all resolvents of the generic function `f` 



___

> [function]
> signature(Type t)->Charstring

> [function-docs]
> The signature of type `t` 



___

> [function]
> sourcecode(Function f)->Bag of Charstring

> [function-docs]
> Source code of function `f` 



___

> [function]
> sourcecode(Charstring fn)->Bag of Charstring

> [function-docs]
> Source code of resolvents of function named `fn` 



___

> [function]
> sourcecode(Type t)->Charstring

> [function-docs]
> Source code to of user defined type `t` 



___

> [function]
> topics(Function f)->Bag of Topic

> [function-docs]
> The topics associated with function `f` 



___

> [function]
> topic_intro(Charstring topic_name)->Charstring



___

> [function]
> topic_named(Charstring tn)->Topic

> [function-docs]
> Get the topic named `tn` 



___

> [function]
> visible(Function f)->Boolean

> [function-docs]
> True if object `f` is not a hidden function 


