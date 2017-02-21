var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var Project = require('../models/project.jsx');
var Contractor = require('../models/contractor.jsx');

var SingleProjectScheduleGantt = require('./SingleProjectScheduleGantt.jsx');
var SingleProjectScheduleManageContractors = require('./SingleProjectScheduleManageContractors.jsx');
var NewContractor = require('./NewContractor.jsx');

var SingleProjectSchedule = React.createClass({

	getInitialState: function(){
		return {
			shortListedContractors_Editable: this.props.singleProject.shortListedContractors,
		}
	},

	addContractorToShortlist: function(contractorKey) {
		console.log('Adding contractor to editable shortlist. Contractor Key:');
		console.log(contractorKey)
		var shortListedContractorsToUpdate = _.clone(this.state.shortListedContractors_Editable);
		if (!shortListedContractorsToUpdate) {
			shortListedContractorsToUpdate = [];
		}
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
  		this.props.toggleTabbarVisibility(true);
  	},

	pushPage_ManageContractors: function(navigator) {
		navigator.pushPage({
			title: 'Manage Contractors',
			hasBackButton: true
		});
	},

	pushPage_AddContractor: function(navigator) {
		navigator.pushPage({
			title: 'Add Contractor',
			hasBackButton: true
		});
	},

  	popPage_CancelAddContractor: function(navigator) {
  		navigator.popPage();
  	},

  	popPage_SaveNewContractor: function(navigator, contractorObject) {
  		console.log(contractorObject);

  		var contractorsEndPoint = "contractors/" + this.props.currentUser.uid + "/";
  		var newlyAddedContractor = SiteStatusBase.push(contractorsEndPoint,{
  			data: contractorObject,
  			then: function(err) {
  				if(!err) {
  					navigator.popPage();
  				}
  			}
  		})

  		// Toggling that contractor to "on" and saving it in the EDITABLE short list
  		// (thus user will have to press save in order for it to save)
		this.addContractorToShortlist(newlyAddedContractor.key);
  	},

  	popPage_CancelManageContractors: function(navigator) {
  		// Reset the editable short list to only include what was last provided by singleproject.
  		// Voiding the user's changes (as they cancelled them).
  		this.setState({
  			shortListedContractors_Editable: this.props.singleProject.shortListedContractors
  		})
  		navigator.popPage();
  		this.props.toggleTabbarVisibility(true);
  	},

	renderToolbar: function(route, navigator) {
		if (route.title == "Add Contractor") {
			return ('');
		}

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
		if (route.title == "Manage Contractors") {
			pageContent = <SingleProjectScheduleManageContractors 
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							addContractorToShortlist={this.addContractorToShortlist}
							removeContractorFromShortlist={this.removeContractorFromShortlist}
							shortListedContractors_Editable={this.state.shortListedContractors_Editable}
							navToAddContractor={me.pushPage_AddContractor.bind(me, navigator)}
							/>
		} else if (route.title == "Add Contractor") {
			var blankContractor = new Contractor({});
			pageContent = <NewContractor 
							singleContractor={blankContractor} 
							cancelCreate={me.popPage_CancelAddContractor.bind(me, navigator)}
							updateSingleContractor={me.popPage_SaveNewContractor.bind(me, navigator)}
							currentUser={this.props.currentUser}
							/>
		} else {
			pageContent = <SingleProjectScheduleGantt
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							shortListedContractorsDetails={this.props.shortListedContractorsDetails} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.props.navTo_ProjectSettings} 
							navToManageContractors={me.pushPage_ManageContractors.bind(me, navigator)}
							/>
		}

		return (
			<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
				{pageContent}
			</Ons.Page>
		);
	},

	updateTabbarVisibility_Show: function() {
		// this.props.toggleTabbarVisibility(true);
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
						title: this.props.singleProject.name,
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