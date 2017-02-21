var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Utils = require('util/util.jsx');
var Project = require('../models/project.jsx');

var SingleProjectStatusUpdateList = require('./SingleProjectStatusUpdateList.jsx');
var SingleProjectSchedule = require('./SingleProjectSchedule.jsx');
var NewProject = require('./NewProject.jsx');

var SingleProjectHome = React.createClass({

	getInitialState: function(){
	  return {
	  	index:0,
	  	scheduledContractors_Today: false,
	  	tabbarVisible: true,
	  	authSingleProjectAppState: PagesConstants.SINGLE_PROJECT,
	  	statusUpdates: GlobalConstants.LOADING,
	  	statusUpdatesLoading: true
	  }
	},

	componentWillMount: function() {
		this.fetchFirebaseStatusUpdates();
		this.listenFirebaseStatusUpdates();

		// Contractors scheduled to send updates today:
		var fullDate = moment();
		var dateKey = fullDate.format("MM-DD-YYYY");
		var projectKey = this.props.singleProject['key']

		var todaysScheduledEndPoint = "projects-schedule/" + projectKey + "/" + dateKey + "/contractors/"
		SiteStatusBase.bindToState(todaysScheduledEndPoint, {
			context: this,
			state: 'scheduledContractors_Today',
			asArray: true,
			then: function(){
				console.log("Updated state (through bindToState) for scheduledContractors_Today.");
			}
		});
	},

	listenFirebaseStatusUpdates: function() {
		var statusUpdatesEndPoint = "projects-status-updates/" + this.props.singleProject['key'];
		SiteStatusBase.listenTo(statusUpdatesEndPoint, {
			context: this,
			asArray: true,
			queries: {},
			then: function(data){
				this.setState({
					statusUpdates: data
				});
				console.log('Detected Change: Status Updates');
			}
		});
	},

	fetchFirebaseStatusUpdates: function(pullHook_Done) {
		var statusUpdatesEndPoint = "projects-status-updates/" + this.props.singleProject['key'];
		SiteStatusBase.fetch(statusUpdatesEndPoint, {
			context: this,
			state: 'statusUpdates',
			asArray: true,
			queries: {
			},
			then: function(data){
				console.log('Fetched Status Updates')
				this.setState({
						statusUpdatesLoading:false,
						statusUpdates: data
					}, function(){
						if (pullHook_Done) {
							setTimeout(() => {
								console.log('Released Status Updates PullHook');
								pullHook_Done();
							}, GlobalConstants.PULLHOOK_MIN_LOADING);
						}
					});
			}
		});
	},

	updateProjectDetails: function(projectObj) {
		var me = this;
		console.log('projectObj:');
		console.log(projectObj);

		// Updating Project:
		var projectUpdateEndPoint = "projects/" + this.props.currentUser.uid + "/" + this.props.singleProject['key'];
		SiteStatusBase.update(projectUpdateEndPoint, {
			data: projectObj,
			then: function(err) {
				if (!err) {
					if (projectObj.deleted) {
						me.props.navToHub();
					} else {
						me.navTo_SingleProjectTabs();
					}
				} else {
					console.log(err);
				}
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

		var shortListedContractorsDetails = [];
		if (this.props.singleProject.shortListedContractors) {
			for (var i = 0; i < this.props.singleProject.shortListedContractors.length; i++) {
				var newContractor = null;
				newContractor = Utils.findContractorByKey(this.props.singleProject.shortListedContractors[i], this.props.contractors);
				shortListedContractorsDetails.push(newContractor);
			}
		}

		return [
			{
				content: <SingleProjectStatusUpdateList 
							key='SingleProjectStatusUpdateList' 
							toggleTabbarVisibility={this.toggleTabbarVisibility} 
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.navTo_ProjectSettings} 
							scheduledContractors_Today={this.state.scheduledContractors_Today}
							statusUpdates={this.state.statusUpdates}
							statusUpdatesLoading={this.state.statusUpdatesLoading}
							fetchFirebaseStatusUpdates={this.fetchFirebaseStatusUpdates}
							/>,
				tab: <Ons.Tab label='Updates' icon='envelope-o' />
			},
			{
				content: <SingleProjectSchedule 
							key='SingleProjectSchedule' 
							toggleTabbarVisibility={this.toggleTabbarVisibility} 
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							shortListedContractorsDetails={shortListedContractorsDetails} 
							navToHub={this.props.navToHub} 
							navToProjectSettings={this.navTo_ProjectSettings} 
							addContractorToShortlist={this.addContractorToProjectShortlist}
							removeContractorFromShortlist={this.removeContractorFromProjectShortlist}
							updateProjectDetails={this.updateProjectDetails}
							currentUser={this.props.currentUser}
							/>,
				tab: <Ons.Tab label='Schedule' icon='calendar-check-o' />
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
	},

	render: function() {
		console.log(this.state);
		if (this.state.authSingleProjectAppState == PagesConstants.SINGLE_PROJECT) { // Updates & Scheduler
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
		} else { // Editing project details
			var singleProjectForProjectDetail = new Project(this.props.singleProject);
			return (
				<NewProject singleProject={singleProjectForProjectDetail} singleProjectKey={this.props.singleProject['key']} createNewOrUpdateProject={this.updateProjectDetails} cancelCreate={this.navTo_SingleProjectTabs} currentUser={this.props.currentUser}/>
			)
		} 
	}
});

module.exports = SingleProjectHome;