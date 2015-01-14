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

**Defaults**

 * port: 3030,
 * path: 'raml',
 * prefix: ''

**Options**

 * **port**: 7777            // defines server port
 * **path**: "path/to/raml"  // path is relative to execution context
 * **prefix**: "/api/v1"     // prefixing all API endpoints described in RAML
 * **debug**: true           // enable logging debug info to console
 * **watch**: true           // enable watching on RAML files
 * **staticPath**: __dirname // defines path to static
 * **app**: express()        // if server already exists you can pass it, no need to specify *port* and *staticPath*


#### History Log
##### 0.1.0
- initial commit
