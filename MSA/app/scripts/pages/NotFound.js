var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitDataIfNeeded: function() {

}
, componentWillReceiveProps: function(nextProps){
}
, componentDidMount: function(){
	document.location = "/#/login";
}
, componentWillUnmount: function(){

}
, render: function() {
	return <div>
		Route Not Found
	</div>
}
});