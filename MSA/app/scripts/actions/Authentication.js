'use strict';
var constants = require('../api_constants')
, dispatch = require('../shared/dispatch')
, site_config = require('../site-config');
module.exports = {
	authenticate: function(username, password) {
		dispatch(constants.AUTHENTICATING)
		var data = {
			name: username
			, password: password
		};
		$.ajax({
			url: site_config.api_domain+site_config.api_version + "/auth",
			method: 'POST',
			data: data
		})
		.success(function(res) {
			var body = res;
			if (body.error !== true) {
				dispatch(constants.AUTHENTICATION_SUCCESS, body)
			} else {
				dispatch(constants.AUTHENTICATION_ERROR)
			}
		})
		.error(function(res) {
			dispatch(constants.AUTHENTICATION_ERROR)
		});
	}
	, logoff: function(token) {
		var data = {
			token: token
		};
		$.ajax({
			url: site_config.api_domain+site_config.api_version + "/auth",
			method: 'DELETE',
			data: data
		})
		.success(function(res) {
			dispatch(constants.LOGOFF, res)
		})
		.error(function(res) {
			console.log("Logoff Error")
		})
	}
	, sessionCheck: function(token) {
		var data = {
			token: token
		};
		$.ajax({
			method: 'GET',
			data: data
		})
		.success(function(res) {
				console.log("session still valid")
		})
		.error(function(res) {
			this.logoff(token);
		});
		//{actionType:constants.ALERTS_GET,payload:data}
	}
}