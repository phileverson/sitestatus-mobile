var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var Contractor = require('../models/contractor.jsx');
var Utils = require('util/util.jsx');

var NewContractor = React.createClass({

	getInitialState: function(){
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

	componentDidMount: function() {
		this.props.deactivateGlobalModal();
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
			owner: this.props.currentUser.uid,

			errorMessages: this.state.errorMessages
		}

		mixpanel.track("Create Contractor",
		{
		"Contractor Name":  contractor.firstName
		});		
		return new Contractor(contractor);
	},

	handleContractorDelete: function(){
		var changingContractor=this.createContractorObject();
		changingContractor.deleted=true;
		this.props.updateSingleContractor(changingContractor);
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
	      width: '100%'
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
	      height: '70px'
	    }
	    var fieldHeaderStyle={
	    	fontSize: '12px',
	    	color:'#2664AB'
	    }
	    var prettyPhoneFormat = this.state.phone;
	    if (prettyPhoneFormat.length > 3 && (prettyPhoneFormat.charAt(3) != '-')) {
	    	prettyPhoneFormat = Utils.insertInString(prettyPhoneFormat, 3, '-');
	    }
	    if (prettyPhoneFormat.length > 7 && (prettyPhoneFormat.charAt(7) != '-')) {
	    	prettyPhoneFormat = Utils.insertInString(prettyPhoneFormat, 7, '-');
	    }
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<section>
					<Ons.List>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.firstName && this.state.errorMessages.firstName.length > 0 &&
				              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.firstName}</div>
				            }
					            <div className='list__item__title' style={fieldHeaderStyle}>
									First Name
								</div>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.firstName}
								onChange={this.handleFirstNameChange}
								modifier='underbar'
								placeholder='Johnny' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.lastName && this.state.errorMessages.lastName.length > 0 &&
				              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.lastName}</div>
				            }
				            	<div className='list__item__title' style={fieldHeaderStyle}>
									Last Name
								</div>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.lastName}
								onChange={this.handleLastNameChange}
								modifier='underbar'
								placeholder='Smith' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.phone && this.state.errorMessages.phone.length > 0 &&
				              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.phone}</div>
				            }
				            	<div className='list__item__title' style={fieldHeaderStyle}>
									Phone Number
								</div>
								<Ons.Input
								style={inputItemStyle}
								maxlength="12"
								className="center"
								value={prettyPhoneFormat}
								type='tel'
								onChange={this.handlePhoneChange}
								modifier='underbar'
								placeholder='416 123 4567' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Email
								</div>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.emailAddress}
								onChange={this.handleEmailAddressChange}
								modifier='underbar'
								placeholder='johnny.smith@acme.com' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Company
								</div>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.company}
								onChange={this.handleCompanyChange}
								modifier='underbar'
								placeholder='Acme Inc' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Trade
								</div>
								<Ons.Input
								style={inputItemStyle}
								value={this.state.trade}
								onChange={this.handleTradeChange}
								modifier='underbar'
								placeholder='Plumber, Contractor, Brick Layer' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div className='list__item__title' style={fieldHeaderStyle}>
								Notes
							</div>
							<div style= {noteBoxOutside}>
								<textarea
								style={noteBoxInside}
								value={this.state.note}
								onChange={this.handleNoteChange}
								placeholder='Note' ></textarea>
							</div>
						</Ons.ListItem>
					</Ons.List>
					<p> </p>
					
						{(this.props.activeContractorKey) &&
						
						<Ons.List>
						<Ons.ListItem modifier='longdivider' style={{color:'red'}} tappable="true" tapbackgroundcolor="red" onClick={this.handleContractorDelete}>Delete Contractor
						</Ons.ListItem>
						</Ons.List>
						}
				</section>
			</Ons.Page>
		)
	}
});

module.exports = NewContractor;