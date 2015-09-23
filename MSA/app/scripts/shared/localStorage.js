module.exports = {
	addItemToStorage: function(key, val){
		if(typeof(Storage) !== "undefined") {
    	// Code for localStorage/sessionStorage.
    	 localStorage.setItem(key, val);
		} else {
		    // Sorry! No Web Storage support..
		}
	}
	, getItemFromStorage: function(key){
		var ret = null;
		if(typeof(Storage) !== "undefined") {

    	// Code for localStorage/sessionStorage.
    	if( localStorage.getItem(key) != null){
    		ret =  localStorage.getItem(key)
    	}
		} else {
		    // Sorry! No Web Storage support..
		}
		return ret;
	}
	, clearAllStorage: function(){
		var i = localStorage.length;
		while(i--) {
		  var key = localStorage.key(i);
		    localStorage.removeItem(key);
		}
	}
}