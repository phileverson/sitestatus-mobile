var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var User = require('../models/user.jsx');

var UserProfile = React.createClass({

	getInitialState: function(){
		var blankUser = new User({});
	  return {
	  	currentUser: blankUser
	  }
	},

	componentWillMount: function() {
		// Full user details (stored in db), not just what Firebase's auth database has. 
		var currentUserEndPoint = "users/" + this.props.currentUser.uid + "/";
		SiteStatusBase.bindToState(currentUserEndPoint, {
			context: this,
			state: 'currentUser',
			asArray: false
		});
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>User Profile</div>
				<div className='right'></div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.showLeftMenu}>
						<Ons.Icon icon='ion-navicon, material:md-menu' />
					</Ons.ToolbarButton>
          		</div>
		    </Ons.Toolbar>
	  	)
	},

	render: function() {
		console.log(this.state.currentUser);

		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			FirstName: {this.state.currentUser.firstName}
			</Ons.Page>
		)
	}
});

module.exports = UserProfile;