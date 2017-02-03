var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var StatusUpdatesListRow = React.createClass({
	mixins: [ReactFireMixin],

	setActiveProjectInHub: function() {
		this.props.launchProject(this.props.singleUpdate['.key'])
	},

	render: function() {
		// this.props.singleUpdate contains status update object
		// console.log(this.props.singleUpdate);
		// this.props.relatedContractor contains contractor object
		// console.log(this.props.relatedContractor);

		var showHeader = true; // if there's no previous update, we should show header
		var currentUpdateDate = moment(this.props.singleUpdate['Date Sent']).format("dddd, MMMM Do YYYY");
		if (this.props.previousUpdate) {
			var previousUpdateDate = moment(this.props.previousUpdate['Date Sent']).format("dddd, MMMM Do YYYY");
			showHeader = (currentUpdateDate == previousUpdateDate) ? false : true;
		}
		
		return (
			<div>
			{showHeader &&
				<Ons.ListHeader>{currentUpdateDate}</Ons.ListHeader>
			}
			<Ons.ListItem modifier='chevron' key={this.props.index} onClick={this.setActiveProjectInHub}>
				<div className="center">
					<span className="list__item__title">
						{this.props.relatedContractor.firstName} {this.props.singleUpdate.From}
					</span>
				</div>
			</Ons.ListItem>
			</div>
		)
	}
});

module.exports = StatusUpdatesListRow;