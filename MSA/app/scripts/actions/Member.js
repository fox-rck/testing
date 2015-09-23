'use strict';
var constants = require('../api_constants')
, dispatch = require('../shared/dispatch')
, site_config = require('../site-config')
module.exports = {
	search: function(token, searchTerm) {
		dispatch(constants.MEMBER_SEARCHING)
		var data = {
			token: token
			, searchText: searchTerm
			, dataType: "json"
		};
		console.log(site_config.api_domain+site_config.api_version + "/member")
		$.ajax({
			url: site_config.api_domain+site_config.api_version + "/member",
			method: 'GET',
			data: data
		})
		.success(function(res) {
			dispatch(constants.MEMBER_SEARCH, res)
		})
		.error(function(res) {
			console.log(res)
			dispatch(constants.MEMBER_SEARCH_ERROR)
		});
	}
	, getOpportunities: function(token, memberId) {
		var data = {
			token: token
		};
		$.ajax({
			url: site_config.api_domain+site_config.api_version + "/member/"+memberId+"/opps",
			method: 'GET',
			data: data
		})
		.success(function(res) {
			dispatch(constants.MEMBER_OPPORTUNITIES,res)
		})
		.error(function(res) {
			dispatch(constants.MEMBER_OPPORTUNITIES_ERROR,res)
		});
	}
	, getOpportunity: function(token, memberId, oppId) {
		var data = {
			token: token
		};
		$.ajax({
			url: site_config.api_domain+site_config.api_version + "/member/"+memberId+"/opp"+oppId,
			method: 'GET',
			data: data
		})
		.success(function(res) {
			dispatch(constants.MEMBER_OPPORTUNITY,res)
		})
		.error(function(res) {
			dispatch(constants.MEMBER_OPPORTUNITY,res)
		});
	}
	, getActivities: function(token, memberId) {
		var data = {
			token: token,
			memberId: memberId
		};
		$.ajax({
			url: site_config.api_domain+site_config.api_version + "/member/"+memberId+"/activity",
			method: 'GET',
			data: data
		})
		.success(function(res) {
			dispatch(constants.MEMBER_ACTIVITY, res)
		})
		.error(function(res) {
			dispatch(constants.MEMBER_ACTIVITY_ERROR,res)
		});
	}
	, getOportunity: function(token, memberId, categoryId) {
		var data = {
			token: token,
			memberId: memberId,
			categoryId: categoryId
		};
		$.ajax({
			method: 'GET',
			data: data
		})
		.success(function(res) {
			dispatch(constants.MEMBER_OPPORTUNITY, res)
		})
		.error(function(res) {
			dispatch(constants.MEMBER_OPPORTUNITY_ERROR, res)
		});
	}
}