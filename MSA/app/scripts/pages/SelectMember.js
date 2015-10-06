var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore');
var storeMixin = require('../shared/storeMixin');
var memberHelpers = require('../shared/memberHelpers');
var MemberStore = require('../stores/Member');
module.exports = React.createClass({
mixins:[storeMixin(MemberStore)]
, getInitialState: function() {
	return {
		scanCard: false,
		store: MemberStore.getState()
	};
}
,  getInitDataIfNeeded: function() {

}
, componentWillReceiveProps: function(nextProps) {
	console.log("Select Member component will recieve props");
}
, componentDidMount: function() {
	this.props.setPageTitle("Search Results")
}
, componentWillUnmount: function() {

}
, selectMember: function (memberNumber) {
	document.location = "/#/user/"+this.props.params.userId+"/member/"+memberNumber+"/details";
}
// , goToNextScreen: function(id) {
// 	//TODO: this is for demo only, will not be used in live app
// 	document.location = "/#/user/"+this.props.params.userId+"/member/"+id+"/details";
// }
, getVip: function(user){
	return memberHelpers.getVip(user);
}
, toggleScanCard: function() {
	this.setState({scanCard: !this.state.scanCard});
}
, _onChange: function() {
	var store = MemberStore.getState();
	this.setState({store: store})

}
, render: function() {
	var that = this;
	var list =  this.state.store.members !== null ? this.state.store.members.map((user) =>
		<li className="user-listing">
			<button className="full-width clearfix" onClick={that.selectMember.bind(that, user.memberNumber)}>
				<div className="member-photo">
					<img src={that.getVip(user).img} />
					<div className={"vip-title "+that.getVip(user).color}>
						<strong>{that.getVip(user).title}</strong>
					</div>
				</div>
				<div className="listing-body">
				<h3>{user.firstName} {user.lastName}</h3>
					<ul>
						<li>{user.emailAddress}</li>
						{user.phoneNumbers.map((number) =>
							<li>{number.phoneNumber}</li>
						)}
						<li>{user.address1} {user.address2}</li>
						<li>{user.city}, {user.state} {user.zipCode}</li>
					</ul>
					<span className="next">VIEW</span>
				</div>
			</button>
		</li>
	) : "No members found"
	return  <div className="member-select">
		<h3>{this.state.store.members?this.state.store.members.length:0} results for <strong>'{this.props.params.term}'</strong></h3>
		<ul className="select-list">
			{list}
		</ul>
	</div>
}
});