var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var SingleProjectStatusUpdatesListRow = require('./SingleProjectStatusUpdatesListRow.jsx');
var SingleProjectSingleStatusUpdate = require('./SingleProjectSingleStatusUpdate.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');

var index = 0;

var SingleProjectStatusUpdateList = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		var zeroContractorsScheduledToday = false;
		if (this.props.scheduledContractors_Today) {
			zeroContractorsScheduledToday = (this.props.scheduledContractors_Today.length > 0) ? false : true;
		}
	  return {
	  	activeStatusUpdateKey: '',
	  	activeStatusUpdateRelatedContractor: '',
	  	zeroContractorsScheduledToday: zeroContractorsScheduledToday,
	  	zeroContractorsScheduledTodayWarningShown: false
	  }
	},

	componentWillMount: function() {
		// var projectKey = this.props....
		var projectKey = 1; // hard coding for now
		var statusUpdates = firebase.database().ref("sitesh/" + projectKey).orderByKey();
		this.bindAsArray(statusUpdates, "statusUpdates");
	},

	setActiveStatusUpdateKey: function(keyPassed, contractorPassed) {
		this.setState({
			activeStatusUpdateKey: keyPassed,
			activeStatusUpdateRelatedContractor: contractorPassed
		})
	},

	pushPage: function(navigator) {
		navigator.pushPage({
			title: 'Update Details',
			hasBackButton: true
		});
	},

  	backToUpdateList: function(navigator) {
  		navigator.popPage();
  		this.setState({
  			activeStatusUpdateKey: null,
  			activeStatusUpdateRelatedContractor: null
  		})
  	},

  	zeroContractorsScheduledTodayWarningClear: function() {
  		this.setState({
  			zeroContractorsScheduledTodayWarningShown: true
  		})
  	},

	renderToolbar: function(route, navigator) {
		const leftButton = route.hasBackButton
		? <Ons.BackButton onClick={this.backToUpdateList.bind(this, navigator)}>Back</Ons.BackButton>
		: <Ons.ToolbarButton ><Ons.Icon icon='md-home' onClick={this.props.navToHub} /></Ons.ToolbarButton>

		return (
			<Ons.Toolbar>
				<div className='left'>{leftButton}</div>
				<div className='center'>{route.title}</div>
				<div className='right'>
				{!route.hasBackButton &&
					<Ons.ToolbarButton >
						<Ons.Icon icon='md-settings' onClick={this.props.navToProjectSettings} />
					</Ons.ToolbarButton>
				}
				</div>
			</Ons.Toolbar>
		);
	},

	renderSingleUpdate: function() {
		var singleUpdateData = Utils.findStatusUpdateByKey(this.state.activeStatusUpdateKey, this.state.statusUpdates);
		return (
			<SingleProjectSingleStatusUpdate
				singleUpdate={singleUpdateData}
				relatedContractor={this.state.activeStatusUpdateRelatedContractor}
			/>
		);
	},

	renderListOfUpdates: function(navigator) {
		var me = this;
		var allContractorsCopy = _.cloneDeep(me.props.allContractors);
		var allStatusUpdates = _.cloneDeep(this.state.statusUpdates);
		allStatusUpdates.reverse();
		var previousUpdateDate = null;
		if(allContractorsCopy) { // so for somereason, sometimes, allContractors is null. No clue why. This if prevents a reactfire error.
			return (
				<Ons.List>
				{allStatusUpdates.map(function(update, i){
					var relatedContractor = Utils.findContractorByPhoneNumber(update.From, allContractorsCopy);
					var previousUpdate = allStatusUpdates[(i-1)];

					return (
						<SingleProjectStatusUpdatesListRow
							previousUpdate={previousUpdate}
							singleUpdate={update}
							relatedContractor={relatedContractor}
							index={i}
							key={i}
							launchUpdate_PushPage={me.pushPage.bind(me, navigator)}
							launchUpdate_SetActiveStatus={me.setActiveStatusUpdateKey}
							/>
						);
					previousUpdateDate = updateDate;
				})}
				</Ons.List>
			)
		}
	},

	renderPage: function(route, navigator) {
		var pageContent;
		if (route.title == "Project Updates") {
			pageContent = this.renderListOfUpdates(navigator);
		} else {
			pageContent = this.renderSingleUpdate();
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
		var listOfUpdates = this.renderListOfUpdates(navigator);
		return (
			<Ons.Page>
				<Ons.Navigator
					renderPage={this.renderPage}
					initialRoute={{
						title: 'Project Updates',
						hasBackButton: false
					}}
					onPrePush={this.updateTabbarVisibility_Hide}
					onPostPop={this.updateTabbarVisibility_Show}
				/>
			<Ons.AlertDialog
				isOpen={false}
				isCancelable={true}>
				<div className='alert-dialog-title'>Warning!</div>
				<div className='alert-dialog-content'>
					An error has occurred!
				</div>
				<div className='alert-dialog-footer'>
					<button onClick={this.zeroContractorsScheduledTodayWarningClear} className='alert-dialog-button'>Ok</button>
				</div>
			</Ons.AlertDialog>
			</Ons.Page>
		);
	}
});

module.exports = SingleProjectStatusUpdateList;