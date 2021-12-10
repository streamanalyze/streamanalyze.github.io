# Data and models

When you exit sa.studio the database is by default not saved and thus
it disappears. The command `save` saves the database image on
disk so that all data and function definitions remain the next time
you use sa.studio.

*Example:*

```LIVE
save
```

The command will save the current database in a **database image**
file named `sa.engine.dmp` inside the `bin` folder of your **SA home
folder**. The result of `save` is the full database image file name.

> [note]  **Note:** In the free web-based *sandbox* version of sa.engine the
saved database image will disappear when the sandbox is restarted
after 1-2 days. When restated sandbox system will use the 'factory'
database image instead. 
You can find the exact location of the current image
file by calling the function `image_file()`.

You get the current **SA home folder** by evaluating:

```LIVE
sa_home()
```

Under Windows the SA home folder is located in
`%USERPROFILE%\Documents\SA`, under OSX in `~/Documents/SA`, and under
Linux in `~/SA`. The database image is by default saved in
`sa.engine.dmp` in the `bin` folder under the SA home folder.

You can list the files in your SA home `bin` folder by calling:

```LIVE
dir(sa_home()+"bin")
```

## Erasing the database image file

You can erase the current database disk image and reset it to the original
'factory' database by:

```LIVE
erase_image()
```

The function returns the name of the erased database image if it was
found. The next time the system is started it will use the 'factory'
database image instead.

You can change your mind and restore an erased image in the same
session if you call `save` after you have erased it.

### Image loading order

When sa.engine is started it uses the default image name
`sa.engine.dmp`.

In general, the system will look for the image file to use in the
following directory order:

1. It first looks in the `bin` subfolder under the user's SA home
   folder. The home folder is returned by calling
   `sa_home()`.

2. Then it looks in the **startup directory** where the sa.engine
   executable is located. This folder is returned by calling
   `startup_dir()`.

## User models

It is not practical to always save all function definitions and data
in the database during development. In order to organize the
definitions systematically, it is recommended to create **user model
folders** containing files with your functions and meta-data. To show
how this works do the following:

Go to the OSQL-editor by clicking `<>` in the navigator
tab up to the left and create there a new model folder in the
following way:

- Right click `User models` and choose `Create new model`, then enter
the name of your new model, e.g. `my_c_to_f` for storing the [ctof
function](/docs/md/tutorial/basic-functions.md#define-model-function)
in the pull-down menu. Then click `OK` to create a new model folder
named `my_c_to_f`.

- Choose the Documentation tab to get back here
 <video style="width: 100%"  controls> <source
src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/tutorial/create_model2.webm"
type="video/webm"> Your browser does not support the video tag.
</video>

Check that `my_c_to_f` is added to your models by being included in the
result of:

```LIVE
user_models()
```

The model folder `my_c_to_f` is located in the subfolder `models`
under `sa_home()`. Check its contents by:

```LIVE
dir(model_folder("my_c_to_f"))
```

A model folder always contains an OSQL file `master.osql` where the
analysis model is defined. To edit `master.osql` navigate to the
**OSQL editor** view by clicking the symbol `<>` in the navigator bar
to the left. Then expand the `Models` folder in the side bar of the
OSQL editor view.  You will the see `my_c_to_f` in the sidebar under
`User models`. Select it and click on `master.osql`. You will enter a
text editor for the file where you can paste the definition of the
function [ctof()](/docs/md/tutorial/basic-functions.md#define-model-function)

Don't forget to save the model file by clicking <i class="material-icons" style="vertical-align: middle">save</i> or pressing `ctrl+s`. Quit the
editor by clicking <i class="material-icons" style="vertical-align: middle">close</i>.

You can now load the model into the database by running:

```LIVE
load_model('my_c_to_f')
```

Check that the model has been loaded into the database by:

```LIVE
loaded_models()
```

At this point `my_c_to_f` should be included in the result. If not, you
have probably forgotten to save the `master.osql` file.

Check that function `ctof` is in the database by:

```LIVE
sourcecode('ctof')
```

Call `save` to save the model in the database so that it is
available next time you run sa.studio.

## System models

There is a library of predefined **system models** available. They are
by default not loaded into the stream server. To see what system
models are available click `<> -> System Models` and you can choose
among a number of predefined system models. Some of these implement AI
learning algorithms.

To load a system model you can click the button <span class="material-icons" style="vertical-align: middle;">publish</span>to the right of the model
name whereby it will be loaded into the stream server.

For example, load the non-supervised learning algorithm
[dbscan](https://en.wikipedia.org/wiki/DBSCAN) for automatically
forming clusters of feature vectors. Choose to load it on the
server.

> [live-only] Now, if you go back to the [loaded models section of the
> documentation](/docs/systemmd/dbscan/docs) a menu entry `dbscan` will appear 
> to the left. Select it to run a tutorial on how to develop clustering models
> with dbscan.

You can do the same for the [k-means
clustering](https://en.wikipedia.org/wiki/K-means_clustering)
algorithm or for linear regression.

<a name="transactions"></a>

## Undo changes

The system logs all changes made by users if transaction logging is
enabled. This means that the sa.engine user can undo all model
definitions in a session by the command `rollback`. This is very
practical when building models since buggy models definitions can
easily be undone by executing `rollback` and then re-enter corrected
model code.

When the model is ready you can save the database on disk using
`save`. A new session is thereby started so that the next
rollback stops at the `save` call.

You can also make a *save point* by executing the command
`commit`. The next rollback will stop at the `commit` but, unlike
`save`, the database is not saved on disk. This is practical
when a part of the model has been developed.

> [note]  **Note:** The free web based *sandbox* version of sa.studio has
limited memory that may be exhausted by the
extra space needed to enable long rollbacks. This can be alleviated by
issuing the `commit` command now and then to free space for the log.

The [next tutorial](/docs/md/tutorial/streams.md) shows how to query
potentially infinite streams.