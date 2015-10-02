var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var MemberProfileDetails = require('../components/MemberProfileInfo');
var memberActions = require('../actions/Member');
var RankedCategories = require('../components/RankedCategories');
var RecentActivity = require('../components/RecentActivity');
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
	console.info("Check if member details already exist");
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Member Details component will recieve props");
}
, componentDidMount: function() {
	this.props.setPageTitle("Member Info")
	if (this.props.params.memberId == null || this.props.params.memberId === 'undefined' || this.props.user === null) {
		//document.location = "/#/user/"+this.props.params.userId+"/member/search";
	} else {
		// Load Opportunities
		memberActions.getOpportunities(this.props.user.token,this.props.params.memberId)
		// Load Activity
		memberActions.getActivities(this.props.user.token,this.props.params.memberId)
	}
}
, getSelectedMember: function(id) {
	return memberHelpers.getMemberById(this.props.params.memberId);
}
, componentWillUnmount: function() {
	MemberStore.softReset();
}
, goBack: function() {
	document.location = "/#/user/"+this.props.params.userId+"/member/"+MemberStore.getState().term+"/select";
}
, _onChange: function() {
	var store = MemberStore.getState();
	this.setState({store: store})

}
, sendFeedback: function(e) {
	e.preventDefault();
	alert("Your feedback request has been sent");
}
, render: function() {
	var member = this.getSelectedMember(this.props.params.memberId);
	var memberCount = MemberStore.getState().members !== null ? MemberStore.getState().members.length : 0;
	var results = memberCount > 1 ? <button className="back-button" onClick={this.goBack}>
			{member !== null ? <span><i className="icon-arrow-left" /> Results</span>: ""}
		</button> : ""
	return <div id="member-details">
		<div>
			{results}
			<MemberProfileDetails {...this.props} member={member} />
			<RankedCategories {...this.props} member={member} opps={this.state.store.opportunities} loading={this.state.store.opportunitiesLoading}/>
			<div className="text-center">
				<button className="feedback" onClick={this.sendFeedback}>SEND FEEDBACK SURVEY</button>
			</div>
			<br />
			<RecentActivity {...this.props} member={member} acts={this.state.store.activities} loading={this.state.store.activitiesLoading}/>
		</div>
	</div>
}
});