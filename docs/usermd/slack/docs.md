# Creating a slack bot.

This model shows you a sample implementation of SA Engine using the slack REST-API to post messages to a channel. It can be generalized to use SA Engine for any type of HTTP(S) interface.

> [note] **Note:**  Before you start you must create a slack-app with permissions to post messages on your desired channels.

Before calling the Slack API:s you have to acquire a slack-token for the application and populate the function `slack:token`.

You can do this in many different ways; including reading the token from a file using `read_file`, taking it from an environment variable using `getenv` or just adding it in the OSQL file (highly ill advised!).

```
set slack:token() = getenv("SA_SLACK_TOKEN");
```

After the `slack:token` is set you can use `slack:list_channels()` to list channels and their IDs.

Now select an ID and post your first message:

``` 
 slack:post_message("<channel-id-string>","Hello Slack, this is sa.engine!");
```

You should now have something similar to this in your slack channel:

![](https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/slack-guide/result.png)