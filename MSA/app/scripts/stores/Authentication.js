'use strict';
var AppDispatcher = require('../shared/dispatcher')
, EventEmitter = require('events').EventEmitter
, constants = require('../api_constants')
, _ = require('underscore')

var _state = {
    // your state container where 
    profile: null
    , error: false
    , loading: false
};

var ProfileStore = _.extend({}, EventEmitter.prototype, {
    // Return State
    getState: function() {
        return _state;
    },
    addProfile: function(profile) {
        _state.profile = profile;
        _state.error = false;
        _state.loading = false;
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
    // Emit Change event
    emitChange: function() {
        // LocalStorage.addItemToStorage("auth_users", JSON.stringify(_state.users));
        this.emit('change');
    },
    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    } 
    , reset: function(){
        _state.profile = null;
        _state.error = false;
        _state.loading = false;
        this.emitChange();
    }   
});

ProfileStore.appDispatch = AppDispatcher.register(function(payload) {
    var action = payload.actionType;
    console.log(payload)
    switch(action) {
        case constants.AUTHENTICATING:
            ProfileStore.setLoading(true);
        break;
        case constants.AUTHENTICATION_ERROR:
            ProfileStore.setError(true);
        break;
        case constants.AUTHENTICATION_SUCCESS:
            ProfileStore.addProfile(payload);
        break;
        case constants.LOGOFF:
           ProfileStore.reset();
           window.location = "/#/";
        break;
    }
});
module.exports = ProfileStore;
