var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var Contractor = require('../models/contractor.jsx');

var NewContractor = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		console.log(this.props);
		return {
			firstName: this.props.singleContractor.firstName,
			lastName: this.props.singleContractor.lastName,
			phone: this.props.singleContractor.phone,
			emailAddress: this.props.singleContractor.emailAddress,
			company: this.props.singleContractor.company,
			trade: this.props.singleContractor.trade,
			note: this.props.singleContractor.note,

			errorMessages: this.props.singleContractor.errorMessages
		}
	},

	updateSingleContractor: function(e) {
		e.preventDefault();
		var changingContractor = this.createContractorObject();
		var changingContractorIsValid = changingContractor.isValid();
		if (changingContractorIsValid.isValid) {
			changingContractor = changingContractor.preparePutObject();
			this.props.updateSingleContractor(changingContractor);
		} else {
			var mergedErrorMessages = _.merge(this.state.errorMessages, changingContractorIsValid.errorMessages);
			this.setState({
				errorMessages: changingContractorIsValid.errorMessages
			})
		}
	},

	createContractorObject: function() {
		var contractor = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phone: this.state.phone,
			emailAddress: this.state.emailAddress,
			company: this.state.company,
			trade: this.state.trade,
			note: this.state.note,

			errorMessages: this.state.errorMessages
		}
		return new Contractor(contractor);
	},

	handleFirstNameChange: function(e){
		var me = this;
		var tempContractorObject = new Contractor({
			firstName: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempContractorObject.isValidFirstName());
		me.setState({
			firstName: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleLastNameChange: function(e){
		var me = this;
		var tempContractorObject = new Contractor({
			lastName: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempContractorObject.isValidLastName());
		me.setState({
			lastName: e.target.value,
			errorMessages: errorMessages
		});
	},

	handlePhoneChange: function(e){
		var me = this;
		var tempContractorObject = new Contractor({
			phone: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempContractorObject.isValidPhone());
		me.setState({
			phone: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleEmailAddressChange: function(e){
		var me = this;
		var tempContractorObject = new Contractor({
			emailAddress: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempContractorObject.isValidEmailAddress());
		me.setState({
			emailAddress: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleCompanyChange: function(e){
		var me = this;
		var tempContractorObject = new Contractor({
			company: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempContractorObject.isValidCompany());
		me.setState({
			company: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleTradeChange: function(e){
		var me = this;
		var tempContractorObject = new Contractor({
			trade: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempContractorObject.isValidTrade());
		me.setState({
			trade: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleNoteChange: function(e){
		var me = this;
		me.setState({
			note: e.target.value
		});
	},

	renderToolbar: function() {
		var toolbarTitle = 'Add Contractor';
		if (this.props.activeContractorKey) {
			toolbarTitle = 'Edit Contractor';
		}
	    return (
		    <Ons.Toolbar>
				<div className='center'>{toolbarTitle}</div>
				<div className='right'>
					<Ons.ToolbarButton onClick={this.updateSingleContractor}>
						Save
					</Ons.ToolbarButton>
				</div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.cancelCreate}>
						Cancel
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	render: function() {
		console.log(this.state.errorMessages);
	    var errorMessageTextStyle = {
	      color: 'red',
	      fontSize: '8px',
	      background: 'white',
	      width: '100%',

	    }
	    var inputItemStyle = {
	      width: '100%'
	    }
	    var divListItemStyle ={
	      width: '100%'
	    }
	    var noteBoxInside ={
	      width: '98%',
	      height: '100%',
	      borderStyle: 'solid',
	      borderWidth: '1px',
	      borderColor: '#ccc',
	      fontSize: '15px',
    	  lineHeight: '1',
    	  fontFamily: '-apple-system, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif'
	    }
	    var noteBoxOutside ={
	      width: '100%',
	      height: '100px',
	      
	      
	    }
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<section>
					<Ons.List>
						<Ons.ListItem modifier="nodivider">
<<<<<<< HEAD
							<div style={divListItemStyle}>
							{this.state.errorMessages.firstName && this.state.errorMessages.firstName.length > 0 &&
				              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.firstName}</div>
				            }
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.firstName}
								onChange={this.handleFirstNameChange}
								modifier='underbar'
								placeholder='First Name' />
								{this.state.errorMessages.firstName && this.state.errorMessages.firstName.length > 0 &&
								<span>{this.state.errorMessages.firstName}</span>
								}
							</div>
=======
							<Ons.Input
							className="center"
							value={this.state.firstName}
							onChange={this.handleFirstNameChange}
							modifier='underbar'
							placeholder='first' />
>>>>>>> 282593e2b6e9011c1c1c0eb2b4563394de4456e9
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.lastName && this.state.errorMessages.lastName.length > 0 &&
				              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.lastName}</div>
				            }
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.lastName}
								onChange={this.handleLastNameChange}
								modifier='underbar'
								placeholder='Last Name' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.phone && this.state.errorMessages.phone.length > 0 &&
				              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.phone}</div>
				            }
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.phone}
								onChange={this.handlePhoneChange}
								modifier='underbar'
								placeholder='Phone' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.emailAddress}
								onChange={this.handleEmailAddressChange}
								modifier='underbar'
								placeholder='Email' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.company}
								onChange={this.handleCompanyChange}
								modifier='underbar'
								placeholder='Company' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<Ons.Input
								style={inputItemStyle}
								value={this.state.trade}
								onChange={this.handleTradeChange}
								modifier='underbar'
								placeholder='Trade' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style= {noteBoxOutside}>
								<textarea
								style={noteBoxInside}
								value={this.state.note}
								onChange={this.handleNoteChange}
								modifier='underbar'
								placeholder='Note' ></textarea>
							</div>
						</Ons.ListItem>
					</Ons.List>
				</section>
			</Ons.Page>
		)
	}
});

module.exports = NewContractor;