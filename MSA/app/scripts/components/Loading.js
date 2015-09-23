var React = require('react');
module.exports = React.createClass({
componentDidMount: function() {
	console.log(this.props.message)
	console.log(this.props.nextAction)
	// document.getElementById("menu-flyout").addEventListener("mousedown", this.onMouseDown);
	// document.getElementById("menu-flyout").addEventListener("mouseup", this.onMouseUp);
	//document.addEventListener("mousedown", this.pageClick, false);
}
, componentWillUnmount: function() {
	// document.getElementById("menu-flyout").removeEventListener("mousedown", this.onMouseDown);
	// document.getElementById("menu-flyout").removeEventListener("mouseup", this.onMouseUp);
	// document.removeEventListener("mousedown", this.pageClick, false);
}

, render: function() {
	
	return <div className="site-overlay">
		<div className="site-mask"></div>
		<div className="loader">
			<img src="/images/spinner.gif" />
		</div>
	</div>
}
});