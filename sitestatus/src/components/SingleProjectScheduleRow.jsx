var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var SingleProjectScheduleCell = require('./SingleProjectScheduleCell.jsx');

var SingleProjectScheduleRow = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  	scheduledContractors: []
	  }
	},

	componentWillMount: function() {
		var fullDate = moment(this.props.day);
		var dateKey = fullDate.format("MM-DD-YYYY");
		var projectKey = this.props.singleProject['key']

		var projectsScheduleDayRef = firebase.database().ref("projects-schedule/" + projectKey + "/" + dateKey + "/contractors/");
		this.bindAsArray(projectsScheduleDayRef, "scheduledContractors");
	},

	toggleContractorSchedule: function(contractorKey) {
		var fullDate = moment(this.props.day);
		var dateKey = fullDate.format("MM-DD-YYYY");
		var projectKey = this.props.singleProject['key']

		var contractorKeyScheduledContractorsIndex = Utils.daysScheduleContractorIndex(contractorKey, this.state.scheduledContractors);
		// console.log(contractorKeyScheduledContractorsIndex);

		if(contractorKeyScheduledContractorsIndex >= 0) {
			console.log('Contractor is already assigned to this date, now removing.');
			var firebaseKey = this.state.scheduledContractors[contractorKeyScheduledContractorsIndex]['.key'];
			// console.log(firebaseKey);
			var singleContractorScheduleEntryRef = firebase.database().ref("projects-schedule/" + projectKey + "/" + dateKey + "/contractors/" + firebaseKey);
			singleContractorScheduleEntryRef.remove();
		} else {
			console.log('Contractor is now being assigned to this date.');
			var projectsScheduleDayRef = firebase.database().ref("projects-schedule/" + projectKey + "/" + dateKey + "/contractors/");
			projectsScheduleDayRef.push(contractorKey);
		}
	},

	render: function() {
		var me = this;
		var fullDate = moment(this.props.day);
		var dayName = fullDate.format("ddd");
		var monthName = fullDate.format("MMM");;
		var dateNum = fullDate.format("D");
		var dateKey = fullDate.format("MM-DD-YYYY");
		var scheduledContractorsAsArray = Utils.prettyfirebaseArray(this.state.scheduledContractors);

		var singleDayHeaderStyle = {
			padding: '0px',
			fontSize: '12px',
			height: '40px',
			display: 'block',
			backgroundColor: Styles.onsenBlue
		}
		var singleDayCellStyle = {
			paddingRight: '0px',
			fontSize: '12px',
			display: 'block'
		}
		var dayNameStyle = {
			fontSize: '10px',
			color: 'white',
			textAlign: 'center',
			display:'block'
		}
		var monthNameStyle = {
			fontSize: '10px',
			textAlign: 'center',
			display:'block',
			color: 'white'
		}
		var dateNumStyle = {
			textAlign: 'center',
			display:'block',
			color: 'white'
		}

		if (!this.props.singleProject) {
			return (
				<div>Loading</div>
			)
		}

		return (
			<Ons.CarouselItem key={this.props.day} style={{}}>
				<div>
					<div style={singleDayHeaderStyle}>
						<Ons.Row><Ons.Col style={monthNameStyle}>{monthName}</Ons.Col></Ons.Row>
						<Ons.Row><Ons.Col style={dateNumStyle}>{dateNum}</Ons.Col></Ons.Row>
						<Ons.Row><Ons.Col style={dayNameStyle}>{dayName}</Ons.Col></Ons.Row>
					</div>
					{this.props.shortListedContractorsDetails.map(function(contractor, i){
						if (!contractor) {
							return (
								<div>Loading...</div>
							);
						}
						var activeCheck = scheduledContractorsAsArray.includes(contractor['key']);
						return (
							<SingleProjectScheduleCell projectKey={me.props.singleProject['key']} contractorKey={contractor['key']} dateKey={dateKey} onTap={me.toggleContractorSchedule} active={activeCheck} />
						);
					})}
				</div>
			</Ons.CarouselItem>
		)
	}
});

module.exports = SingleProjectScheduleRow;