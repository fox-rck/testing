var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitDataIfNeeded: function() {
	console.info("Check if member has been pulled already");
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Member component will recieve props");
}
, componentDidMount: function() {
	
}
, componentWillUnmount: function() {

}
, goToNextScreen: function() {
	//TODO: this is for demo only, will not be used in live app

}
, render: function() {
		return <div id="member">
			<div className="member-wrapper">
				<RouteHandler {...this.props} />
			</div>
		</div>
}
});