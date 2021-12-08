## The Local Database

sa.engine includes a built-in main-memory **local database**. The main
use of the local database is for storing models, parameters and other
meta-data. It is an object-oriented database where objects of
different types can be stored and queried. The object-orientation
allows the definition of complex meta-data sometimes called
**ontologies**.

In this section we show how the local database can be used as a
regular main-memory database.

In sa.engine, a database is a collection of **objects**. Each object
belongs to one or several **types**. **Functions** define mappings
between objects of different types. The **schema** is a part of the
database that represents type and function definitions.

Suppose we are going to store data about departments and their
properties. The first thing to do is to define a new **type** named
`Department` by this statement: 

```LIVE 
create type Department
```

Then we define the property `name` of departments by the statement:

```LIVE
create function name (Department) -> Charstring as stored 

```

The function `name` is an example of a **stored function** that is
stored in the database.

Now we can **populate** the database by creating objects of type `Department`:

```LIVE
create Department (name) instances :toys ("Toys"), 
                                   :food ("Food"), 
                                   :tools ("Tools")
```

We have here created three objects and assigned them to **session
variables** prefixed with `':'`: `:toys`, `:food`, and `:tools`. It is
practical to use such session variables to temporarily hold database
objects. However, notice that the session variables are only
temporarily present during the current session with sa.engine and will
**not** be saved in the database.

In addition to creating three objects the above statement assigns
corresponding values to the function (or property) `name`.

Session variables can be used in **queries**. For example, to get the
value of the function `name` for argument `:toys` we can
make the following query being a function call:

```LIVE
name(:toys) 
```

The following query finds the names of the objects of type `Department`:

```LIVE
select name(d) 
  from Department d
```

We may filter the result by matching the name against a pattern using
the function `like`:

```LIVE
select name(d) 
  from Department d
 where like(name(d),"T*")
```

Here the two department names `"Toys"` and `"Tools"`are matching the
pattern `"T*"` (i.e. a `*` matches any string).

It is often practical to get the object representing a department,
given its name. For that we define the function `theDept(Charstring
name)->Department` as the inverse of `name(Department)->Charstring` by
evaluating:

```LIVE
create function theDept(Charstring name) -> Department
  as inverse of name
```
Session variables can be assigned to values using the `set` statement:

```LIVE
set :toys  = theDept("Toys");

set :food  = theDept("Food");

set :tools = theDept("Tools")
```

The `set` statement can also be used for assigning values to
functions for given arguments. To add another department named `Shoes`
to the database we can issue the statement:

```LIVE
create Department instances :shoes;

set name(:shoes) = "Shoes"
```

Here the first statement creates a new object of type `Department` and
assigns it to the session variable `:shoes`, while the second
statement assigns the value `"Shoes"` to `name(:shoes)`.

Now, let's create another type `Person` with properties `name`,
`dept`, and `income`:

```LIVE
create type Person;
create function name(Person) -> Charstring as stored;
create function dept(Person) -> Department as stored;
create function income(person) -> Number as stored
```

We can now create eight persons with this statement:

```LIVE
create Person(name, income, dept) instances
  :p1 ("Maja",    100, :toys),
  :p2 ("Bill",    200, :food),
  :p3 ("Bull",    300, :tools),
  :p4 ("Pelle",   400, :toys),
  :p5 ("Mons",    500, :food),
  :p6 ("Olle",    500, :toys),
  :p7 ("Birgitta",600, :tools),
  :p8 ("Murre",   700, :toys)
```

Here, the session variables `:p1, :p2,...` are bound to the new
objects of type `Person`. We use the previously defined session
variables `:toys`, `:food`, and `:tools` to link the created objects
to their departments.

Let's try some other queries:

**Get the names and incomes of all persons in the database:**

```LIVE
select name(p), income(p) from Person p
```

**Get the names of persons working in the department named 'Toys':**

```LIVE
select name(p)
  from Person p
 where name(dept(p)) = "Toys"
```

**Get the names and incomes of all persons ordered decreasingly by income:**

```LIVE
select name(p), income(p)
  from Person p
 order by income(p) desc
```

**Get the two highest paid persons:**

```LIVE
select name(p), income(p)
  from Person p
 order by income(p) desc
 limit 2
```

**Get the names and incomes of all persons earning more than 400 ordered by
their names:**

```LIVE
select name(p), income(p)
  from Person p
 where income(p) > 400
 order by name(p)
```

**How many persons are there in the database?**

```LIVE
count(select p from Person p)
```

**What is the total sum of the incomes of all persons?**

```LIVE
sum(select income(p) from Person p)
```

**What is average income of all persons?**

```LIVE
mean(select income(p) from Person p)
```
**What is the median income?**

```LIVE
median(select income(p) from Person p)
```

**Let's create another type `Account` with properties `id`, `owner`,
and `balance`:**

```LIVE
create type Account;
create function id(Account) -> Number as stored;
create function owner(Account) -> Person as stored;
create function balance(Account) -> Number as stored
```

**Create some accounts and assign them to the persons owning the
accounts:**

```LIVE
create Account(id, owner, balance) instances
  (1,:p1, 150),
  (2,:p1, 200),
  (3,:p2, 400),
  (4,:p2,  85),
  (5,:p2,  70),
  (6,:p3,  10),
  (7,:p5, 500),
  (8,:p6,  75),
  (9,:p6,  95),
  (10,:p7,105),
  (11,:p8, 90)
```
Here the session variables connect accounts to persons.

Let's make some more queries over accounts, persons, and departments.

**Get the balances of the accounts of the person named 'Bill':**

```LIVE
select balance(a)
  from Account a
 where name(owner(a)) = "Bill"
```

**Get the names and account balances of all persons in the 'Toys'
department:**

```LIVE
select name(p), balance(a)
  from Person p, Account a
 where name(dept(p)) = "Toys"
   and owner(a) = p
```

**Count the number of accounts per person in 'Toys' department:**

```LIVE
select name(p), count(a)
  from Person p, Account a
 where name(dept(p)) = "Toys"
   and owner(a) = p
 group by name(p)
```

**Compute the total balances of accounts per person in 'Toys'
department:**

```LIVE
select name(p), sum(balance(a))
  from Person p, Account a
 where name(dept(p)) = "Toys"
   and owner(a) = p
 group by name(p)
```

**Get the total balances for all persons in the database:**

```LIVE
select name(p), sum(balance(a))
  from Person p, Account a
 where owner(a) = p
 group by name(p)
```

**Get decreasingly ordered total balances of each person in the
database:**


```LIVE
select name(p), sum(balance(a))
  from Person p, Account a
 where owner(a) = p
 group by name(p)
 order by sum(balance(a)) desc
```

**What are the lowest incomes in each department?**

```LIVE
select name(d), min(income(p))
  from Department d, Person p
 where dept(p) = d
 group by name(d)
 order by min(income(p))
```

**Get the two departments with highest average incomes:**

```LIVE
select name(d), mean(income(p))
  from Department d, Person p
 where dept(p) = d
 group by name(d)
 order by mean(income(p)) desc
 limit 2
```

**For each person get the name, department name, income, and total
balance, ordered by total balance decreasingly:**

```LIVE
select name(p), name(d), income(p), sum(balance(a))
  from Department d, Person p, Account a
 where owner(a) = p
   and dept(p) = d
 group by name(p), name(d), income(p)
 order by sum(balance(a)) desc
```

User defined functions defined as a query are called **derived functions**.

The following derived function finds the **incomes higher than a given
threshold**. It is a derived function returning a bag (set with
duplicates) of numbers:

```LIVE
create function higherIncomes (Number thres) -> Bag of Number
  as select income(p)
       from Person p
      where income(p)>thres
```

Call function `highIncomes()`:

```LIVE
higherIncomes(500)
```

The function `highIncomesPers()` returns both **names** and
**incomes** of persons earning more than a threshold `thres`:

```LIVE
create function higherIncomePers (Number thres)
                                -> Bag of (Charstring nm, 
                                           Number inc)
  as select name(p), inc
       from Number inc, Person p
      where income(p)=inc
        and inc > thres
```

**Get the persons earning more than 100:**

```LIVE
higherIncomePers(500)
```

This function call returns the **k highest paid persons**:

```LIVE
create function highestIncomePers(Number k)
                                -> Bag of (Charstring name, Number inccome)
  as select name(p), income(p)
       from Person p
      order by income(p) desc
      limit k
```

**Get the two highest earners:**

```LIVE
highestIncomePers(2)
```

In the [next tutorial](/docs/md/tutorial/fusion-query.md) we develop a **fusion
model** that analyzes local shake detections on several edge devices
with accelerometers.


