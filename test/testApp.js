/* globals require, __dirname */
'use strict';


var api = require('..');

var cb = function(){
	console.log('callback, stop the server');
	server.close();
};

var options = {
	path: 'test/raml',
	debug: true,
	watch: true,
	port: 5050,
	staticPath: __dirname
};

var server = api(options, cb);


