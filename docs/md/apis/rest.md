#REST api
The REST api can be used to control the sa.engine server using REST requests.

Since the output of sa.egine queries are streaming data of possibly infite size 
you need to access the data of posted streams via a console REPL, the visual 
analyzer or any of the programatic API:s like Javascript, C or Java.

##Endpoints
Each endpoint needs to have a query parameter `token` with the API token for
the rest API. To run the examples you have to install the package "request"
for nodejs:

```
npm install -g request
```

### GET /rest/:server/statement
Get all active statements in server `:server`

**Respose:**
```JSON
[
    {
        "Name": <STATEMENT-ID>,
        "Statement": "<STATEMENT>",
        "Sinkhandler": "<SINK-HANDLER>",
        "Thid": <THREAD-ID>
    }
    ...
]
```
**Nodejs request example:**
```JavaScript
var request = require("request");

var options = {
  method: 'GET',
  url: 'http://localhost:3001/rest/server/statement',
  qs: { token: '<YOUR-API-TOKEN>' },
  headers:
  {
    'cache-control': 'no-cache',
    Host: 'localhost:3001',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.11.0'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### GET /rest/:server/statement/:id
Get info on posting on server `:server` with id `:id`.

**Response:**
```JSON
{
  "Name": <STATEMENT-ID>,
  "Statement": "<STATEMENT>",
  "Sinkhandler": "<SINK-HANDLER>",
  "Thid": <THREAD-ID>
}
```
**Nodejs request example:**
```JavaScript
var request = require("request");

var options = {
  method: 'GET',
  url: 'http://localhost:3001/rest/server/statement/<STATEMENT-ID>',
  qs: { token: '<YOUR-API-TOKEN>' },
  headers:
  {
    'cache-control': 'no-cache',
    Host: 'localhost:3001',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.11.0'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```



### POST /rest/:server/statement
Post a new statement to be run server `:server`. 

**Post body:**
```JSON
{
  "query": string query to be posted,
}
```

**response:**
```JSON
{
  "id": number
}
```
**Nodejs request example:**
```JavaScript
var request = require("request");
var body = { query: "heartbeat(0.1)" };
var options = {
  method: 'POST',
  url: 'http://localhost:3001/rest/server/statement',
  qs: { token: '<YOUR-API-TOKEN>' },
  headers:
  {
    'cache-control': 'no-cache',
    Host: 'localhost:3001',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.11.0',
    'Content-Type': 'application/json'
  },
  body: body,
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

### DELETE /rest/:server/statement/:id
Stop statement with id `:id` on server `:server`  

**Response:**
```JSON
{
  "id": Number, id of cancelled statement.
}
```

**Nodejs request example:**
```JavaScript
var request = require("request");

var options = {
  method: 'DELETE',
  url: 'http://localhost:3001/rest/server/statement/<STATEMENT-ID>',
  qs: { token: '<YOUR-API-KEY>s' },
  headers:
  {
    'cache-control': 'no-cache',
    'content-length': '',
    Host: 'localhost:3001',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.11.0'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```