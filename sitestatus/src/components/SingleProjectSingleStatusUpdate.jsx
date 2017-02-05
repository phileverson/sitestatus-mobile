var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var SingleProjectSingleStatusUpdate = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		return {
	  		singleUpdate: this.props.singleUpdate,
	  		relatedContractor: this.props.relatedContractor
		}
	},

	render: function() {
		// console.log(this.state.singleUpdate);
		// console.log(this.state.relatedContractor);

		return (
			<section>
				Status Update:
				{this.state.singleUpdate.Body}
				{this.state.singleUpdate['Date Sent']}
				{this.state.relatedContractor.firstName}
			</section>
		)
	}
});

module.exports = SingleProjectSingleStatusUpdate;