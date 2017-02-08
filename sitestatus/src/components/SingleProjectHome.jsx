var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Project = require('../models/project.jsx');

var SingleProjectStatusUpdateList = require('./SingleProjectStatusUpdateList.jsx');
var SingleProjectSchedule = require('./SingleProjectSchedule.jsx');
var NewProject = require('./NewProject.jsx');

var SingleProjectHome = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  	index:0,
	  	allContractors: [],
	  	tabbarVisible: true,
	  	authSingleProjectAppState: PagesConstants.SINGLE_PROJECT
	  }
	},

	componentWillMount: function() {
		var allContractors = firebase.database().ref("contractors");
		this.bindAsArray(allContractors, "allContractors");
	},

	updateProjectDetails: function(projectObj) {
		var me = this;
		console.log('projectObj:');
		console.log(projectObj);
		// adding new project:
		var project = firebase.database().ref("projects/" + this.props.singleProject['.key']);
		// var updatedProjectDetail = project.set(projectObj);
		// console.log('New Project Saved');
		// console.log(updatedProjectDetail);
		project.set(projectObj, function(){
			if (projectObj.deleted) {
				me.props.navToHub();
			} else {
				me.navTo_SingleProjectTabs();
			}
		});


	},

	navTo_ProjectSettings: function() {
		this.setState({
			authSingleProjectAppState: PagesConstants.SINGLE_PROJECT_SETTINGS
		})
	},

	// the default:
	navTo_SingleProjectTabs: function() {
		this.setState({
			authSingleProjectAppState: PagesConstants.SINGLE_PROJECT
		})
	},

	renderTabs: function() {
		return [
			{
				content: <SingleProjectStatusUpdateList toggleTabbarVisibility={this.toggleTabbarVisibility} singleProject={this.props.singleProject} allContractors={this.state.allContractors} navToHub={this.props.navToHub} navToProjectSettings={this.navTo_ProjectSettings}/>,
				tab: <Ons.Tab label='Updates' icon='md-settings' />
			},
			{
				content: <SingleProjectSchedule singleProject={this.props.singleProject} commonContractors={this.state.allContractors} navToHub={this.props.navToHub} navToProjectSettings={this.navTo_ProjectSettings}/>,
				tab: <Ons.Tab label='Schedule' icon='ion-android-folder-open' />
			}
		];
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Single Project</div>
				<div className='right'></div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.navToHub}>
						<Ons.Icon icon='ion-android-folder-open' />
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	toggleTabbarVisibility: function(showHideSetter) {
		this.refs.tabs.refs.tabbar.setTabbarVisibility(showHideSetter);
		// if(showHideSetter){
		// 	this.refs.tabs.refs.tabbar.lastChild.style = 'left: -100%; transition: left 0.4s;';
		// } else {
		// 	this.refs.tabs.refs.tabbar.lastChild.style = 'left: 0; transition: left 0.4s;';
		// }
	},

	render: function() {
		if (this.state.authSingleProjectAppState == PagesConstants.SINGLE_PROJECT) {
			return (
				<Ons.Tabbar
					ref='tabs'
					index={this.state.index}
					onPreChange={(event) =>
						{
							if (event.index != this.state.index) {
								this.setState({index: event.index});
							}
						}
					}
					renderTabs={this.renderTabs}
				/>
			)
		} else {
			var singleProjectForProjectDetail = new Project(this.props.singleProject);
			return (
				<NewProject singleProject={singleProjectForProjectDetail} singleProjectKey={this.props.singleProject['.key']} createNewOrUpdateProject={this.updateProjectDetails} cancelCreate={this.navTo_SingleProjectTabs} />
			)
		} 
	}
});

module.exports = SingleProjectHome;