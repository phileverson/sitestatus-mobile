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
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<section>
					<Ons.List>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.firstName}
							onChange={this.handleFirstNameChange}
							modifier='underbar'
							placeholder='first' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.lastName}
							onChange={this.handleLastNameChange}
							modifier='underbar'
							placeholder='last name' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.phone}
							onChange={this.handlePhoneChange}
							modifier='underbar'
							placeholder='phone' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.emailAddress}
							onChange={this.handleEmailAddressChange}
							modifier='underbar'
							placeholder='email' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.company}
							onChange={this.handleCompanyChange}
							modifier='underbar'
							placeholder='comp bro' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							style={{width: '100%', 'paddingRight': '14px'}}
							className="center"
							value={this.state.trade}
							onChange={this.handleTradeChange}
							modifier='underbar'
							placeholder='trade' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							style={{width: '100%', 'paddingRight': '14px'}}
							className="center"
							value={this.state.note}
							onChange={this.handleNoteChange}
							modifier='underbar'
							placeholder='note' />
						</Ons.ListItem>
					</Ons.List>
				</section>
			</Ons.Page>
		)
	}
});

module.exports = NewContractor;