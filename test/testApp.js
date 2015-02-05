/* globals require, __dirname, console */
'use strict';


var api = require('..');
var http = require('http');
var Q = require('Q');

var port = '5050';


function get (path){
	var dfd =  Q.defer();

	var req = http.get('http://localhost:' + port + path, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (body) {
			console.log('Got response: ' + res.statusCode);
			console.log(body);
			dfd.resolve();
		});
	}).on('error', function(e){
		dfd.reject(new Error(e.message));
	});

	req.end();

	return dfd.promise;
}


function cb (app){

	console.log('APIs are ready to use');

	// Add custome route
	app.get('/custom', function(req,res){
		res.status(200).send('custom url');
	});

	Q.all([
		get('/custom'),
		get('/test/12345/example.json'),
		get('/api/test/12345/objectDef')
	]).then(function(){
		console.log('DONE');
		server.close();
	});
}


var options = {
	path: 'test/raml',
	debug: true,
	watch: true,
	port: port,
	prefix: ['', '/api'],
	staticPath: __dirname
};


var server = api(options, cb);

