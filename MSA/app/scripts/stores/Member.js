'use strict';
var AppDispatcher = require('../shared/dispatcher')
, EventEmitter = require('events').EventEmitter
, constants = require('../api_constants')
, _ = require('underscore')

var _state = {
    // your state container where 
    members: null
    , term: ""
    , error: false
    , loading: false
    , opportunitiesLoading: false
    , opportunities: null
    , selectedOpportunity: null
    , activityLoading: false
    , activities: null
};

var MemberStore = _.extend({}, EventEmitter.prototype, {
    // Return State
    getState: function() {
        return _state;
    },
    addMembers: function(profiles) {
    	console.log(profiles)
        _state.members = profiles;
        _state.error = false;
        _state.loading = false;
        this.emitChange();
    },
    setTerm: function(val) {
        _state.term = val;
        this.emitChange();
    },
    setLoading: function(val) {
        _state.loading = val;
        this.emitChange();
    },
    setError: function(val) {
        _state.error = val;
        _state.loading = false;
        this.emitChange();
    },
    addOpportunities: function(opps) {
    	_state.opportunities = opps;
    	_state.opportunitiesLoading = false;
    	this.emitChange();
    },
    setOpportunity: function(opp) {
    	_state.selectedOpportunity = opp;
    	this.emitChange();
    },
    addActivities: function(acts) {
    	_state.activities = acts;
    	_state.activityLoading = false;
    	this.emitChange();
    },
    // Emit Change event
    emitChange: function() {
        // LocalStorage.addItemToStorage("auth_users", JSON.stringify(_state.users));
        this.emit('change');
    },
    getMemberById: function(id) {
    	var fnd = null;
    	_.each(_state.members, function(mem) {
    		if (mem.memberNumber === id) {
    			fnd = mem;
    		}
    	})
    	return fnd;
    } ,
    getCategoryById:function(id) {
    	var fnd = null;
    	_.each(_state.opportunities, function(opp) {
    		if (opp.oppId === id) {
    			fnd = opp;
    		}
    	})
    	return fnd;
    } , 
    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    } 
    , reset: function(){
        _state.members = null;
        _state.error = false;
        _state.loading = false;
        _state.selectedOpportunity = null;
        _state.term = "";
        this.emitChange();
    } 
    , softReset: function(){
        _state.opportunities = null;
        _state.activities = null;
        this.emitChange();
    }    
});

MemberStore.appDispatch = AppDispatcher.register(function(payload) {
    var action = payload.actionType;
    switch(action) {
        case constants.MEMBER_SEARCHING:
            MemberStore.setLoading(true);
        break;
        case constants.MEMBER_SEARCH_ERROR:
            MemberStore.setError(true);
        break;
        case constants.MEMBER_SEARCH:
           MemberStore.addMembers(payload);
        break;
        case constants.MEMBER_OPPORTUNITIES:
            MemberStore.addOpportunities(payload);
        break;
        case constants.MEMBER_ACTIVITY:
            MemberStore.addActivities(payload);
        break;
        case constants.MEMBER_OPPORTUNITY:
        	MemberStore.setOpportunity(payload);
        break;

    }
});
module.exports = MemberStore;
