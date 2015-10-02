var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var SubCategories = require('./SubCategories');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
getInitialState: function() {
	return {
		categories: []
		, showCount: this.minShow
	};
}
, minShow: 5
,  getInitDataIfNeeded: function() {
	console.info("Get member ranked categories");
}
, componentWillReceiveProps: function(nextProps) {
	console.log("Ranked Categories component will recieve props");
	if (nextProps.opps != null) {
		this.setState({categories: nextProps.opps});
	}
}
, componentDidMount: function() {
	console.log("Ranked Categories component did mount");
	//this.setState({categories: []});
	//TODO: remove this for prod, for demo only
	// var limit = 10;
	// var cnt = 0;
	// var cats = [];
	// for (cnt; cnt <= limit; cnt++) {
	// 	cats.push({
	// 		  _id: cnt
	// 		, catName: "Category Name"
	// 	})
	// }
	// this.setState({categories: cats});
}
, toggleCollectionSize: function() {
	var cursize = this.state.showCount;
	var maxSize = this.state.categories.length;
	var newSize = 0;
	if (cursize < maxSize) {
		newSize = maxSize;
	} else {
		newSize = this.minShow;
	}
	this.setState({showCount: newSize});
}
, getViewVerbiage: function() {
	var ret = "SEE MORE DEPARTMENTS";
	var cursize = this.state.showCount;
	var maxSize = this.state.categories.length;
	if (cursize >= maxSize) {
		ret = "SEE LESS DEPARTMENTS";
	}
	return ret;
}
, showMore: function() {
	var ret = false;
	var cursize = this.minShow;
	var maxSize = this.state.categories.length;
	console.info(cursize < maxSize)
	if (cursize < maxSize) {
		ret = true;
	}
	return ret;
}
, getCollection: function() {
	var set = this.state.categories.slice(0, this.state.showCount);
	return set;
}
, componentWillUnmount: function() {
	this.setState({categories: []});
}
, toggleSubCats: function(idx) {
	var model = this.state.categories[idx];
	model.isOpened = !model.isOpened;
	var set = this.state.categories;
	set[idx] = model;
	this.setState({categories:set});
}
, goToNextScreen: function(id){
	document.location = "/#/user/"+this.props.params.userId+"/member/"+this.props.params.memberId+"/category/"+id;
}
, render: function() {
	var loading = this.props.loading? "Loading..." : "";
	var that = this;
	var list = this.getCollection().map((cat, idx) =>
		<li>
			<button className="full-width" onClick={that.toggleSubCats.bind(that, idx)}>
			<div className="rank">{idx + 1}</div>
			<div className="pull-body">
				<h3>{cat.department}</h3>
				<div>
					<small>Last Purchased: {moment(new Date(cat.purchases.lastPurchaseDate)).format("MMM DD, YYYY")}</small>
				</div>
				<i className={cat.isOpened === true ? "icon-minus":"icon-plus"} />
			</div>
			</button>
			<SubCategories cat={cat} params={this.props.params} />
		</li>
		);
	var showMore = this.showMore()? <button className="more-cats" onClick={this.toggleCollectionSize}>
		{this.getViewVerbiage()}
	</button> : "";
	return <div className="department-list">
		<h2>OPPORTUNITIES</h2>
		{loading}
		<div className="list-heading">
			<strong>
				DEPARTMENT
			</strong>
		</div>
		<ul className="select-list">
		{list}
		</ul>
		{showMore}
	</div>
}
});