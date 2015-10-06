var React = require('react');
var authActions = require('../actions/Authentication')
module.exports = React.createClass({
getInitialState: function(){
	return {
		isEditing: false
		, lastEmail: ""
		, email: "rick@email.com"
		, feedback: {
			associate: this.props.user.email
			, toEmail: ""
		}
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
}
, componentWillUnmount: function() {
}
, logOff: function() {
	authActions.logoff();
}
, sendEmail: function() {
	var email = this.state.feedback;
	email.toEmail = this.state.email;
	this.setState({showSuccess: true, isEditing: false});
	console.log(email)
	var that = this;
	setTimeout(function(){
		that.setState({showSuccess: false});
	}, 4000)
}
, updateEmail: function(e) {
	var val = e.target.value || "";
	this.setState({email:val})
}
, toggleChangeEmail: function(){
	var model = {isEditing: !this.state.isEditing}
	if (!this.state.isEditing) {
		model.lastEmail = this.state.email;
	} else if ( this.state.lastEmail !== ""){ 
		model.email = this.state.lastEmail;
	}
	this.setState(model)
}
, render: function() {
	var success = this.state.showSuccess ? "The feedback survey has been sent." : "";
	var email = this.state.isEditing ? <input type="text" value={this.state.email} onChange={this.updateEmail}/> : <div className="email">{this.state.email}</div>
			
	var otherEmail = this.state.isEditing ? <button className="edit" onClick={this.toggleChangeEmail}>CANCEL</button>
	: <button className="edit" onClick={this.toggleChangeEmail}>USE ANOTHER EMAIL</button>
	return <div className="feedback-pop">
		<button className="back-button" onClick={this.props.back}>
			<i className="icon-arrow-left" />{" "}
			Back
		</button>
		<div className="clear"/>
		<div className="pop-body">
			<p>Send a feedback survey to the following email account?</p>
			{email}
			<h4>{success}</h4>
			<button className="btn" onClick={this.sendEmail}>SEND</button>
			{otherEmail}
		</div>
	</div>
}
});