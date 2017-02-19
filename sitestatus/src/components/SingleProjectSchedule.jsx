var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var SingleProjectScheduleGantt = require('./SingleProjectScheduleGantt.jsx');
var SingleProjectScheduleManageContractors = require('./SingleProjectScheduleManageContractors.jsx');

var SingleProjectSchedule = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		return {
			shortListedContractors_Editable: this.props.singleProject.shortListedContractors,
		}
	},

	addContractorToShortlist: function(contractorKey) {
		console.log('Adding contractor to editable shortlist. Contractor Key:');
		console.log(contractorKey)
		var shortListedContractorsToUpdate = _.clone(this.state.shortListedContractors_Editable);
		shortListedContractorsToUpdate.push(contractorKey);
		this.setState({
			shortListedContractors_Editable: shortListedContractorsToUpdate
		})
	},

	removeContractorFromShortlist: function(contractorKey) {
		console.log('Removing contractor from editable shortlist. Contractor Key:');
		console.log(contractorKey)
		var shortListedContractorsToUpdate = _.clone(this.state.shortListedContractors_Editable);
		var indexToRemove = shortListedContractorsToUpdate.indexOf(contractorKey);
		shortListedContractorsToUpdate.splice(indexToRemove, 1);
		this.setState({
			shortListedContractors_Editable: shortListedContractorsToUpdate
		})
	},

  	popPage_SaveUpdatedShortlist: function(navigator) {
  		console.log('Saving editable shortlist to firebase.');
  		var freshProjectObj = new Project(this.props.singleProject);
		freshProjectObj.shortListedContractors = this.state.shortListedContractors_Editable;

		freshProjectObj = freshProjectObj.preparePutObject();
		this.props.updateProjectDetails(freshProjectObj);

  		navigator.popPage();
  	},

	pushPage_ManageContractors: function(navigator) {
		navigator.pushPage({
			title: 'Manage Contractors',
			hasBackButton: true
		});
	},

  	popPage_CancelManageContractors: function(navigator) {
  		// Reset the editable short list to only include what was last provided by singleproject.
  		// Voiding the user's changes (as they cancelled them).
  		this.setState({
  			shortListedContractors_Editable: this.props.singleProject.shortListedContractors
  		})
  		navigator.popPage();
  	},

	renderToolbar: function(route, navigator) {
		const leftButton = route.hasBackButton
		? <Ons.ToolbarButton onClick={this.popPage_CancelManageContractors.bind(this, navigator)}>Cancel</Ons.ToolbarButton>
		: <Ons.ToolbarButton ><Ons.Icon icon='md-home' onClick={this.props.navToHub} /></Ons.ToolbarButton>
		const rightButton = !route.hasBackButton
		? <Ons.ToolbarButton ><Ons.Icon icon='md-settings' onClick={this.props.navToProjectSettings} /></Ons.ToolbarButton>
		: <Ons.ToolbarButton onClick={this.popPage_SaveUpdatedShortlist.bind(this, navigator)}>Save</Ons.ToolbarButton>

		return (
			<Ons.Toolbar>
				<div className='left'>{leftButton}</div>
				<div className='center'>{route.title}</div>
				<div className='right'>{rightButton}</div>
			</Ons.Toolbar>
		);
	},

	renderPage: function(route, navigator) {
		var me = this;
		var pageContent;
		if (route.title == "Project Schedule") {
			pageContent = <SingleProjectScheduleGantt
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							shortListedContractorsDetails={this.props.shortListedContractorsDetails} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.props.navTo_ProjectSettings} 
							navToManageContractors={me.pushPage_ManageContractors.bind(me, navigator)}
							/>
		} else {
			pageContent = <SingleProjectScheduleManageContractors 
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							addContractorToShortlist={this.addContractorToShortlist}
							removeContractorFromShortlist={this.removeContractorFromShortlist}
							shortListedContractors_Editable={this.state.shortListedContractors_Editable}
							/>
		}

		return (
			<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
				{pageContent}
			</Ons.Page>
		);
	},

	updateTabbarVisibility_Show: function() {
		this.props.toggleTabbarVisibility(true);
	},

	updateTabbarVisibility_Hide: function() {
		this.props.toggleTabbarVisibility(false);
	},

	render: function() {
		return (
			<Ons.Page>
				<Ons.Navigator
					renderPage={this.renderPage}
					initialRoute={{
						title: 'Project Schedule',
						hasBackButton: false
					}}
					animation="lift"
					onPrePush={this.updateTabbarVisibility_Hide}
					onPostPop={this.updateTabbarVisibility_Show}
				/>
			</Ons.Page>
		);
	}
});

module.exports = SingleProjectSchedule;