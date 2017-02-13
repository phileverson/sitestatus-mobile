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

	handleCall: function(e){
		//console.log(e.target.value);
		console.log(this.state.relatedContractor.phone);
		var phoneNum = this.state.relatedContractor.phone;
		window.location.href='tel://'+phoneNum;
	},

	render: function() {
		// console.log(this.state.singleUpdate);
		// console.log(this.state.relatedContractor);
		var toFromStyle = {
			fontSize: '12'
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
						<b>{this.state.relatedContractor.firstName+" "+this.state.relatedContractor.lastName+" | "+this.state.relatedContractor.trade}</b>
					</Ons.ListItem>
					<Ons.ListItem>
						{"Date Sent: "+this.state.singleUpdate['Date Sent']}
					</Ons.ListItem>
					<Ons.ListItem>
						{this.state.singleUpdate.Body}
					</Ons.ListItem>
					<Ons.ListItem>
						<Ons.Button value={this.state.relatedContractor.phone} onClick={this.handleCall}>Call {this.state.relatedContractor.firstName}</Ons.Button>
						<a href="tel://1-555-555-5555">+1 (555) 555-5555</a>
					</Ons.ListItem>
				</Ons.List>
			</section>
		)
	}
});

module.exports = SingleProjectSingleStatusUpdate;