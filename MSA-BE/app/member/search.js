module.exports.handleReq = function(req, res) {
	var requestHandler = require('../requestHandler');
	var rh = new requestHandler(req, res);
	console.log(req.query.searchText)
	if (req.query.searchText === 'abc') {
		rh.sendFile('member/search-single.json');
	} else {
		rh.sendFile('member/search-multiple.json');
	}

};