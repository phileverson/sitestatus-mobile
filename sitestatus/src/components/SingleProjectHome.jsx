var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');
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

	addContractorToProjectShortlist: function(contractorKey) {
		console.log('Adding contractor to shortlist. Contractor Key:');
		console.log(contractorKey)
		var freshProjectObj = new Project(this.props.singleProject);
		freshProjectObj.shortListedContractors.push(contractorKey);
		freshProjectObj = freshProjectObj.preparePutObject();
		this.updateProjectDetails(freshProjectObj);
	},

	removeContractorFromProjectShortlist: function(contractorKey) {
		console.log('Removing contractor from shortlist. Contractor Key:');
		console.log(contractorKey)

		var shortListedContractorsToUpdate = _.clone(this.props.singleProject.shortListedContractors);
		var indexToRemove = shortListedContractorsToUpdate.indexOf(contractorKey);
		shortListedContractorsToUpdate.splice(indexToRemove, 1);

		var freshProjectObj = new Project(this.props.singleProject);
		freshProjectObj.shortListedContractors = shortListedContractorsToUpdate;
		freshProjectObj = freshProjectObj.preparePutObject();
		this.updateProjectDetails(freshProjectObj);
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

		var shortListedContractorsDetails = [];
		if (this.props.singleProject.shortListedContractors) {
			for (var i = 0; i < this.props.singleProject.shortListedContractors.length; i++) {
				var newContractor = null;
				newContractor = Utils.findContractorByKey(this.props.singleProject.shortListedContractors[i], this.state.allContractors);
				shortListedContractorsDetails.push(newContractor);
			}
		}

		return [
			{
				content: <SingleProjectStatusUpdateList 
							key='SingleProjectStatusUpdateList' 
							toggleTabbarVisibility={this.toggleTabbarVisibility} 
							singleProject={this.props.singleProject} 
							allContractors={this.state.allContractors} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.navTo_ProjectSettings} 
							/>,
				tab: <Ons.Tab label='Updates' icon='md-settings' />
			},
			{
				content: <SingleProjectSchedule 
							key='SingleProjectSchedule' 
							toggleTabbarVisibility={this.toggleTabbarVisibility} 
							singleProject={this.props.singleProject} 
							allContractors={this.state.allContractors} 
							shortListedContractorsDetails={shortListedContractorsDetails} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.navTo_ProjectSettings} 
							addContractorToShortlist={this.addContractorToProjectShortlist}
							removeContractorFromShortlist={this.removeContractorFromProjectShortlist}
							/>,
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