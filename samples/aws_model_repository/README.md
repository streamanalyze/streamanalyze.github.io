# SA pulic repository template.
This folder contains the cloud formation template used for the public SA Engine model repository.

This example uses cloudfornt for delivery of models from an AWS S3 bucket. SA Engine attaches a JSON 
Web Token to each request which is verified using a Lambda@Edge function.

Cloudformation architecture:
```
+-----------------------+
|           JWT token   |
|       XXX verification|
|       XXX             |                     +------------------+
|         XX            |                     |                  |
|          XX           |    sa/cf/jwt_key    |                  |
|           XX          <---------------------+AWS secret manager|
|        XX  XX         |                     |                  |
|       XX    XX        |                     |                  |
|      XX      XXX      |                     +------------------+
|     XX       XXX      |
|                       |
+-----------+-----------+
            ^
            |
            | viewer-request
            |
            |
+-----------+-----------+                   +------------------+
|                       |                   |                  |
|    Cloudfront CDN     +------------------>+   AWS S3 Bucket  |
|                       |                   |                  |
+-----------+-----------+                   +------------------+
            ^
            |
            |
            +
GET /public/{model}/{version}?jwt={jwt}

```


> **NOTE**: You could use any other standard tech for serving files via HTTP/REST with the same principle.



## cf.yaml

`cf.yaml` is the cloud formation file for this setup. 
The template contains everything except the AWS secret
manager and the certificate for the cloudfront domain.

Before using this you need to:

1. Generate JWT secret and put into your secrets manager on AWS.
2. specify domain and:
3. certificate for you cloudfront instance.


### JWT-secret
Before you create the stack you need to put a JSON Web Token Secret into your AWS secrets manager in region
us-east-1:

```
secretName: sa/cf/jwt_key
{
    "key": <JWT-Secret key>
}
```


### Create stack with domain and certificate
Create a stack with the following command (replace values between `<>` with your own vaues).

```bash
aws cloudformation create-stack --region us-east-1 \
                                --stack-name <STACK-NAME> \
                                --capabilities CAPABILITY_IAM \
                                --parameters ParameterKey=DomainName,ParameterValue=<DESRIED-DOMAIN-NAME> \
                                             ParameterKey=CertArn,ParameterValue=<AWS-CERTIFICATE-ARN> \
                                --template-body file://cf.yaml
```


### Generate JWT for users:
Create a JWT with one key in it (`sub`). This can be done with any JWT tools, JWT.io is easy to get started with.

The sub field contains the list of prefixes that the bearer of the token is allowed to access.

i.e. the token:

```
{
    "sub": ["public", "test"]
}
```

will allow the bearer to access models from S3 files with the prefix `/public/` and `/test/`

You can add not before (nb) and expiry 

Then register your repository in SA Engine

```osql
set models:repository("my.repo.test") = {
        "url": "<DESRIED-DOMAIN-NAME>",
        "base_path": #"aws_cf:url_generator",
        "org": "test",
        "jwt": "<JWT-generated-from-secret>",
        "http_headers": {}
};  

set models:repository("my.repo.public") = {
        "url": "<DESRIED-DOMAIN-NAME>",
        "base_path": #"aws_cf:url_generator",
        "org": "public",
        "jwt": "<JWT-generated-from-secret>",
        "http_headers": {}
};  

//will result in GET <DESRIED-DOMAIN-NAME>/test/model1@1.0.s.fcz?jwt=<JWT-generated-from-secret>
models:import("my.repo.test","model1","1.0");


//will result in GET <DESRIED-DOMAIN-NAME>/public/model1@1.0.s.fcz?jwt=<JWT-generated-from-secret>
models:import("my.repo.public","model1","1.0");
```
