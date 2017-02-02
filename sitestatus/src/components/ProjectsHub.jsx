var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

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
		var projects = firebase.database().ref("projects");
		this.bindAsArray(projects, "projects");
	},

	navTo_NewProject: function() {
		this.setState({
			authProjectsAppState: PagesConstants.ADD_PROJECT,
			activeProjectKey: ''
		})
	},

	navTo_SingleProject: function(activeProjectKey) {
		this.setState({
			authProjectsAppState: PagesConstants.SINGLE_PROJECT,
			activeProjectKey: activeProjectKey
		})
	},

	navTo_ProjectsHub: function() {
		this.setState({
			authProjectsAppState: PagesConstants.PROJECTS_HUB
		})
	},

	createNewProject: function(projectObj) {
		console.log('projectObj:');
		console.log(projectObj);
		// adding new project:
		var projects = firebase.database().ref("projects");
		var newProjectEntry = projects.push();
		newProjectEntry.set(projectObj);
		console.log('New Project Saved');
		console.log(newProjectEntry);

		this.setState({
			authProjectsAppState: PagesConstants.SINGLE_PROJECT,
			activeProjectKey: newProjectEntry.key
		})
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
		return (
			<Ons.List>
			{this.state.projects.map(function(project, i){
				return <ProjectsListRow singleProject={project} index={i} key={i} launchProject={me.navTo_SingleProject}/> ;
			})}
			</Ons.List>
		)
	},

	render: function() {
		console.log(this.state);
		var authProjectsAppComponent = '';

    	if (this.state.authProjectsAppState == PagesConstants.PROJECTS_HUB) {
    		authProjectsAppComponent = this.renderListOfProjects(); 

    	} else if (this.state.authProjectsAppState == PagesConstants.SINGLE_PROJECT) {
    		var activeProjectObject = Utils.findProjectByKey(this.state.activeProjectKey, this.state.projects);
    		authProjectsAppComponent = <SingleProjectHome activeProjectKey={this.state.activeProjectKey} singleProject={activeProjectObject} navToHub={this.navTo_ProjectsHub} />;

    	} else if (this.state.authProjectsAppState == PagesConstants.ADD_PROJECT) {
    		var blankProject = new Project({});
    		authProjectsAppComponent = <NewProject activeProjectKey={this.state.activeProjectKey} singleProject={blankProject} cancelCreate={this.navTo_ProjectsHub} createNewProject={this.createNewProject}/>;
    	}

		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			{authProjectsAppComponent}
			</Ons.Page>
		)
	}
});

module.exports = ProjectsHub;