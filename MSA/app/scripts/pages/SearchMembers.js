var React = require('react');
var Router = require('react-router');
var memberActions = require('../actions/Member');
var storeMixin = require('../shared/storeMixin');
var MemberStore = require('../stores/Member');
var Loader = require('../components/Loading');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
mixins:[storeMixin(MemberStore)]
, getInitialState: function() {
	return {
		scanCard: false,
		store: MemberStore.getState(),
		required: false
	};
}
,  getInitDataIfNeeded: function() {
	
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Search Members component will recieve props");
}
, componentDidMount: function() {
	MemberStore.reset();
	this.props.setPageTitle("Member Lookup")
}
, componentWillUnmount: function() {

}
, searchMembers: function(e) {
	e.preventDefault();
	//TODO: this is for demo only, will not be used in live app
	//document.location = "/#/user/"+this.props.params.userId+"/member/select";

	var term = this.refs.term.getDOMNode().value;
	MemberStore.setTerm(term);
	var req = false;
	if (term.length <= 0) {
		req = true;
	} else {
		memberActions.search(this.props.user.token, term );
	}
	this.setState({required: req});
}
, goToDetailScreen: function() {
	//TODO: this is for demo only, will not be used in live app
	//document.location = "/#/user/"+this.props.params.userId+"/member/0/details";
	alert("trigger scan")
}
, toggleScanCard: function(e) {
	e.preventDefault();
	this.setState({scanCard: !this.state.scanCard});
}
, _onChange: function() {
	console.log("search change")
	var store = MemberStore.getState();
	//alert(store.members)
	if(store.members !== null) {
		var url;
		if (store.members.length === 1) {
			//alert(store.members[0].memberNumber)
			// url = "/#/user/" + this.props.params.userId + "/member/"+store.members[0].memberNumber+"/details";
			// console.log(url)
			this.props.router.transitionTo("details", {userId: this.props.user._id, memberId:store.members[0].memberNumber})
			//window.location = url
		} else if (store.members.length > 1) {
			//alert(store.members[0].memberNumber)
			// url = "/#/user/" + this.props.params.userId + "/member/"+(this.refs.term.getDOMNode().value || "")+"/select";
			// console.log(url);
			this.props.router.transitionTo("select", {userId: this.props.user._id, term:this.refs.term.getDOMNode().value})
			//window.location = url;
		}
	}
	this.setState({store: store})

}
, render: function() {
	var req = this.state.required ? <div className="error">A search term is required</div> : "";
	var loading = this.state.store.loading ? <Loader /> : "";
	var searchView = !this.state.scanCard ? <div>
		<div className="member-wrapper" />
		<form className="search-form">
			{req}
			<input className="full-width search-term" ref="term" type="text" placeholder="Enter Phone #, Name or SYW #" />
			<button className="" onClick={this.searchMembers}>Search</button>
			<div className="divider" />
			<p className="heading">Tap below to scan <strong className="syw">ShopYourWay</strong> 	code</p>
			<button className="" onClick={this.toggleScanCard}> Scan Code</button>
		</form> 
	</div> : <div>
		<h2>Scan View</h2>
		<img src="/images/qrCode.jpg"/>
		<br/>
		<button className="stacked" onClick={this.goToDetailScreen}>Scan</button>
		<button className="stacked" onClick={this.toggleScanCard}>Cancel</button>
	</div>
	return 	<div className="search-member-wrapper">
		{loading}
		{searchView}
	</div>
}
});