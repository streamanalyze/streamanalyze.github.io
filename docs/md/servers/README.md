> [warning] **Work in progress:** This section is still a work in progress.

# Federations
A federation of sa.engine consists of:
* A nameserver.
* Zero or more stream servers.
* Zero or more edge devices.

This section will go through how to start your own federation with a nameserver and stream servers. In the next section you will learn how to [connect edge](/docs/md/edge_devices/README.md) devices.

Check out the [advanced](/docs/md/servers/advanced.md) sub-section to get more in-depth details on how to 
configure sa.engine.

# Nameserver
The first stop towards creating a federation is starting a **nameserver**.
To start a nameserver you first need to [download](!https://studio.streamanalyze.com/download) 
sa.engine for the operating system that the nameserver should run on. 

Once you have downloaded sa.engine you can start it by running the sa.engine 
executable inside the **bin** directory of the sa.engine folder:

```
~/sa.engine/bin$ sa.engine
Database image: sa.engine.dmp
Release 3, v4, 64 bits
[sa.engine] 1>
```

By calling the function `nameserver` you can configure the started sa.engine as 
a nameserver:
```LIVE {"vis":"showMarkdown"}
mddoc(functionnamed("nameserver"));
```
> [note]  **Note:** Run the query above to get the documentation for the `nameserver`
function. 

Once you have called `nameserver` you can start it by calling the `listen` 
function.

You can also start a nameserver from the command line by adding the `-n <descr>`
flag to sa.engine:

```
~/sa.engine/bin$ sa.engine -n my_nameserver:35022
Database image: sa.engine.dmp
Release 3, v4, 64 bits
2021-06-22T17:49:54.741 [Wait for nameserver port 35022
2021-06-22T17:49:54.741 nameserver port bound]
2021-06-22T17:49:54.741 Name server MY_NAMESERVER listening on port 35022
```

To get the available command line options start sa.engie with `-?`:

```
~/sa.engine/bin$ sa.engine -?
Usage:
-------------------------------------------------------
sa.engine [image_file | -i lisp_file]
          [-e edge[@[host][:port]]] [-s server[@[host][:port]]]
          [-n [nameserver][:port]]] [-c client[@[host][:port]]]
          [-o osql] [-O osql_file] [-q query_language]
          [-l lisp] [-L lisp_file]
          [-f sa_home_folder] [-x] [-r out_file]
          [-h | -?]
-------------------------------------------------------
```

## Creating a startup script for the nameserver
When hosting a nameserver you will most certainly want to configure the 
nameserver before starting it. One way to dothis is to create a configuration
osql file. 

Create a file name `config.osql` and add the following lines to it:
```
nameserver("my_nameserver:35022");
listen();
```

Now start sa.engie with `-O config.osql`. This will start sa.engine which will 
then load `config.osql`:

```
~/sa.engine/bin$ cat config.osql
nameserver("my_nameserver:35022");
listen();
johan@LAPTOP-58C0OPOI:~/sa.engine/bin$ sa.engine -O config.osql
Database image: sa.engine.dmp
Release 3, v4, 64 bits
Reading OSQL statements from "/home/johan/sa.engine/bin/config.osql"
2021-06-22T17:59:37.473 [Wait for nameserver port 35022
2021-06-22T17:59:37.473 nameserver port bound]
"my_nameserver:35022"
2021-06-22T17:59:37.473 Name server MY_NAMESERVER listening on port 35022
```

**Congratulations** you have now created your first nameserver configuration.
You can use how many flags when starting you want when starting sa.engine. Each
flag is evaluated in order of it's definition when starting.





> [note]  **Note:** In sa.studio Community Edition you already have a nameserver running in the cloud. 





# Stream Analyze Stream Servers
Start stream servers is very similar to nameservers. The difference is that you
call `server` instead of `nameserver`:
```LIVE {"vis":"showMarkdown"}
mddoc(functionnamed("server"))
```
Once you've called `server` you can start it by calling `listen`. The sorthand 
command line argument for this is `-s descr` however, when starting from the 
command line you cannot set the desired port explicitly.

Create a new configuration file `server1.osql` and add:

```
server("my_server@localhost:35022","localhost",35023);
```

And run it with `sa.engine -O server1.osql` after starting the nameserver.

```
~/sa.engine/bin$ sa.engine -O config.osql&
[1] 23434
johan@LAPTOP-58C0OPOI:~/sa.engine/bin$ Database image: sa.engine.dmp
Release 3, v4, 64 bits
Reading OSQL statements from "/home/johan/sa.engine/bin/config.osql"
2021-06-22T18:15:15.929 [Wait for nameserver port 35022
2021-06-22T18:15:15.929 nameserver port bound]
"my_nameserver:35022"
2021-06-22T18:15:15.929 Name server MY_NAMESERVER listening on port 35022

~/sa.engine/bin$ sa.engine -O server1.osql
Database image: sa.engine.dmp
Release 3, v4, 64 bits
Reading OSQL statements from "/home/johan/sa.engine/bin/server1.osql"
2021-06-23T19:21:21.429 Server MY_SERVER listening on port 35023

```


**Congratulations** you have now started your first federation of sa.engines!
