var React = require('react');
var Router = require('react-router');
var memberHelpers = require('../shared/memberHelpers');
var MemberDetails = require('./MemberInfoDetails');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitialState: function() {
	return {
		showDetailsPop: false
	 };
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
, toggleDetails: function(){
	this.setState({showDetailsPop: !this.state.showDetailsPop});
}	
, render: function() {
	var member = this.props.member;
	var info = member != null ? <div className="member-profile-info">
	<div className="member-photo">
		<img src={this.getVip(member).img} />
	</div>
	<div className="user-info">
		<h2 onClick={this.toggleDetails}>{member.firstName} {member.lastName}</h2>
		<p>SYW # {member.memberNumber.substring(0,4)}{" "}
		<span className="vip-title"><strong className={this.getVip(member).color}>{this.getVip(member).title}</strong></span>
		</p>
	</div>
</div> : "Member not found";
var detailsPop = this.state.showDetailsPop ? <MemberDetails {... this.props} back={this.toggleDetails}/> : ""
return <div>{info}
{detailsPop}
</div>
}
});