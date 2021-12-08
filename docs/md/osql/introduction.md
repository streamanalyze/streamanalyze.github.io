# OSQL Reference

In general the user may enter different kinds of OSQL *statements* to the sa.engine REPL in order to instruct the system to do operations on the database:

1.  First the database schema is created by [defining types](/docs/md/osql/defining-types.md)
with associated properties.

2.  Once the schema is defined the database can be populated by [creating objects](/docs/md/osql/creating-objects.md) and their properties in terms of the database schema.

3.  Once the database is populated [queries](/docs/md/osql/queries.md) may be expressed to retrieve and analyze data from the database. Queries return [collections](/docs/md/osql/basic-constructs.md#collections) of objects, which can be both unordered sets of objects or ordered sequences of objects.

4.  A populated database may be [updated](/docs/md/osql/updates.md) to change its contents.

This section is organized as follows:

- Before going into the details of the different kinds of OSQL statements, in [basic constructs](/docs/md/osql/basic-constructs.md) the basic building blocks of the query language are described.

- [Defining Types](/docs/md/osql/defining-types.md) describes how to create a simple database schema by defining types and properties. 

- [Creating Objects](/docs/md/osql/creating-objects.md) describes how to populate the database by creating objects.

- The concept of *queries* over a populated database is presented in [Queries](/docs/md/osql/queries.md).

- Regular queries return unordered sets of data. In addition sa.engine provides the ability to specify *vector queries*, which return ordered sequences of data, as described in [Vector Queries](/docs/md/osql/vector-queries.md).

- A central concept in sa.engine is the extensive use of *functions* in database schema definitions. There are several kinds of user-defined functions supported by the system as described in [Defining Functions](/docs/md/osql/defining-functions.md).

- [Updates](/docs/md/osql/updates.md) describes how to *update* a populated database.
