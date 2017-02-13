var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var User = require('../models/user.jsx');

var UserProfile = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		var blankUser = new User({});
	  return {
	  	currentUser: blankUser
	  }
	},


	componentWillMount: function() {
		// This user, as we need them for schedule update stuff:
		var thisUser = firebase.database().ref("users/" + this.props.currentUser.uid + "/" );
		this.bindAsObject(thisUser, "currentUser");
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