var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');

var ProjectsHub = require('./ProjectsHub.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');
var NewProject = require('./NewProject.jsx');
var ContractorsHub = require('./ContractorsHub.jsx');
var UserProfile = require('./UserProfile.jsx');

var base = Rebase.createClass({
    apiKey: GlobalConstants.FIREBASE_API_KEY,
    authDomain: GlobalConstants.FIREBASE_AUTH_DOMAIN,
    databaseURL: GlobalConstants.FIREBASE_DATABASE_URL,
    storageBucket: GlobalConstants.FIREBASE_STORAGE_BUCKET
});

var AuthHome = React.createClass({
	getInitialState: function(){
		return {
			isOpenLeft: false,
			authAppState: PagesConstants.PROJECTS_LIST,

			projects: null,
			contractors: null,

			projectsLoading: true,
			contractorsLoading: true
		}
	},

	componentDidMount: function() {
		this.fetchFirebaseProjects();
		this.listenFirebaseProjects();
		this.fetchFirebaseContractors();
		this.listenFirebaseContractors();
	},

	listenFirebaseProjects: function() {
		var projectsEndPoint = "projects/" + this.props.user.uid + "/";
		base.listenTo(projectsEndPoint, {
			context: this,
			asArray: true,
			queries: {
				orderByChild: 'deleted',
				equalTo: false
			},
			then: function(data){
				this.setState({
					projects: data
				});
				console.log('Detected Change: Projects');
			}
		});
	},

	fetchFirebaseProjects: function(pullHook_Done) {
		var projectsEndPoint = "projects/" + this.props.user.uid + "/";
		base.fetch(projectsEndPoint, {
			context: this,
			state: 'projects',
			asArray: true,
			queries: {
				orderByChild: 'deleted',
				equalTo: false
			},
			then: function(data){
				console.log('Fetched Projects')
				if (pullHook_Done) {
					this.setState({
						projectsLoading:false,
						projects: data
					}, pullHook_Done);
				} else {
					this.setState({
						projectsLoading:false,
						projects: data
					});
				}
			}
		});
	},

	listenFirebaseContractors: function() {
		var contractorsEndPoint = "contractors/" + this.props.user.uid + "/";
		base.listenTo(contractorsEndPoint, {
			context: this,
			asArray: true,
			queries: {
				orderByChild: 'deleted',
				equalTo: false
			},
			then: function(data){
				this.setState({
					contractors: data
				});
				console.log('Detected Change: Contractors');
			}
		});
	},

	fetchFirebaseContractors: function(pullHook_Done) {
		var contractorsEndPoint = "contractors/" + this.props.user.uid + "/";
		base.fetch(contractorsEndPoint, {
			context: this,
			state: 'contractors',
			asArray: true,
			queries: {
				orderByChild: 'deleted',
				equalTo: false
			},
			then: function(data){
				console.log('Fetched Contractors')
				if (pullHook_Done) {
					this.setState({
						contractorsLoading:false,
						contractors: data
					}, pullHook_Done);
				} else {
					this.setState({
						contractorsLoading:false,
						contractors: data
					});
				}
			}
		});
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
    		authAppStateComponent = <ProjectsHub 
    									currentUser={this.props.user} 
    									newProject={this.navTo_NewProject} 
    									showLeftMenu={this.showLeftMenu}
    									projects={this.state.projects}
    									contractors={this.state.contractors}
    									contractorsLoading={this.state.contractorsLoading}
    									projectsLoading={this.state.projectsLoading}
    									fetchFirebaseProjects={this.fetchFirebaseProjects}
    									/>;
    	} else if (this.state.authAppState == PagesConstants.CONTRACTORS_LIST) {
    		authAppStateComponent = <ContractorsHub 
    									currentUser={this.props.user} 
    									showLeftMenu={this.showLeftMenu} 
    									projects={this.state.projects}
    									contractors={this.state.contractors}
    									contractorsLoading={this.state.contractorsLoading}
    									fetchFirebaseContractors={this.fetchFirebaseContractors}
    									/>;
    	} else if (this.state.authAppState == PagesConstants.USER_PROFILE) {
    		authAppStateComponent = <UserProfile 
    									currentUser={this.props.user} 
    									showLeftMenu={this.showLeftMenu} 
    									/>;
    	} 
    	return (
    		<Ons.Splitter>
	    		<Ons.SplitterSide
	    		side='left'
	    		width={200}
	    		collapse={true}
	    		isSwipeable={false}
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