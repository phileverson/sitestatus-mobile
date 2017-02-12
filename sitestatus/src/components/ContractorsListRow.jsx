var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var ContractorsListRow = React.createClass({
	mixins: [ReactFireMixin],

	setActiveContractorInHub: function() {
		this.props.requestContractorEdit(this.props.singleContractor['.key'])
	},

	renderToggleSwitch: function() {
		return (
			<Ons.Switch checked={this.props.contractorChecked} onChange={this.handleToggleSwitchChange} />
		)
	},

	handleToggleSwitchChange: function() {
		this.props.toggleSwitchChange(this.props.singleContractor['.key']);
	},

	render: function() {
		// console.log(this.props);
		var contractorLineStyle = {
	      fontSize: '8px',
	    }
	    var listItemModifier = 'chevron';
	    var onClick = this.setActiveContractorInHub;
	    var toggleSwitch;

	    if (this.props.schedule) {
	    	listItemModifier = '';
	    	onClick = this.handleContractorPress;
	    	toggleSwitch = this.renderToggleSwitch();
	    }
		return (
			<Ons.ListItem modifier={listItemModifier} key={this.props.index} onClick={onClick}>
				<div className="center">
					<span className="list__item__title">
						{this.props.singleContractor.firstName + ' ' + this.props.singleContractor.lastName}
					</span>
					<span className="list__item__subtitle">
						{this.props.singleContractor.trade+ ' | ' +this.props.singleContractor.company}
					</span>
				</div>
				{this.props.schedule &&
					<div className="right">{toggleSwitch}</div>
				}
			</Ons.ListItem>
		)
	}
});

module.exports = ContractorsListRow;