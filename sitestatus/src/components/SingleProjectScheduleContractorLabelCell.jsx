var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var SingleProjectScheduleContractorLabelCell = React.createClass({

	render: function() {
		var me = this;
		var contractorCellStyle = {
			paddingLeft: '0px',
			fontSize: '12px'
		}
		var contractorColStyle = {
			borderBottomColor: Styles.onsenGrey,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderRightColor: Styles.onsenGrey,
			borderRightWidth: '1px',
			borderRightStyle: 'solid',
			paddingLeft: '5px',
			paddingRight: '5px',
			fontSize: '12px',
			overflow: 'hidden',
			height: '50px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			backgroundColor: 'white'
		}
		var contractorTradeStyle = {
			fontSize: '10px',
			fontStyle: 'italic'
		}

		if (!this.props.contractor) {
			return (
				<div>Loading...</div>
			);
		}

		return (
			<Ons.Row>
				<Ons.Col style={contractorColStyle}>
					<div>{this.props.contractor.firstName + " " + this.props.contractor.lastName}</div>
					<div style={contractorTradeStyle}>{this.props.contractor.trade}</div>
				</Ons.Col>
			</Ons.Row>
		)
	}
});

module.exports = SingleProjectScheduleContractorLabelCell;