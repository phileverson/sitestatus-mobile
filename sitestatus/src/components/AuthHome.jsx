var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');

var ProjectsList = require('./ProjectsList.jsx');
var ProjectHome = require('./ProjectHome.jsx');
var NewProject = require('./NewProject.jsx');
var ContractorsList = require('./ContractorsList.jsx');
var UserProfile = require('./UserProfile.jsx');

var AuthHome = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		return {
			isOpenLeft: false,
			authAppState: PagesConstants.PROJECTS_LIST
		}
	},

	hideLeftMenu() {
    	this.setState({
    		isOpenLeft: false
    	});
	},

	showLeftMenu() {
    	this.setState({
    		isOpenLeft: true
    	});
	},

	navTo_Projects: function() {
		this.setState({
			authAppState: PagesConstants.PROJECTS_LIST,
			isOpenLeft: false
		})
	},

	navTo_NewProject: function() {
		this.setState({
			authAppState: PagesConstants.ADD_PROJECT,
			isOpenLeft: false
		})
	},

	navTo_Contractors: function() {
		this.setState({
			authAppState: PagesConstants.CONTRACTORS_LIST,
			isOpenLeft: false
		})
	},

	navTo_Profile: function() {
		this.setState({
			authAppState: PagesConstants.USER_PROFILE,
			isOpenLeft: false
		})
	},

	navTo_Logout: function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			console.log('logged out');
		}, function(error) {
			console.log(error);
		});
	},

    render: function() {
    	console.log(this.state);
    	var authAppStateComponent = '';
    	if (this.state.authAppState == PagesConstants.PROJECTS_LIST) {
    		authAppStateComponent = <ProjectsList newProject={this.navTo_NewProject} showLeftMenu={this.showLeftMenu} />;
    	} else if (this.state.authAppState == PagesConstants.SINGLE_PROJECT) {
    		authAppStateComponent = <ProjectHome />;
    	} else if (this.state.authAppState == PagesConstants.ADD_PROJECT) {
    		authAppStateComponent = <NewProject cancelCreate={this.navTo_Projects}/>;
    	} else if (this.state.authAppState == PagesConstants.CONTRACTORS_LIST) {
    		authAppStateComponent = <ContractorsList showLeftMenu={this.showLeftMenu} />;
    	} else if (this.state.authAppState == PagesConstants.USER_PROFILE) {
    		authAppStateComponent = <UserProfile showLeftMenu={this.showLeftMenu} />;
    	} 
    	return (
    		<Ons.Splitter>
	    		<Ons.SplitterSide
	    		side='left'
	    		width={200}
	    		collapse={true}
	    		isSwipeable={true}
	    		isOpen={this.state.isOpenLeft}
	    		onClose={this.hideLeftMenu}
	    		onOpen={this.showLeftMenu}
	    		>
		    		<Ons.Page>
			    		<Ons.List>
				    		<Ons.ListItem onClick={this.navTo_Projects}>Projects</Ons.ListItem>
				    		<Ons.ListItem onClick={this.navTo_Contractors}>Contractors</Ons.ListItem>
				    		<Ons.ListItem onClick={this.navTo_Profile}>Profile</Ons.ListItem>
				    		<Ons.ListItem onClick={this.navTo_Logout}>Logout</Ons.ListItem>
			    		</Ons.List>
		    		</Ons.Page>
	    		</Ons.SplitterSide>
	    		<Ons.SplitterContent>
	    			{authAppStateComponent}
	    		</Ons.SplitterContent>
    		</Ons.Splitter>
	    );
  }
});

module.exports = AuthHome;