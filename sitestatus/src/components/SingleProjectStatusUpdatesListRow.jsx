var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var SingleProjectStatusUpdatesListRow = React.createClass({

	navToSingleStatusUpdate: function() {
		this.props.launchUpdate_SetActiveStatus(this.props.singleUpdate['key'], this.props.relatedContractor, this.props.passedNavigator);
		// this.props.launchUpdate_PushPage();
	},

	render: function() {
		// bail out if things haven't loaded yet...
	    if (!this.props.relatedContractor) {
	    	return (
	    		<div>Loading...</div>
	    	)
	    }

		var showHeader = true; // if there's no previous update, we should show header
		var currentUpdateDate = moment(this.props.singleUpdate['timestamp']).format("dddd, MMMM Do YYYY");
		if (this.props.previousUpdate) {
			var previousUpdateDate = moment(this.props.previousUpdate['timestamp']).format("dddd, MMMM Do YYYY");
			showHeader = (currentUpdateDate == previousUpdateDate) ? false : true;
		}
		//console.log({this.props.scheduledContractors_Today});

		return (

			<div>
			{showHeader &&
				<Ons.ListHeader>{currentUpdateDate}</Ons.ListHeader>
			}
			<Ons.ListItem modifier='chevron' key={this.props.index} onClick={this.navToSingleStatusUpdate}>
				<div className="center">
					<span className="list__item__title">
						{this.props.relatedContractor.firstName} {this.props.relatedContractor.lastName} | {this.props.relatedContractor.trade} 
					</span>
					<span className="list__item__subtitle">
						{this.props.singleUpdate.body}
					</span>
				</div>
			</Ons.ListItem>
			</div>
		)
	}
});

module.exports = SingleProjectStatusUpdatesListRow;