var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var storeMixin = require('../shared/storeMixin')
var AuthStore = require('../stores/Authentication')
var Header =  require('../components/Header');
module.exports = React.createClass({
mixins:[storeMixin(AuthStore)]
, getInitialState: function() {
	return {
		store: AuthStore.getState()
	}
}
, getInitDataIfNeeded: function() {
	console.log("Check if logged in user exists");

}
, componentWillReceiveProps: function(nextProps) {
	console.log("User component will recieve props")
	console.log(this.props)
}
, componentDidMount: function() {
	console.log(this.props);
	if (this.state.store.profile == null) {
		window.location = "/#/login";
	}
}
, setPageTitle: function(title){
	this.setState({pageTitle: title});
}
, componentWillUnmount: function() {

}
, _onChange: function() {
	this.setState({store: AuthStore.getState()})
}
, render: function() {
	return <div id="user">
		<Header {...this.props} user={this.state.store.profile} title={this.state.pageTitle} />
		<div className="page-wrapper">
			<RouteHandler {...this.props} user={this.state.store.profile} setPageTitle={this.setPageTitle}/>
		</div>
	</div>
}
});