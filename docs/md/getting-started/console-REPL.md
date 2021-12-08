## The Console REPL

As a command line tool, the **Console REPL** can be started by the command `sa.engine` in your OS command window. This will allow you to evaluate and print, but not visualize, OSQL expressions in the command window. 

To enable the Console REPL include the Console REPL executable `sa.engine` in the enviroment variable PATH so that the command `sa.engine` can be issued from any console window on your PC. Under Windows `sa.engine` is added to PATH if you check the box **Add sa.engine to PATH**, while you have to set PATH manually under Linux and OSX.

Try entering the following command to the Console REPL:
```sql
1+sin(3.14);
```
Notice that in the Console REPL the expressions must be followed by a `;`. 

You can use your favorite editor to create scripts containing OSQL statements. For example, if you create a file `myfile.osql` you can run it in the Console REPL by the statement `< 'myfile.osql';` 

You can start sa.studio from the Console REPL by evaluating `va();`.
