var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var SingleProjectScheduleCell = React.createClass({
	mixins: [ReactFireMixin],

	onCellClick: function() {
		// console.log('clicked!');
		// console.log(this.props.contractorKey);
		// console.log(this.props.dateKey);
		// console.log(this.props.projectKey);

		this.props.onTap(this.props.contractorKey);
	},

	render: function() {
		var today = moment().format("MM-DD-YYYY");
		var dateKey = moment(this.props.dateKey);
		var rowIsToday = (today == this.props.dateKey) ? true : false;
		var rowIsWeekend = (dateKey.format("dddd") == "Saturday" || dateKey.format("dddd") == "Sunday") ? true : false;

		var rowBackgroundColor = 'white';
		if (rowIsWeekend) {
			rowBackgroundColor = 'rgb(240, 240, 240)';
		}
		if (rowIsToday) {
			rowBackgroundColor = 'rgb(248, 245, 235)';
		}

		var inActiveColStyle = {
			borderBottomColor: Styles.onsenGrey,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderRightColor: 'white',
			borderRightWidth: '0px',
			borderRightStyle: 'solid',
			fontSize: '40px',
			height: '49px',
			justifyContent: 'center',
			alignItems: 'center',
			display: 'flex',
			backgroundColor: rowBackgroundColor
		}
		var activeColStyle = {
			borderBottomColor: Styles.onsenGrey,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderRightColor: 'white',
			borderRightWidth: '0px',
			borderRightStyle: 'solid',
			fontSize: '40px',
			height: '49px',
			justifyContent: 'center',
			alignItems: 'center',
			display: 'flex',
			backgroundColor: rowBackgroundColor
		}

		if (this.props.active) {
			return (
				<div style={activeColStyle} onClick={this.onCellClick}>
					<Ons.Icon style={{color: '#4F8A10', fontSize:'40px'}} icon="fa-check-circle" />
				</div>
			)
		} else {
			return (
				<div style={inActiveColStyle} onClick={this.onCellClick}>
					<Ons.Icon style={{color: Styles.onsenGrey, opacity: '0.5', fontSize:'40px'}} icon="fa-times-circle-o" />
				</div>
			)
		}
	}
});

module.exports = SingleProjectScheduleCell;