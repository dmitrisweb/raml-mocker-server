/* globals require, module, console  */
'use strict';

var _ = require('lodash');
var express = require('express');
var chokidar = require('chokidar');
var ramlMocker = require('raml-mocker');

var options;
var requestsMap = {};
var app;

var defaults = {
	port: 3030,
	path: 'raml',
	prefix: ''
	// watch: true, // watching
	// debug: true, // shows logs
};


var colors = {default: '\x1b[0m', green: '\x1b[32m', qyan: '\x1b[36m'};

/**
 * Initializing RAML mocker server
 * @param  {Function} cb    callback executed af
 * @param  {Object}   prefs configuration object
 * @return {[type]}         [description]
 */
function init (prefs, callback) {
	options = _.extend(defaults, prefs);
	app = options.app || express();

	ramlMocker.generate(options, process(function(requestsToMock){
		requestsToMock.forEach(function(reqToMock){
			addRoute(reqToMock);
		});
		log(new Array(30).join('='));
		log('%s[%s]%s API routes generated', colors.qyan, requestsToMock.length, colors.default);

		if(typeof callback === 'function'){
			callback(app);
		}
	}));

	var watcher = watch();
	var server = launchServer(app);

	function close () {
		if (watcher) { watcher.close(); }
		if (server) { server.close(); }
	}

	return {
		close: close,
		server: server,
		watcher: watcher
	};
}


function log (){
	if(options.debug){
		console.log.apply(console, arguments);
	}
}


function process (callback) {
	return function (requestsToMock) {
		requestsToMock.forEach(function(reqToMock){
			requestsMap[reqToMock.method + '!' + reqToMock.uri] = reqToMock;
		});
		if(typeof callback === 'function'){
			callback(requestsToMock);
		}
	};
}


function launchServer (app){

	// intercept OPTIONS method
	app.options('*', function(req, res) {
		res.status(200).send();
	});

	if (!options.app) {

		// set static location
		if(options.staticPath){
			app.use(express.static(options.staticPath));
		}


		// CORS middleware
		if(options.cors){
			app.use(function(req, res) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			});
		}


		console.log('Listening on port ' + options.port);
		return app.listen(options.port);
	}
}

function watch (){
	if(options.watch){
		var watcher = chokidar.watch(options.path, {ignored: /[\/\\]\./, persistent: true});
		watcher.on('change', function(path) {
			log('File modified: ', path);
			ramlMocker.generate(options, process());
		});
		return watcher;
	}
}

function addRoute (reqToMock){

	var prefixes = _.isArray(options.prefix) ? options.prefix : [options.prefix];
	var method = reqToMock.method;

	log(colors.qyan + method + colors.default, '\t', reqToMock.uri);

	prefixes.forEach(function(prefix){
		var uri = prefix + reqToMock.uri;

		app[method](uri, function(req,res){
			var mockObj = requestsMap[method + '!' + reqToMock.uri];
			if(mockObj){
				var response = mockObj.mock() || mockObj.example();
				res.status(mockObj.defaultCode || 200).send(response);
			} else {
				res.status(404).send();
			}
			log(colors.green + method + colors.default, '\t', uri);
		});
	});
}


module.exports = init;