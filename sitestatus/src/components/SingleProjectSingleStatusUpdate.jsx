var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var Loading = require('./Loading.jsx');

var SingleProjectSingleStatusUpdate = React.createClass({
	// mixins: [ReactFireMixin],

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

		mixpanel.track("Single Status Update Contractor Phone Call Click",
		{
		});	
	},
	
	handleText: function(e){
		console.log(this.state.relatedContractor.phone);
		var phoneNum = this.state.relatedContractor.phone;
		window.location.href='sms://'+phoneNum;

		mixpanel.track("Single Status Update Contractor SMS Click",
		{
		});		
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
		var imageFrameStyle = {
			paddingRight: '8px',
			minHeight: '250px'
		}
		var imageStyle = {
			width: '100%',
			zIndex: '2'
		}
		var imageLoadingIndicator = {
			zIndex: '1',
			position: 'absolute',
			left: '14px',
			right: '14px'
		}
		var prettyDate = moment(this.state.singleUpdate['timestamp']).format("dddd, MMMM Do YYYY, h:mm:ss a");

		var imageLabel = (this.state.singleUpdate.media2) ? "Images" : "Image";

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
						{prettyDate}
					</Ons.ListItem>
					<Ons.ListHeader style={headerStyle}>
						<b>Update:</b>
					</Ons.ListHeader>
					<Ons.ListItem>
						{this.state.singleUpdate.body}
					</Ons.ListItem>
					{(this.state.singleUpdate.media1) &&
						<Ons.ListHeader style={headerStyle}>
							<b>Included {imageLabel}:</b>
						</Ons.ListHeader>
					}
					{(this.state.singleUpdate.media1) &&
						<Ons.ListItem style={imageFrameStyle}>
							<div style={imageLoadingIndicator}>
								<Ons.ProgressBar indeterminate />
								<div style={{textAlign: 'center', marginTop:'5px'}}>
									Loading Image...
								</div>
							</div>
							<img style={imageStyle} src={this.state.singleUpdate.media1} />
						</Ons.ListItem>
					}
					{(this.state.singleUpdate.media2) &&
						<Ons.ListItem style={imageFrameStyle}>
							<img style={imageStyle} src={this.state.singleUpdate.media1} />
						</Ons.ListItem>
					}
					{(this.state.singleUpdate.media3) &&
						<Ons.ListItem style={imageFrameStyle}>
							<img style={imageStyle} src={this.state.singleUpdate.media1} />
						</Ons.ListItem>
					}
					{(this.state.singleUpdate.media4) &&
						<Ons.ListItem style={imageFrameStyle}>
							<img style={imageStyle} src={this.state.singleUpdate.media1} />
						</Ons.ListItem>
					}
				</Ons.List>
			</section>
		)
	}
});

module.exports = SingleProjectSingleStatusUpdate;