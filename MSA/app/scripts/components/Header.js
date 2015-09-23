var React = require('react');
var authActions = require('../actions/Authentication')
module.exports = React.createClass({
getInitialState: function(){
	return {
		menuOpened: false
	}
}
, mouseIsDownOnComponent: false
, getInitDataIfNeeded: function() {

}
, componentWillReceiveProps: function(nextProps){
	console.log("Header will recieve props");
}
, componentDidMount: function() {
	console.log(this.props.params.userId)
	// document.getElementById("menu-flyout").addEventListener("mousedown", this.onMouseDown);
	// document.getElementById("menu-flyout").addEventListener("mouseup", this.onMouseUp);
	//document.addEventListener("mousedown", this.pageClick, false);
}
// , pageClick: function() {
// 	if (this.mouseIsDownOnComponent) { 
// 		return;
// 	}
// 	else if (this.state.menuOpened) {
// 		this.toggleMainNav();
// 	}

// }
// , onMouseDown: function() {
//  this.mouseIsDownOnComponent = true;
// }
// , onMouseUp: function() {
//  this.mouseIsDownOnComponent = false;
// }
, componentWillUnmount: function() {
	// document.getElementById("menu-flyout").removeEventListener("mousedown", this.onMouseDown);
	// document.getElementById("menu-flyout").removeEventListener("mouseup", this.onMouseUp);
	// document.removeEventListener("mousedown", this.pageClick, false);
}
, logOff: function() {
	authActions.logoff();
	
}
, memberSearch: function() {
	document.location = "/#/user/"+this.props.params.userId+"/member/search";
}
// , toggleMainNav: function() {
// 	this.setState({menuOpened: !this.state.menuOpened});
// }
, render: function() {
	var menuClass = this.state.menuOpened ? "menu-flyout opened":"menu-flyout";
	var logoff = typeof this.props.params.userId !== 'undefined' ? <div className="logoff">
			<button onClick={this.logOff}><small>Logoff</small></button>
		</div> : "";
	var search = typeof this.props.params.userId !== 'undefined' 
	&& (typeof this.props.params.term !== 'undefined' 
	|| typeof this.props.params.memberId !== 'undefined')? <div className="back-search"><button onClick={this.memberSearch}>
			<i className="icon-search" />
		</button></div>:"";
	return <header>
		{search}
		<div className="page-title">{this.props.title}</div>
		{logoff}
		<div className={menuClass} id="menu-flyout">
			<button onClick={this.memberSearch}>Member Search</button>
			<button onClick={this.logOff}>Logoff</button>
		</div>
	</header>
}
});