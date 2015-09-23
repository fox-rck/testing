var version = "1.0.0";
var apiPrefix = '/api/v1';
var listenPort = 5006;
var timerDelay = 500;
var colors = require('colors');
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());                 // auto cors, niiiice
app.use(bodyParser.json());      // magic that handles json posts X-|

var server = app.listen(listenPort, function() {
	console.log('Kmart MRC backend app listening at http://%s:%s', server.address().address, listenPort);
});

var router = express.Router();

// basic log for each request, and set response to application/json globally
router.use(function timeLog(req, res, next) {
	console.log(req.method + ' request for', req.path, 'at', new Date().toUTCString());
	res.type('json');
	next();
});

app.use(router);

app.route(apiPrefix)
	.all(function(req, res) {
		res.send(JSON.stringify({
			version: version
		}));

		// TODO check for valid session id here?

	});

app.route([
		apiPrefix + '/auth',
		apiPrefix + '/auth/:id'
])
	.get   (function(req, res) { setTimeout(function() {require(__dirname + '/auth/get').handleReq(req, res);}, timerDelay);    })
	.post  (function(req, res) { setTimeout(function() {require(__dirname + '/auth/post').handleReq(req, res);}, timerDelay);   })
	.delete(function(req, res) { setTimeout(function() {require(__dirname + '/auth/delete').handleReq(req, res);}, timerDelay); });

app.route(apiPrefix + '/member')
	.get(function(req, res) { setTimeout(function() {require(__dirname + '/member/search').handleReq(req, res);}, timerDelay); });

app.route(apiPrefix + '/member/:sywId/opps')
	.get(function(req, res) { setTimeout(function() {require(__dirname + '/member/opps').handleReq(req, res);}, timerDelay); });

app.route(apiPrefix + '/member/:sywId/activity')
	.get(function(req, res) { setTimeout(function() {require(__dirname + '/member/activity').handleReq(req, res);}, timerDelay); });

app.route(apiPrefix + '/member/:sywId/opp:oppId')
	.get(function(req, res) { setTimeout(function() {require(__dirname + '/member/opp').handleReq(req, res);}, timerDelay); });

app.route('*')
	.all(function(req, res) { console.error('  **  route not defined'.red); });