var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var ProjectsListRow = require('./ProjectsListRow.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');

var SingleProjectScheduleRow = React.createClass({
	mixins: [ReactFireMixin],

	renderCheckboxRow: function(row) {
    return (
          <Ons.Input
            inputId={`checkbox-${row}`}
            type='checkbox'
          />
    )
  },

	render: function() {
		var borderColor = "#CCCCCC";
		var singleDayHeaderStyle = {
			padding: '0px',
			fontSize: '12px',
			height: '40px',
			display: 'block',
			backgroundColor: borderColor
		}
		var singleDayCellStyle = {
			paddingRight: '0px',
			fontSize: '12px',
			display: 'block'
		}
		var dayNameStyle = {
			fontSize: '10px',
			color: 'grey',
			textAlign: 'center',
			display:'block'
		}
		var monthNameStyle = {
			fontSize: '10px',
			textAlign: 'center',
			display:'block'
		}
		var dateNumStyle = {
			textAlign: 'center',
			display:'block'
		}
		var checkColStyle = {
			borderBottomColor: borderColor,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderRightColor: borderColor,
			borderRightWidth: '1px',
			borderRightStyle: 'solid',
			fontSize: '12px',
			height: '49px',
			justifyContent: 'center',
			alignItems: 'center',
			display: 'flex'
		}
		var fullDate = moment(this.props.day);
		var dayName = fullDate.format("ddd");
		var monthName = fullDate.format("MMM");;
		var dateNum = fullDate.format("D");

		return (
			<Ons.CarouselItem key={this.props.day} style={{}}>
				<div>
					<div style={singleDayHeaderStyle}>
						<Ons.Row><Ons.Col style={monthNameStyle}>{monthName}</Ons.Col></Ons.Row>
						<Ons.Row><Ons.Col style={dateNumStyle}>{dateNum}</Ons.Col></Ons.Row>
						<Ons.Row><Ons.Col style={dayNameStyle}>{dayName}</Ons.Col></Ons.Row>
					</div>
					{this.props.commonContractors.map(function(contractor, i){
						return (
							<div style={checkColStyle}>
								<Ons.Input
						            inputId={`checkbox-${i}`}
						            type='checkbox'
						          />
							</div>
						);
					})}
				</div>
			</Ons.CarouselItem>
		)
	}
});

module.exports = SingleProjectScheduleRow;