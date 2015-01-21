# raml-mocker-server
Node module to run server mocking API described in RAML files



Objective
---
This plugin make use of [raml-mocker](https://github.com/RePoChO/raml-mocker) module. It run a [Express](http://expressjs.com/) server and configure endpoints and responce from RAML files.

How to use
---

Basic, this will create server on port 3030

```javascript
var api = require('raml-mocker-server');

var options = {
    path: 'test/raml' // path to folder with RAML files
};

var callback = function (){
    console.log('All RAML files parsed and API endpoints defined');
};

// returns created server
var server = api(options, callback);
```

* [test/testApp.js](test/testApp.js)

Add API to existing web server:

* [test/testAppExpress.js](test/testAppExpress.js)



Options
---

| Name        | Type          | Default value | Description                                                  |
| ----------- | ------------- | ------------- | -------------------------------------------------------------|
| port        | number        | 3030          | defines server port                                          |
| path        | string        | 'raml'        | path to raml folder, relative to the execution context       |
| prefix      | string, array | ''            | prefixing all API endpoints described in RAML                |
| debug       | boolean       |               | enable logging debug info to the console                     |
| watch       | boolean       |               | enable watching on RAML files                                |
| staticPath  | string        |               | defines path to the static folder                            |
| app         | object        |               | if server already exists you can pass express app,           |
|             |               |               | no need to specify *port* and *staticPath*                   |



#### History Log

##### 0.1.0
- update dependencies
- prefix could be an array
- update tests
