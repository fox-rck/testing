'use static';
var express = require("express")
, router = express.Router()
, http = require('http')
, bodyParser = require('body-parser')
, serveStatic = require('serve-static')

try {
  //Set Application Defaults
	var app = express();
  var port = 5005;
	app.set('title', 'KMART-MSA v1.0');
	app.set('port', port); 	
	app.use(bodyParser.json());
  // Set default index page
	app.use(serveStatic('./build', {'index': ['index.html', 'index.htm']}));
	app.use(serveStatic('./public', {'index': null}));
  //Start the server locally
	var server = http.createServer(app);
	server.listen(port, function () {
    var serverName = process.env.VCAP_APP_HOST ? process.env.VCAP_APP_HOST + ":" +(port) : '127.0.0.1:'+(process.env.PORT || port);
    console.log("Express server listening on " + serverName);
  });

} catch (ex) {
    console.log(ex)
}

