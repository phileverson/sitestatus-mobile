var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var SingleProjectStatusUpdatesListRow = require('./SingleProjectStatusUpdatesListRow.jsx');
var SingleProjectSingleStatusUpdate = require('./SingleProjectSingleStatusUpdate.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');
var Loading = require('./Loading.jsx');

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

	setActiveStatusUpdateKey: function(keyPassed, contractorPassed, passedNavigator) {
		this.setState({
			activeStatusUpdateKey: keyPassed,
			activeStatusUpdateRelatedContractor: contractorPassed
		})

		passedNavigator.pushPage({
			title: 'Update Details',
			hasBackButton: true
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

		if(allContractorsCopy) { // so for somereason, sometimes, allContractors is null. No clue why. This if prevents a reactfire error.
			if (this.props.statusUpdatesLoading || !this.props.statusUpdates) {
				return (
			    	<Loading />
			    )
			} else if (this.props.statusUpdates == 0) {
				return (
		        	<div> No updates bro...</div>
		        )
			} else {
				return (
					<Ons.List>
					<Ons.PullHook onChange={this.pullHookHandleChange} onLoad={this.props.fetchFirebaseStatusUpdates} >
						{this.pullHookGetContent()}
					</Ons.PullHook>
					{me.props.statusUpdates.map(function(update, i){
						var relatedContractor = Utils.findContractorByPhoneNumber(update.From, allContractorsCopy);
						var previousUpdate = me.props.statusUpdates[(i-1)];

						return (
							<SingleProjectStatusUpdatesListRow
								previousUpdate={previousUpdate}
								singleUpdate={update}
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
		if (route.title == "Update Details") {
			pageContent = this.renderSingleUpdate();
		} else {
			pageContent = this.renderListOfUpdates(navigator);
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
						title: this.props.singleProject.name,
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