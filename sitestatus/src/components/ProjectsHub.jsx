var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Utils = require('util/util.jsx');
var HttpClient = require('util/HttpClient.jsx');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var Project = require('../models/project.jsx');

var ProjectsListRow = require('./ProjectsListRow.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');
var Loading = require('./Loading.jsx');

var ProjectsHub = React.createClass({

	getInitialState: function(){
	  return {
	  	authProjectsAppState: PagesConstants.PROJECTS_HUB,
	  	activeProjectKey: ''
	  }
	},

	navTo_NewProject: function(navigator) {
		this.setState({
			activeProjectKey: ''
		}, function(){
			navigator.pushPage({
				title: PagesConstants.ADD_PROJECT
			})
		})
	},

	navTo_SingleProject: function(singleProjectObj, passedNavigator) {
		this.setState({
			activeProjectKey: singleProjectObj['key']
		}, function(){
			passedNavigator.pushPage({
				title: PagesConstants.SINGLE_PROJECT
			});
			mixpanel.track("Launched Single Project",
			{
				"Project Name": singleProjectObj.name
			})
		});
	},

	navTo_GeneralPop: function(navigator) {
		navigator.popPage();
		// this.setState({
		// 	authProjectsAppState: PagesConstants.PROJECTS_HUB
		// }, function(){
		// 	mixpanel.track("Navigated to Projects Hub");
		// });
	},

	createProject: function(projectObj, passedNavigator) {
		var me = this;
		// console.log('createProject projectObj:');
		// console.log(projectObj);

		// adding new project:
		var newProjectEntryEndPoint = "projects/" + this.props.currentUser.uid + "/";
		var projectBeingCreated = SiteStatusBase.push(newProjectEntryEndPoint, {
			data: projectObj,
			then: function(err) {
				if(!err){
					console.log('Project Added Added');
					me.setState({
						activeProjectKey: projectBeingCreated.key
					}, function(){
						passedNavigator.replacePage({
							title: PagesConstants.SINGLE_PROJECT
						})
						mixpanel.track("Created Project",
							{
								"Project Name":  projectObj.name
							});
						}
					);
					// Request that Twilio number is created:
					var client = new HttpClient();
					var requestURL = GlobalConstants.MM_SERVER_CREATE_NUMBER + me.props.currentUser.uid + "/" + projectBeingCreated.key;
					client.get(requestURL, function(response) {
						console.log('Requested creation of phone number. Assume successful.');
					});
				} else {
					console.log('Error Adding New Project:');
					console.log(err);
				}
			}
		});
	},

	updateProject: function(projectObj, passedNavigator) {
		var me = this;
		// console.log('updateProject projectObj:');
		// console.log(projectObj);

		// Updating Project:
		var projectUpdateEndPoint = "projects/" + this.props.currentUser.uid + "/" + this.state.activeProjectKey;
		SiteStatusBase.update(projectUpdateEndPoint, {
			data: projectObj,
			then: function(err) {
				if (!err) {
					if (projectObj.deleted) {
						passedNavigator.popPage();
					} else {
						passedNavigator.replacePage({
							title: PagesConstants.SINGLE_PROJECT,
						})
					}
				} else {
					console.log(err);
				}
			}
		});
	},

	renderToolbar: function(route, navigator) {
		if (route.title == PagesConstants.PROJECTS_HUB) {
		    return (
			    <Ons.Toolbar>
					<div className='center'>Projects</div>
					<div className='right'>
						<Ons.ToolbarButton onClick={this.navTo_NewProject.bind(this, navigator)}>
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

	pullHookGetContent: function() {
	    switch (this.state.state) {
	      case 'initial':
	        return 'Pull to Refresh';
	      case 'preaction':
	        return 'Release to Refresh';
	      case 'action':
	        return <Loading />;
	    }
	},
	
	pullHookHandleChange: function(e) {
    	this.setState({
    		state: e.state
    	});
    },

	renderListOfProjects: function(navigator) {
		var me = this;

		if (this.props.projectsLoading) {
			return (
				<Loading />
		    )
		} else if (this.props.projects.length == 0) {
			return (
	        	<div>whoops looks like theres no projects here.</div>
	        )
		} else {
			return (
				<Ons.List>
					<Ons.PullHook onChange={this.pullHookHandleChange} onLoad={this.props.fetchFirebaseProjects} >
						{this.pullHookGetContent()}
					</Ons.PullHook>
					{this.props.projects.map(function(project, i){
						return <ProjectsListRow
									singleProject={project}
									index={i}
									key={i}
									launchProject={me.navTo_SingleProject}
									passedNavigator={navigator}
									/> ;
					})}
				</Ons.List>
			)
		}
	},

	projectsHubPageController: function(route, navigator) {
		console.log('projectsHubPageController ROUTE:');
		console.log(route);

		var pageContent;
		if (route.title == PagesConstants.PROJECTS_HUB) {
			pageContent = this.renderListOfProjects(navigator);
		} else if (route.title == PagesConstants.SINGLE_PROJECT) {
			var activeProjectObject = Utils.findProjectByKey(this.state.activeProjectKey, this.props.projects);
    		pageContent = <SingleProjectHome 
							currentUser={this.props.currentUser} 
							activeProjectKey={this.state.activeProjectKey} 
							singleProject={activeProjectObject} 
							navTo_GeneralPop={this.navTo_GeneralPop.bind(this, navigator)}
							contractors={this.props.contractors}
							passedNavigator={navigator}
							/>;
		} else if (route.title == PagesConstants.ADD_PROJECT) {
			var blankProject = new Project({});
    		pageContent = <NewProject 
							currentUser={this.props.currentUser} 
							activeProjectKey={this.state.activeProjectKey} 
							singleProject={blankProject} 
							cancelCreate={this.navTo_GeneralPop.bind(this, navigator)} 
							createNewOrUpdateProject={this.createProject}
							passedNavigator={navigator}
							/>;
		} else if (route.title == PagesConstants.SINGLE_PROJECT_SETTINGS) {
			var activeProjectObject = Utils.findProjectByKey(this.state.activeProjectKey, this.props.projects);
    		pageContent = <NewProject
							singleProject={activeProjectObject}
							singleProjectKey={this.state.activeProjectKey}
							createNewOrUpdateProject={this.updateProject}
							cancelCreate={this.navTo_GeneralPop.bind(this, navigator)}
							currentUser={this.props.currentUser}
							passedNavigator={navigator}
							/>;
		}
		return (
			<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
				{pageContent}
			</Ons.Page>
		);
	},

	render: function() {
		return (
			<Ons.Page>
				<Ons.Navigator
					renderPage={this.projectsHubPageController}
					initialRoute={{
						title: PagesConstants.PROJECTS_HUB
					}}
				/>
			</Ons.Page>
		)
	}
});

module.exports = ProjectsHub;