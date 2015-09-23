var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var storeMixin = require('./shared/storeMixin');
var Link = Router.Link;

var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
//mixins: [storeMixin(UserStore)]
getInitialState: function(){
	return {
		curUser: 0
		, curAccount: null
		, isInit: true
	}
}
, componentDidMount: function(props){
	
}

, goToLogin: function(id) {
		document.location = "/#/login";
}
, componentWillReceiveProps: function(nextProps){
	var curUsr = this.state.curUser;
	// Check if the url props have changed
	var newID = nextProps.params.userID;
	console.log("get "+ curUsr);
	if(curUsr != newID && newID != null) {
		// socket.disconnect();
		// var user = this.getActiveUser(newID);
		this.setState({curUser: newID, curAccount: user,})
	}
	//console.log(newID);
}
, getInitDataIfNeeded: function() {
	console.log("load init data")
}
, logOut: function() {
	// this.setState({curUser: null});
	// users.removeToken(this.state.curUser);
}
, _onChange: function() {
	// console.info("changeHit")
	// var user = UserStore.getActiveUser(this.props.params.userID);
	// this.setState({userStore: UserStore.getState(), curAccount: user, hasConnection:this.getConnectionStatus()});
}
, render: function() {
	
	return <div>
		<RouteHandler {...this.props} logOut={this.logOut} curAccount={this.state.curAccount} />
		<div className="push"></div>
	</div>
}
});