/* globals require, __dirname */
'use strict';


var api = require('..');
var http = require('http');

var port = '5050';

var cb = function(){
	console.log('APIs are ready to use');
	var req = http.get('http://localhost:' + port + '/test/12345/example.json', function(res) {
		res.setEncoding('utf8');
		res.on('data', function (body) {
			console.log('Got response: ' + res.statusCode);
			console.log(body);
			server.close();
		});
	}).on('error', function(e) {
		console.log('Got error: ' + e.message);
		server.close();
	});

	req.end();
};

var options = {
	path: 'test/raml',
	debug: true,
	watch: true,
	port: port,
	staticPath: __dirname
};

var server = api(options, cb);


