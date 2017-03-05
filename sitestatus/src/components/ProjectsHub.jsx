var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');
var moment = require('moment');
var _ = require('lodash');

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
			// 		navigator.pushPage({
			// 	title: PagesConstants.ADD_PROJECT
			// })
					
		this.setState({
			activeProjectKey: '',
		}, function(){
			navigator.pushPage({
				title: PagesConstants.ADD_PROJECT
			})
		})
	},

	navTo_SingleProject: function(singleProjectObj, passedNavigator) {
		var me = this;
		this.setState({
			activeProjectKey: singleProjectObj['key']
		}, function(){
			passedNavigator.pushPage({
				title: PagesConstants.SINGLE_PROJECT
			})
			mixpanel.track("Launching Single Project",
			{
				"Project Name": singleProjectObj.name
			})

			// Really, really, really shitty work around for updating project view date.
			setTimeout(function() {
			  me.updateProjectLastViewedTime();
			}, 2000);
			});
	},

	updateProjectLastViewedTime: function() {
		var fullDate = moment();
			var projectEndPoint = "projects/" + this.props.currentUser.uid + "/" + this.state.activeProjectKey
			SiteStatusBase.update(projectEndPoint, {
				data: {lastViewed: fullDate.toISOString()},
				then: function(err) {
					console.log('Updated Project Last Viewed')
					if (err) {
						console.log("ERROR Updating Project Last Viewed");
						console.log(err);
					}
				}
			})
	},

	navTo_GeneralPop: function(navigator) {
		navigator.popPage();
		// this.setState({
		// 	authProjectsAppState: PagesConstants.PROJECTS_HUB
		// }, function(){
		// 	mixpanel.track("Navigated to Projects Hub");
		// });
	},

	navBackToSingleProject: function(passedNavigator) {
		passedNavigator.replacePage({
			title: PagesConstants.SINGLE_PROJECT,
		})
	},


	navTo_ProjectSettings: function(passedNavigator) {
		passedNavigator.pushPage({
			title: PagesConstants.SINGLE_PROJECT_SETTINGS,
		})
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
				"Project Name":  projectObj.name,
				"Project Question": projectObj.quesiton,
				"Project Question Time": projectObj.quesitonTime,
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
						passedNavigator.popPage({
							title: PagesConstants.SINGLE_PROJECT,
						})
					}
				} else {
					console.log(err);
				}
				mixpanel.track("Updated Project",
				{
				"Project Name":  projectObj.name,
				"Project Question": projectObj.quesiton,
				"Project Question Time": projectObj.quesitonTime,
				});		
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
		    mixpanel.track("Pulled to Refresh",
			{
			"App Location": "Projects Hub"
			});		
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
		} else if (this.props.projects.length == 0 || (!this.props.projects)) {
			return (
	        	<div>whoops looks like theres no projects here.</div>
	        )
		} else if (this.props.projects) {
			var projectsListSafe = _.cloneDeep(this.props.projects);
			if (!projectsListSafe) {
				return (<div></div>)
			}
			return (
				<Ons.List>
					<Ons.PullHook onChange={this.pullHookHandleChange} onLoad={this.props.fetchFirebaseProjects} >
						{this.pullHookGetContent()}
					</Ons.PullHook>
					{projectsListSafe.map(function(project, i){
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

	generalPop: function(passedNavigator) {
		passedNavigator.popPage();
	},

	projectsHubPageController: function(route, navigator) {
		console.log('projectsHubPageController ROUTE:');
		console.log(route);

		var onsPageKey = route.title;

		var pageContent;
		if (route.title == PagesConstants.PROJECTS_HUB) {
			pageContent = this.renderListOfProjects(navigator);
		} else if (route.title == PagesConstants.SINGLE_PROJECT) {
			var activeProjectObject = Utils.findProjectByKey(this.state.activeProjectKey, this.props.projects);
    		onsPageKey = PagesConstants.SINGLE_PROJECT + this.state.activeProjectKey;
    		pageContent = <SingleProjectHome 
							currentUser={this.props.currentUser} 
							activeProjectKey={this.state.activeProjectKey} 
							singleProject={activeProjectObject} 
							navTo_GeneralPop={this.navTo_GeneralPop.bind(this, navigator)}
							navTo_ProjectSettings={this.navTo_ProjectSettings}
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
							generalPop={this.generalPop}
							/>;
		} else if (route.title == PagesConstants.SINGLE_PROJECT_SETTINGS) {
			var activeProjectObject = Utils.findProjectByKey(this.state.activeProjectKey, this.props.projects);
    		pageContent = <NewProject
							singleProject={activeProjectObject}
							singleProjectKey={this.state.activeProjectKey}
							createNewOrUpdateProject={this.updateProject}
							cancelCreate={this.navBackToSingleProject.bind(this, navigator)}
							currentUser={this.props.currentUser}
							passedNavigator={navigator}
							generalPop={this.generalPop}
							/>;
		}
		return (
			<Ons.Page key={onsPageKey} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
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