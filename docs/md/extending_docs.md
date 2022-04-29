# Adding documentation to user models

Documentation can be added to your models by following a few steps. This section assumes that you have basic knowledge about creating and loading user models in sa.engine.

These steps include adding markdown files with documentation text and a `summary.json` file containing
the structure of the markdown files. At the end of this section there is a runnable example that will generate a model with documentation.

## Adding markdown files to model

This can either be done from your regular file system or through sa.studio.

If we have a model called **my_documented_model** that we want to document we should at least have the following files:

```
<model-folder>
|
| - master.osql
| - summary.json
| - docs.md
```

Add the following inside `summary.json`

```
["my_documented_model", "docs.md"]
```

The general format is:

```
["<Main section title>", "<main-markdown-file>", [
    ["<Section title1>", "<section-markdown-file>"],
    ["<Section title2>", "<section-markdown-file>"],
    ...
    ["<Section titleN>", "<section-markdown-file>"],
]]
```

Then add some markdown content to `docs.md`.

If you do not want to generate your own files create a new model with:

```LIVE
create_model("my_documented_model");
```

Now load the newly generated model:

```LIVE
load_model("my_documented_model");
```

Now refresh this documentation page and look at the bottom of the listing to the left, you should see a section called **my_documented_model**.

# Adding live code examples to documentation

To add live code examples to documentation all you need to to is adding `LIVE` after the code block start.
For instance, the following:

<pre><code>&#96;&#96;&#96;LIVE
<br/>
1+1;
<br/>
&#96;&#96;&#96;</code></pre>

will produce:

```LIVE
1+1;
```

## Visualization

To change visualization, you can add a JSON-object after the LIVE tag:

<pre><code>&#96;&#96;&#96;LIVE {"vis": "Line plot"}
<br/>
sin(iota(1,200)/50)
<br/>
&#96;&#96;&#96;</code></pre>

will produce:

```LIVE
sin(iota(1,200)/50)
```

The JSON-object has the format:

```
{"vis": "<Name of visualization method>"}
```

Where the name of the visualization method is the same as the ones you see on the dropdown when selecting visualization. For example:

* `Line plot`
* `Bar plot`
* `Scatter plot`
* `p-coords`


## Select device

To change device the code runs on, you can add a "peer" element to a JSON-object after the LIVE tag.

Examples:

```
LIVE {"peer":"Server"}
```

```
LIVE {"peer":"Linux-edge"}
```

The "peer" element can be combined with the "vis" element, like this:

```
LIVE {"peer": "Linux-edge", "vis": "Line plot"}
```


> [note]    **Note:** You can edit the current section from the documentation by pressing <code>Shift-Enter</code> or the edit button at the typ.

# Writing mathmatical formulas

The documentation in sa.studio supports [Katex](https://katex.org/).

Use latex tag for latex:

<pre><code>&#36;&#36;
\sum_{i=1}^n i^3 = \left( \frac{n(g(n)+1)} 2 \right) ^2
&#36;&#36;</code></pre>

$$
\sum_{i=1}^n i^3 = \left( \frac{n(g(n)+1)} 2 \right) ^2
$$

You can use `$ g(x) = 3x^4 + 2x^2 $` to inline it  $ g(x) = 3x^4 + 2x^2 $

> [note] **Note:** There are some known issues with editing element with Katex. After an update they will not be rendered correctly. Do a refresh and look at the page re-rendered after editing to work around this issue

## Adding boxes with information

Boxes like the note above are made by combining a block quote `>` with a tag `[type]`.
The valid tags are:

* `note`
* `exercise`
* `tip`
* `warning`

### Note

```markdown
> [note] **Note:**
```

> [note] **Note:**

### Exercise

```markdown
> [exercise] **Exercise:**
> With several lines
```

> [exercise] **Exercise:**
> With several lines

### Tip

```markdown
> [tip] **Tip:**  With code inside:
>  ```
>  This is code
>  ```

```

> [tip] **Tip:**  With code inside:
>  ```
>  This is code
>  ```

### Warning

```
> [warning] **Warning:**
```

> [warning] **Warning:**


# Extended Markdown syntax support

## Tables

The documentation supports [Markdown tables](https://www.markdownguide.org/extended-syntax/#tables).

Example:

```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

Is rendered as:

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

