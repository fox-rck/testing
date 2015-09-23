var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitialState: function() {
	return {
		cats: [{name: "Baby & Toddler Clothing", id:1}, {name: "Baby Gear", id:1}, {name: "Baby Furniture", id:1}, {name: "Toddler  Furniture", id:1}, {name: "Baby Decor", id:1}, {name: "Baby Bedding", id:1}, {name: "Baby Feeding", id:1}, {name: "Baby Diapering", id:1}]
		, showCount: this.minShow
	};
}
, minShow: 5
,  getInitDataIfNeeded: function() {
	console.info("get Sub Categories");
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Sub Categories Updating");
	console.log(nextProps)
	if (nextProps.acts != null) {
		this.setState({activities: nextProps.acts});
	}
}
, componentDidMount: function() {
	console.log("Sub Categories component did mount");
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
	var ret = "SEE MORE CATEGORIES";
	var cursize = this.state.showCount;
	var maxSize = this.state.activities.length;
	if (cursize >= maxSize) {
		ret = "SEE LESS CATEGORIES";
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
, componentWillUnmount: function() {

}
, goToNextScreen: function(id) {
	//TODO: this is for demo only, will not be used in live app
	document.location = "/#/user/"+this.props.params.userId+"/member/"+this.props.params.memberId+"/category/"+id;
}
, render: function() {
	var loading = this.props.loading? "Loading..." : "";
	var list = this.state.cats !== null && this.props.cat.isOpened === true ? <div className="list">
	<h4>CATEGORIES</h4>
	{this.state.cats.map((cat) =>
		<div>
			<button onClick={this.goToNextScreen.bind(this, this.props.cat.oppId)} >{cat.name}</button>
		</div>
	)} </div> : "";
	return <div className="category-list">
		{loading}
		{list}
		
</div>
}
});