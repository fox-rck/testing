module.exports.handleReq = function(req, res) {
	var requestHandler = require('../requestHandler');
	var rh = new requestHandler(req, res);
	rh.sendFile('auth/delete.json');
};