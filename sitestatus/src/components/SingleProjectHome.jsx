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
			then: function(data){
				var reversedUpdates = data.reverse();
				this.setState({
					statusUpdates: reversedUpdates
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
			then: function(data){
				console.log('Fetched Status Updates')
				var reversedUpdates = data.reverse();
				this.setState({
						statusUpdatesLoading:false,
						statusUpdates: reversedUpdates
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

	navTo_ProjectSettings: function() {
		console.log('clicked navTo_ProjectSettings...');
		this.props.navTo_ProjectSettings(this.props.passedNavigator);
		// var singleProjectForProjectDetail = new Project(this.props.singleProject);
		// this.props.passedNavigator.pushPage({
		// 	title: PagesConstants.SINGLE_PROJECT_SETTINGS
		// })
		mixpanel.track("Viewing Project Settings",
		{
			"Project Name": this.props.singleproject.name
		})
	},

	// the default:
	navTo_SingleProjectTabs: function() {
		this.setState({
			authSingleProjectAppState: PagesConstants.SINGLE_PROJECT
		})
	},

	updateProjectDetails: function(projectObj) {		
		var me = this;		
		console.log('projectObj:');		
		console.log(projectObj);		
		
		// Updating Project:		
		var projectUpdateEndPoint = "projects/" + this.props.currentUser.uid + "/" + this.props.singleProject['key']		
		SiteStatusBase.update(projectUpdateEndPoint, {		
			data: projectObj,		
			then: function(err) {		
				if (!err) {		
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

	renderTabs: function() {
		if (!this.props.singleProject) {
			return '';
		}

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
							navToHub={this.props.navTo_GeneralPop} 
							navToProjectSettings={this.navTo_ProjectSettings} 
							scheduledContractors_Today={this.state.scheduledContractors_Today}
							statusUpdates={this.state.statusUpdates}
							statusUpdatesLoading={this.state.statusUpdatesLoading}
							fetchFirebaseStatusUpdates={this.fetchFirebaseStatusUpdates}
							/>,
				tab: <Ons.Tab key="Tab_SingleProjectStatusUpdateList" label='Updates' icon='envelope-o' />
			},
			{
				content: <SingleProjectSchedule 
							key='SingleProjectSchedule' 
							toggleTabbarVisibility={this.toggleTabbarVisibility} 
							singleProject={this.props.singleProject} 
							contractors={this.props.contractors} 
							shortListedContractorsDetails={shortListedContractorsDetails} 
							navToHub={this.props.navTo_GeneralPop} 
							navToProjectSettings={this.navTo_ProjectSettings} 
							addContractorToShortlist={this.addContractorToProjectShortlist}
							removeContractorFromShortlist={this.removeContractorFromProjectShortlist}
							updateProjectDetails={this.updateProjectDetails}
							currentUser={this.props.currentUser}
							/>,
				tab: <Ons.Tab key="Tab_SingleProjectSchedule" label='Contractors Onsite' icon='calendar-check-o' />
			}
		];
	},

	toggleTabbarVisibility: function(showHideSetter) {
		this.refs.tabs.refs.tabbar.setTabbarVisibility(showHideSetter);
	},

	render: function() {
		if (!this.props.singleProject) {
			return (
				<div style={{marginTop:'150px', display:'inline-block', width:'100%', textAlign:'center'}}>
					No project loaded.
					<div style={{marginTop:'25px'}}>
						<Ons.Button onClick={this.props.navTo_GeneralPop}>Return to Project Hub</Ons.Button>
					</div>
				</div>
				);
		}

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
	}
});

module.exports = SingleProjectHome;