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
	      borderWidth: '1pt',
	      paddingTop: '1%',
	      paddingRight: '2%'
	    }
	    var bodyStyle ={

	      background: 'white',
	      paddingTop: '5%',
	      paddingBottom: '5%',
	      paddingRight: '2%',
	      paddingLeft: '2%',
	      borderBottom: 'solid',
	      borderColor: '#ccc',
	      borderWidth: '1pt'
	    }
		return (
		
			<section>
				<Ons.List>
					<Ons.ListItem>
						<b>From: </b>  {this.state.relatedContractor.firstName} {this.state.relatedContractor.lastName}
					</Ons.ListItem>
					<Ons.ListItem>
						<b>Date Sent: </b>  {this.state.singleUpdate['Date Sent']}
					</Ons.ListItem>
					<Ons.ListItem>
						{this.state.singleUpdate.Body}
					</Ons.ListItem>
				</Ons.List>
			</section>
		)
	}
});

module.exports = SingleProjectSingleStatusUpdate;