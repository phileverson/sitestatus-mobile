var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var StatusUpdatesListRow = require('./StatusUpdatesListRow.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');

var SingleProjectStatusUpdateList = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  }
	},

	componentWillMount: function() {
		// var projectKey = this.props....
		var projectKey = 1; // hard coding for now
		var statusUpdates = firebase.database().ref("sitesh/" + projectKey).orderByKey();
		this.bindAsArray(statusUpdates, "statusUpdates");

		console.log(this.props);
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Project Updates</div>
				<div className='right'>
				</div>
				<div className='left'>
					<Ons.ToolbarButton >
						<Ons.Icon icon='md-home' onClick={this.props.navToHub} />
					</Ons.ToolbarButton>
          		</div>
		    </Ons.Toolbar>
	  	)
	},

	renderListOfUpdates: function() {
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

					return <StatusUpdatesListRow previousUpdate={previousUpdate} singleUpdate={update} relatedContractor={relatedContractor} index={i} key={i} launchProject={me.navTo_SingleProject}/> ;
					previousUpdateDate = updateDate;
				})}
				</Ons.List>
			)
		}
	},

	render: function() {
		var listOfUpdates = this.renderListOfUpdates();
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			{listOfUpdates}
			</Ons.Page>
		)
	}
});

module.exports = SingleProjectStatusUpdateList;