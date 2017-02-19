var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Utils = require('util/util.jsx');
var HttpClient = require('util/HttpClient.jsx');

var Project = require('../models/project.jsx');

var ProjectsListRow = require('./ProjectsListRow.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');

var ProjectsHub = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  	authProjectsAppState: PagesConstants.PROJECTS_HUB,
	  	activeProjectKey: ''
	  }
	},

	componentWillMount: function() {
		var projects = firebase.database().ref("projects/" + this.props.currentUser.uid + "/").orderByChild("deleted").equalTo(false);
		this.bindAsArray(projects, "projects");
	},

	navTo_NewProject: function() {
		this.setState({
			authProjectsAppState: PagesConstants.ADD_PROJECT,
			activeProjectKey: ''
		})
	},

	navTo_SingleProject: function(singleProjectObj) {
		this.setState({
			authProjectsAppState: PagesConstants.SINGLE_PROJECT,
			activeProjectKey: singleProjectObj['.key']
		}, function(){
			mixpanel.track("Launched Single Project",
			{
				"Project Name": singleProjectObj.name
			})
		});
	},

	navTo_ProjectsHub: function() {
		this.setState({
			authProjectsAppState: PagesConstants.PROJECTS_HUB
		}, function(){
			mixpanel.track("Navigated to Projects Hub");
		});
	},

	createProject: function(projectObj) {
		var me = this;
		console.log('projectObj:');
		console.log(projectObj);
		// adding new project:
		var projects = firebase.database().ref("projects/" + this.props.currentUser.uid + "/");
		var newProjectEntry = projects.push();

		newProjectEntry.set(projectObj, function(){
			me.setState({
				authProjectsAppState: PagesConstants.SINGLE_PROJECT,
				activeProjectKey: newProjectEntry.key
			}, function(){
				mixpanel.track("Created Project",
					{
						"Project Name":  projectObj.name
					});
				}
			);
			var client = new HttpClient();
			var requestURL = GlobalConstants.MM_SERVER_CREATE_NUMBER + me.props.currentUser.uid + "/" + newProjectEntry.key;
			client.get(requestURL, function(response) {
				console.log('Requested creation of phone number.');
			});

		});
	},

	renderToolbar: function() {
		if (this.state.authProjectsAppState == PagesConstants.PROJECTS_HUB) {
		    return (
			    <Ons.Toolbar>
					<div className='center'>Projects</div>
					<div className='right'>
						<Ons.ToolbarButton onClick={this.navTo_NewProject}>
							New
						</Ons.ToolbarButton>
					</div>
					<div className='left'>
						<Ons.ToolbarButton onClick={this.props.showLeftMenu}>
							<Ons.Icon icon='ion-navicon, material:md-menu' />
						</Ons.ToolbarButton>
	          		</div>
			    </Ons.Toolbar>
		  	)
		}
	},

	renderListOfProjects: function() {
		var me = this;
		if (this.state.projects.length==0){
			return "whoops looks like theres no projects here."
		}
		else{
			return (
			<Ons.List>
			{this.state.projects.map(function(project, i){
				return <ProjectsListRow singleProject={project} index={i} key={i} launchProject={me.navTo_SingleProject}/> ;
			})}
			</Ons.List>
		)
		}
		
	},

	render: function() {
		var authProjectsAppComponent = '';

    	if (this.state.authProjectsAppState == PagesConstants.PROJECTS_HUB) {
    		authProjectsAppComponent = this.renderListOfProjects(); 

    	} else if (this.state.authProjectsAppState == PagesConstants.SINGLE_PROJECT) {
    		var activeProjectObject = Utils.findProjectByKey(this.state.activeProjectKey, this.state.projects);
    		// console.log(activeProjectObject);
    		authProjectsAppComponent = <SingleProjectHome 
    									currentUser={this.props.currentUser} 
    									activeProjectKey={this.state.activeProjectKey} 
    									singleProject={activeProjectObject} 
    									navToHub={this.navTo_ProjectsHub} 
    									/>;

    	} else if (this.state.authProjectsAppState == PagesConstants.ADD_PROJECT) {
    		var blankProject = new Project({});
    		authProjectsAppComponent = <NewProject 
    									currentUser={this.props.currentUser} 
    									activeProjectKey={this.state.activeProjectKey} 
    									singleProject={blankProject} 
    									cancelCreate={this.navTo_ProjectsHub} 
    									createNewOrUpdateProject={this.createProject}
    									/>;
    	}

		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			{authProjectsAppComponent}
			</Ons.Page>
		)
	}
});

module.exports = ProjectsHub;