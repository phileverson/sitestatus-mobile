var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var SingleProjectStatusUpdatesListRow = require('./SingleProjectStatusUpdatesListRow.jsx');
var SingleProjectSingleStatusUpdate = require('./SingleProjectSingleStatusUpdate.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');
var Loading = require('./Loading.jsx');

var index = 0;

var SingleProjectStatusUpdateList = React.createClass({

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

	setActiveStatusUpdateKey: function(keyPassed, contractorPassed, passedNavigator) {
		this.setState({
			activeStatusUpdateKey: keyPassed,
			activeStatusUpdateRelatedContractor: contractorPassed
		})

		passedNavigator.pushPage({
			title: 'Update Details',
			hasBackButton: true
		});
		mixpanel.track("Viewing Single Update",
		{
		"Project Name": this.props.singleProject.name,
		"Status Update Key": keyPassed
		});		
	},

	pushPage: function(navigator) {
		// navigator.pushPage({
		// 	title: 'Update Details',
		// 	hasBackButton: true
		// });
		console.log('called old pushPage navigator...');
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
		: <Ons.ToolbarButton onClick={this.props.navToHub}><Ons.Icon icon='md-home' /></Ons.ToolbarButton>

		var toolbarTitleCenter = this.props.singleProject.name;
		if (route.title == PagesConstants.SINGLE_PROJECT_STATE_UPDATE_DETAIL) {
			toolbarTitleCenter = PagesConstants.SINGLE_PROJECT_STATE_UPDATE_DETAIL;
		}

		return (
			<Ons.Toolbar>
				<div className='left'>{leftButton}</div>
				<div className='center'>{toolbarTitleCenter}</div>
				<div className='right'>
				{!route.hasBackButton &&
					<Ons.ToolbarButton onClick={this.props.navToProjectSettings} >
						<Ons.Icon icon='md-settings'/>
					</Ons.ToolbarButton>
				}
				</div>
			</Ons.Toolbar>
		);
	},

	renderSingleUpdate: function() {
		var singleUpdateData = Utils.findStatusUpdateByKey(this.state.activeStatusUpdateKey, this.props.statusUpdates);
		return (
			<SingleProjectSingleStatusUpdate
				singleUpdate={singleUpdateData}
				relatedContractor={this.state.activeStatusUpdateRelatedContractor}
			/>
		);
	},

	pullHookGetContent: function() {
	    switch (this.state.state) {
	      case 'initial':
	        return 'Pull to Refresh';
	      case 'preaction':
	       mixpanel.track("Pulled to Refresh",
			{
			"App Location": "Single Project",
			"Project Name": this.props.singleProject.name
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

	renderListOfUpdates: function(navigator) {
		var me = this;
		var allContractorsCopy = _.cloneDeep(me.props.contractors);

		var noUpdatesStyle = {
			marginTop: '20px',
			marginLeft: '30px',
			marginRight: '30px',
			textAlign: 'center',
			width: '100%'
		}

		if(allContractorsCopy) { // so for somereason, sometimes, allContractors is null. No clue why. This if prevents a reactfire error.
			if (this.props.statusUpdatesLoading || !this.props.statusUpdates) {
				return (
			    	<Loading />
			    )
			} else if (this.props.statusUpdates == 0) {
				return (
					<div style={{'display': 'inline-flex'}}>
		        	<div style={noUpdatesStyle}>
		        		<Ons.Icon style={{'fontSize': '50px', marginBottom: '20px', alignSelf: 'center', width: '100%'}} icon='fa-exclamation-circle' />
		        		No status updates have been received for this project.
		        	</div>
		        	</div>
		        )
			} else {
				return (
					<Ons.List>
					{me.props.statusUpdates.map(function(update, i){
						var relatedContractor = Utils.findContractorByPhoneNumber(update.from, allContractorsCopy);
						var previousUpdate = me.props.statusUpdates[(i-1)];
						
						return (
							<SingleProjectStatusUpdatesListRow

								previousUpdate={previousUpdate}
								singleUpdate={update}
								allContractors={allContractorsCopy}
								relatedContractor={relatedContractor}
								index={i}
								key={i}
								passedNavigator={navigator}
								launchUpdate_PushPage={me.pushPage.bind(me, navigator)}
								launchUpdate_SetActiveStatus={me.setActiveStatusUpdateKey}
								/>
							);
					})}
					</Ons.List>
				)
			}
		}
	},

	renderPage: function(route, navigator) {
		var pageContent;
		//get all contractors that are supposed to be onsite for that day
		var me = this;
		var todayContractorListStyle={
			fontSize:'10px',
			paddingTop: '0px'
		}
		var allContractorsCopy = _.cloneDeep(me.props.contractors);
		var expectedContractorIds=me.props.scheduledContractors_Today;
		var expectedContractorNames=[];
		for (var i=0; i<expectedContractorIds.length; i++){
			var contractorObject=Utils.findContractorByKey(expectedContractorIds[i],allContractorsCopy);
			var currContractorName= contractorObject.firstName+ " "+ contractorObject.lastName;
			expectedContractorNames.push(currContractorName);
		}
		var expectedContractorNamesInString = _.cloneDeep(expectedContractorNames).join(', ');
		// console.log(expectedContractorNames);
		var showProjectSchedulerNotice = this.props.scheduledContractors_Today;
		var showTodaysContractors = false;
		if (route.title == PagesConstants.SINGLE_PROJECT_STATE_UPDATE_DETAIL) {
			pageContent = this.renderSingleUpdate();
			showProjectSchedulerNotice = false;
		} else {
			pageContent = this.renderListOfUpdates(navigator);
			showProjectSchedulerNotice = true;
			if (expectedContractorNames.length > 0){
				showTodaysContractors = true;
			}
		}
		var projectSchedulerNoticeStyle_NoContractors = {
			background: Styles.warningRed,
			padding: '5px',
			display: 'flex',
			color: '#D8000C',
			fontSize: '13px'
		}
		var projectSchedulerNoticeStyle_ExpectingContractors = {
			background: Styles.onsenBlue,
			padding: '5px',
			display: 'flex',
			color: '#FFF',
			fontSize: '13px'
		}
		if (showProjectSchedulerNotice) {
			return (
				<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
					<Ons.PullHook onChange={this.pullHookHandleChange} onLoad={this.props.fetchFirebaseStatusUpdates} >
						{this.pullHookGetContent()}
					</Ons.PullHook>
					{showTodaysContractors &&
				        <div style={projectSchedulerNoticeStyle_ExpectingContractors}>
			        		 <Ons.Icon style={{marginRight:'5px', 'fontSize': '30px', alignSelf: 'center'}} icon='fa-users' /> 
			        		 <div>Contractors Onsite Today: {expectedContractorNamesInString}</div>
			        	</div>
				    }
			        {!showTodaysContractors &&
			        	<div style={projectSchedulerNoticeStyle_NoContractors}>
			        		 <Ons.Icon style={{marginRight:'5px', 'fontSize': '30px', alignSelf: 'center'}} icon='fa-user-times' /> 
			        		 <div>No contractors are scheduled to receive status update requests today. Please mark contractors onsite.</div>
			        	</div>
			        }
					{pageContent}
				</Ons.Page>
			)
		} else {
			return (
				<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
					{pageContent}
				</Ons.Page>
			)
		}
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
						title: this.props.singleProject.name,
						hasBackButton: false
					}}
					onPrePush={this.updateTabbarVisibility_Hide}
					onPostPop={this.updateTabbarVisibility_Show}
				/>
			</Ons.Page>
		);
	}
});

module.exports = SingleProjectStatusUpdateList;