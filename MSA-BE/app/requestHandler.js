var fs = require('fs');

var requestHandler = function(req, res) {
	this.req = req;
	this.res = res;
};

requestHandler.prototype.sendFile = function(filepath) {
	this.res.send(fs.readFileSync(__dirname + '/' + filepath, {encoding: 'utf8'}));
};

module.exports = requestHandler;