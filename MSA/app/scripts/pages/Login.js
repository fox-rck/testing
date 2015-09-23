var React = require('react');
var authActions = require('../actions/Authentication')
var storeMixin = require('../shared/storeMixin')
var Loader = require('../components/Loading')
var AuthStore = require('../stores/Authentication')
var Header =  require('../components/Header');
module.exports = React.createClass({
mixins:[storeMixin(AuthStore)]
, getInitialState: function() {
	return {
		store: AuthStore.getState()
		, required: false
	}
}
, getInitDataIfNeeded: function() {
	console.info("Check server if authentication already exists");
}
, componentWillReceiveProps: function(nextProps){
	console.log("Login component will recieve props");
}
, componentDidMount: function() {
	
}
, componentWillUnmount: function() {

}
, authenticate: function() {
	//TODO: this is for demo only, will not be used in live app
	var UN = this.refs.UN.getDOMNode().value;
	var PW =  this.refs.PW.getDOMNode().value;
	var req = false;
	if (UN.length <= 0 || PW.length <= 0) {
		req = true;
	} else {
		authActions.authenticate(UN, PW);
	}
	this.setState({required: req});
}
, _onChange: function() {
	console.log("changed")
	this.setState({store: AuthStore.getState()});
	var profile = AuthStore.getState().profile
	if (profile !== null) {
		this.props.router.transitionTo("search", {userId: profile._id})
	}
}
, render: function() {
	console.log(this.props)
	var loading = this.state.store.loading ? <Loader /> : "";
	var error = this.state.store.error ? <div className="error">We could not authenticate you with the provided credentials</div>: "";
	var req = this.state.required ? <div className="error">An Enterprise Id and Password are required</div> : "";
	return <div id="login">{loading}
		<Header {...this.props} title={"Employee Login"} />
		<div className="login-wrapper page-wrapper">
			<img className="login-logo" height="75" width="75" src="images/logo-1.jpg" />
			{error}{req}
			<input className="full-width" ref="UN" type="text" placeholder="Enterprise Id" />
			<input className="full-width" ref="PW"  type="text" placeholder="Enterprise Password" />
			<button className="" onClick={this.authenticate}>Submit</button>
		</div>
	</div>
}
});