var React = require('react');
var Router = require('react-router');
var MemberStore = require('../stores/Member');
var memberHelpers = require('../shared/memberHelpers');
var memberActions = require('../actions/Member');
var storeMixin = require('../shared/storeMixin')
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
mixins:[storeMixin(MemberStore)]
, getInitialState: function() {
	return {
		category: null
		, store: MemberStore.getState()
		, coupon: "/images/coupon_1.png"
	};
}
,  getInitDataIfNeeded: function() {
	console.info("Get Category Details");
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Category Details component will recieve props");
}
, componentDidMount: function() {
	this.props.setPageTitle("Category Info")
	if (this.props.user === null) {
		window.location = "/#/login";
	} else {
		memberActions.getOpportunity(this.props.user.token, this.props.params.userId, this.props.params.categoryId);
	}
}
, componentWillUnmount: function() {

}
, goBack: function() {
	document.location = "/#/user/"+this.props.params.userId+"/member/"+this.props.params.memberId+"/details";
}
, _onChange: function(){
	this.setState({store: MemberStore.getState()});
}
, getSelectedMember: function() {
	return memberHelpers.getMemberById(this.props.params.memberId);
}
, redeemCoupon: function() {
	var img = this.state.coupon === "/images/coupon_1.png" ? "/images/coupon_2.png" : "/images/coupon_1.png"
	this.setState({coupon: img});
}
, render: function() {
	var member = this.getSelectedMember();
	return <div className="category-details">
		<button className="back-button" onClick={this.goBack}>
			{member !== null ? <span><i className="icon-arrow-left" />{" " + member.firstName + " " + member.lastName}</span>: ""}
		</button>
		<div className="clear"/>
		<h2>{this.state.store.selectedOpportunity != null ? this.state.store.selectedOpportunity.department : ""}</h2>
		<p>Donec at volutpat diam. Suspendisse potenti. Ut quis blandit mi. Fusce fermentum mollis mauris tempor dapibus.</p>
			<br />
		<hr />
		<br />
		<h2>Coupon Offers</h2>
		<br />
		<button onClick={this.redeemCoupon}>
			<img width="300	" src={this.state.coupon} />
		</button>
	</div>
}
});