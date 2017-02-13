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

	// getInitialState: function(){
	//   return {
	//   	activeStatusUpdateKey: '',
	//   	activeStatusUpdateRelatedContractor: ''
	//   }
	// },

	// setActiveStatusUpdateKey: function(keyPassed, contractorPassed) {
	// 	this.setState({
	// 		activeStatusUpdateKey: keyPassed,
	// 		activeStatusUpdateRelatedContractor: contractorPassed
	// 	})
	// },

	pushPage_ManageContractors: function(navigator) {
		navigator.pushPage({
			title: 'Manage Contractors',
			hasBackButton: true
		});
	},

  	popPage: function(navigator) {
  		navigator.popPage();
  	},

	renderToolbar: function(route, navigator) {
		const leftButton = route.hasBackButton
		? <Ons.ToolbarButton onClick={this.popPage.bind(this, navigator)}>Cancel</Ons.ToolbarButton>
		: <Ons.ToolbarButton ><Ons.Icon icon='md-home' onClick={this.props.navToHub} /></Ons.ToolbarButton>
		const rightButton = !route.hasBackButton
		? <Ons.ToolbarButton ><Ons.Icon icon='md-settings' onClick={this.props.navToProjectSettings} /></Ons.ToolbarButton>
		: <Ons.ToolbarButton onClick={this.popPage.bind(this, navigator)}>Save</Ons.ToolbarButton>

		return (
			<Ons.Toolbar>
				<div className='left'>{leftButton}</div>
				<div className='center'>{route.title}</div>
				<div className='right'>{rightButton}</div>
			</Ons.Toolbar>
		);
	},

	renderSingleProjectScheduleManageContractors: function() {
		return (
			<SingleProjectScheduleManageContractors 
							singleProject={this.props.singleProject} 
							allContractors={this.props.allContractors} 
							addContractorToShortlist={this.props.addContractorToShortlist} 
							removeContractorFromShortlist={this.props.removeContractorFromShortlist} 
							/>
		);
	},

	renderPage: function(route, navigator) {
		var me = this;
		var pageContent;
		if (route.title == "Project Schedule") {
			pageContent = <SingleProjectScheduleGantt
							singleProject={this.props.singleProject} 
							allContractors={this.props.allContractors} 
							shortListedContractorsDetails={this.props.shortListedContractorsDetails} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.props.navTo_ProjectSettings} 
							navToManageContractors={me.pushPage_ManageContractors.bind(me, navigator)}
							/>
		} else {
			pageContent = this.renderSingleProjectScheduleManageContractors();
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