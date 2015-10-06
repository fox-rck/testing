var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitialState: function() {
	return {
		activities: []
		, showCount: this.minShow
	};
}
, minShow: 5
,  getInitDataIfNeeded: function() {
	console.info("get Recent Activity for user");
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Recent Activity Updating");
	console.log(nextProps)
	if (nextProps.acts != null) {
		this.setState({activities: nextProps.acts});
	}
}
, componentDidMount: function() {
	console.log("Recent Activity component did mount");
	//TODO: remove this for prod, for demo only
	
}
, toggleCollectionSize: function() {
	var cursize = this.state.showCount;
	var maxSize = this.state.activities.length;
	var newSize = 0;
	if (cursize < maxSize) {
		newSize = maxSize;
	} else {
		newSize = this.minShow;
	}
	this.setState({showCount: newSize});
}
, getViewVerbiage: function() {
	var ret = "SEE MORE ACTIVITIES";
	var cursize = this.state.showCount;
	var maxSize = this.state.activities.length;
	if (cursize >= maxSize) {
		ret = "SEE LESS ACTIVITIES";
	}
	return ret;
}
, showMore: function() {
	var ret = false;
	var cursize = this.minShow;
	var maxSize = this.state.activities.length;
	if (cursize < maxSize) {
		ret = true;
	}
	return ret;
}
, getPurchases: function() {
	var set = this.state.activities.purchases;
	//.slice(0, this.state.showCount);
	return set;
}
, componentWillUnmount: function() {

}
, goToNextScreen: function() {
	//TODO: this is for demo only, will not be used in live app
	document.location = "/#/user/"+this.props.params.userId+"/member/select";
}
, render: function() {
	var loading = this.props.loading? "Loading..." : "";
	var list = this.state.activities !== null && this.state.activities[0] != null && this.state.activities[0].purchases != null ? this.state.activities[0].purchases.length > 0 ? this.state.activities[0].purchases.map((act) =>
		<li>
			<button className="full-width">
				<div>Purchase on: {moment(new Date(act.timestamp)).format("MMM DD, YYYY")}</div>
				<i className="icon-chevron-right" />
			</button>
		</li>
		): <div>No purchases</div> : "";
	var retList = this.state.activities !== null && this.state.activities[0] != null && this.state.activities[0].returns != null ? this.state.activities[0].returns.length > 0 ?this.state.activities[0].returns.map((act) =>
		<li>
			<button className="full-width">
				<div>Return on: {moment(new Date(act.timestamp)).format("MMM DD, YYYY")}</div>
				<i className="icon-chevron-right" />
			</button>
		</li>
		) : <div>No returns</div> : "";
	var showMore = this.showMore()? <button className="full-width" onClick={this.toggleCollectionSize}>
		{this.getViewVerbiage()}
	</button> : "";
	return <div className="recent-activity">
		<h2>Recent Activity</h2>
		{loading}
</div>
}
});