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
		var toFromStyle = {
	      width: '100%',
	      background: 'white',
	      borderBottom: 'solid',
	      borderColor: '#ccc',
	      borderWidth: '1pt'
	    }
	    var bodyStyle ={

	      background: 'white',
	      paddingTop: '10%',
	      paddingBottom: '10%',
	      paddingRight: '5%',
	      paddingLeft: '5%',
	      borderBottom: 'solid',
	      borderColor: '#ccc',
	      borderWidth: '1pt'
	    }
		return (
		
			<section>
				<div style={toFromStyle}>
				<b>From: </b>  {this.state.relatedContractor.firstName} {this.state.relatedContractor.lastName}
				</div>
				<div style={toFromStyle}>
				<b>Date Sent: </b>  {this.state.singleUpdate['Date Sent']}
				</div>
				<div style={bodyStyle}>
				{this.state.singleUpdate.Body}
				</div>
				
			</section>
		)
	}
});

module.exports = SingleProjectSingleStatusUpdate;