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
	handleText: function(e){
		console.log(this.state.relatedContractor.phone);
		var phoneNum = this.state.relatedContractor.phone;
		window.location.href='sms://'+phoneNum;
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
	    var headerStyle={
	    	paddingTop: '4pt'
	    }
	    var buttonStyle={
	    	marginLeft: '6px'
		}
		return (
		
			<section>
				<Ons.List>
					<Ons.ListHeader style={headerStyle}>
						<b>Contractor:</b>
					</Ons.ListHeader>
					<Ons.ListItem>
					<div className= 'left'>
						{this.state.relatedContractor.firstName+" "+this.state.relatedContractor.lastName+" | "+this.state.relatedContractor.trade}
					</div>
					<div className = 'right'>
						<Ons.Button style={buttonStyle} value={this.state.relatedContractor.phone} onClick={this.handleCall}>
							<Ons.Icon icon='fa-phone'/>
						</Ons.Button>
						<Ons.Button style={buttonStyle} value={this.state.relatedContractor.phone} onClick={this.handleText}>
							<Ons.Icon icon='comment-o'/>
						</Ons.Button>
					</div>
					</Ons.ListItem>
					<Ons.ListHeader style={headerStyle}>
						<b>Date Sent:</b>
					</Ons.ListHeader>
					<Ons.ListItem>
						{this.state.singleUpdate['Date Sent']}
					</Ons.ListItem>
					<Ons.ListHeader style={headerStyle}>
						<b>Update:</b>
					</Ons.ListHeader>
					<Ons.ListItem>
						{this.state.singleUpdate.Body}
					</Ons.ListItem>
				</Ons.List>
			</section>
		)
	}
});

module.exports = SingleProjectSingleStatusUpdate;