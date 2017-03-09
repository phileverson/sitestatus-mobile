var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var _ = require('lodash');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var User = require('../models/user.jsx');

var Styles = require('constants/styles.jsx');
var SignUp = require('./SignUp.jsx');

var UserProfile = React.createClass({

	getInitialState: function(){
		var blankUser = new User({});
	 	return {
	 		editingUserProfile: false,

	  		currentUser: blankUser,
	  		editedUser: blankUser
	  	}
	},

	componentWillMount: function() {
		// Full user details (stored in db), not just what Firebase's auth database has. 
		var currentUserEndPoint = "users/" + this.props.currentUser.uid + "/";
		SiteStatusBase.syncState(currentUserEndPoint, {
			context: this,
			state: 'currentUser',
			asArray: false
		});
	},

	navTo_EditProfile: function() {
		this.setState({
			editingUserProfile: true
		})
	},

	cancelProfileEdit: function() {
		this.setState({
			editingUserProfile: false
		})
	},

	saveUserProfile: function() {
		console.log('userObj to save:');
		console.log(this.state.editedUser);
		var newUserObject = new User(this.state.editedUser);
   		var isValidResult = newUserObject.isValidProfile();

   		if (isValidResult.isValid) {
   			console.log('valid profile')
   			var copiedProfile = _.cloneDeep(this.state.currentUser);
   			copiedProfile.firstName = (this.state.editedUser.firstName) ? this.state.editedUser.firstName : this.state.currentUser.firstName;
   			copiedProfile.lastName = (this.state.editedUser.lastName) ? this.state.editedUser.lastName : this.state.currentUser.lastName;
   			copiedProfile.company = (this.state.editedUser.company) ? this.state.editedUser.company : this.state.currentUser.company;
   			this.setState({
				currentUser: copiedProfile,
				editingUserProfile: false
			})
   		}
	},

	updateNoAuthUser: function(userObj) {
		this.setState({
			editedUser: userObj
		})
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>User Profile</div>
				<div className='right'>
					<Ons.ToolbarButton onClick={this.navTo_EditProfile}>
						Edit
					</Ons.ToolbarButton>
				</div>
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
		var fieldHeaderStyle={
	    	fontSize: '12px',
	    	color: Styles.onsenBlue
	    }
	    var divListItemStyle ={
	      width: '100%',
	      display: 'flex',
	      flexWrap: 'wrap'
	    }

		if (this.state.editingUserProfile) {
			return (
				<SignUp 
					currentUser={this.state.currentUser} 
					cancelEdit={this.cancelProfileEdit}
					saveUserProfile={this.saveUserProfile}
					updateNoAuthUser={this.updateNoAuthUser}
					submit={this.saveUserProfile}
					/>
			)
		} else {
			// viewing the user profile:
			return (
				<Ons.Page renderToolbar={this.renderToolbar}>
					<Ons.List>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									First Name
								</div>
								{this.state.currentUser.firstName}
							</div>		
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Last Name
								</div>
								{this.state.currentUser.lastName}
							</div>		
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Company
								</div>
								{this.state.currentUser.company}
							</div>		
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Email Address
								</div>
								{this.state.currentUser.emailAddress}
							</div>		
						</Ons.ListItem>
					</Ons.List>
				</Ons.Page>
			)
		}
	}
});

module.exports = UserProfile;