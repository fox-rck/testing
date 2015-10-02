var React = require('react');
var Router = require('react-router');
var memberHelpers = require('../shared/memberHelpers');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitialState: function() {
	return { };
}
,  getInitDataIfNeeded: function() {
	console.info("Get the member profile info");
}
, componentWillReceiveProps: function(nextProps){
	console.log("Member Profile component will recieve props");
}
, componentDidMount: function() {
	
}
, getVip: function(user){
	return memberHelpers.getVip(user);
}
, componentWillUnmount: function() {

}	
, render: function() {
	var member = this.props.member;
	var info = member != null ? <div className="member-profile-info">
	<div className="member-photo">
		<img src={this.getVip(member).img} />
		<div className="vip-title"><strong className={this.getVip(member).color}>{this.getVip(member).title}</strong></div>
	</div>
	<div className="user-info">
		<h2>{member.firstName} {member.lastName}</h2>
		<p>ShopYourWay # {member.memberNumber.substring(0,4)}</p>
	</div>
</div> : "Member not found"
return <div>{info}</div>
}
});