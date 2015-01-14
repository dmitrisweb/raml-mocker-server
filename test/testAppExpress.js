/* globals require, console */
'use strict';


var api = require('..');
var express = require('express');
var app = express();

var cb = function(){
	console.log('callback, stop the server');
	watcher.close();
	server.close();
};

var options = {
	path: 'test/raml',
	debug: true,
	watch: true,
	app: app,
	prefix: '/api'
};

var watcher = api(options, cb);


console.log('Listening on port 3000');
var server = app.listen(3000);


