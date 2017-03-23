var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var SingleProjectScheduleCell = require('./SingleProjectScheduleCell.jsx');

var SingleProjectScheduleRow = React.createClass({

	getInitialState: function(){
	  return {
	  	scheduledContractors: []
	  }
	},

	componentDidMount: function() {
		var fullDate = moment(this.props.day);
		var dateKey = fullDate.format("MM-DD-YYYY");
		var projectKey = this.props.singleProject['key']

		var dayProjectScheduleEndPoint = "projects-schedule/" + projectKey + "/" + dateKey + "/contractors/"
		SiteStatusBase.bindToState(dayProjectScheduleEndPoint, {
			context: this,
			state: 'scheduledContractors',
			asArray: false,
			then: function(){
				console.log("Updated state (through bindToState) for scheduledContractors.");
			}
		});
	},

	toggleContractorSchedule: function(contractorKey) {
		var fullDate = moment(this.props.day);
		var dateKey = fullDate.format("MM-DD-YYYY");
		var projectKey = this.props.singleProject['key']

		var scheduledContractorsAsArray = Utils.prettyfirebaseArray(this.state.scheduledContractors);
		//console.log(scheduledContractorsAsArray);
		var today=moment(new Date()).format("MM-DD-YYYY");
		var contractorKeyScheduledContractorsIndex = Utils.daysScheduleContractorIndex(contractorKey, scheduledContractorsAsArray);
		console.log(contractorKeyScheduledContractorsIndex);
		console.log(dateKey + " " +moment(today).format("MM-DD-YYYY"));
		if (today<=dateKey){
		//date selected is in the future or today. user can edit.
			console.log(false);
			if(contractorKeyScheduledContractorsIndex >= 0) {
				console.log('Contractor is already assigned to this date, now removing.');
				var firebaseKey = Utils.daysScheduleContractorIndex(contractorKey, this.state.scheduledContractors);
				console.log(firebaseKey);
				var singleContractorScheduleEntryEndPoint = "projects-schedule/" + projectKey + "/" + dateKey + "/contractors/" + firebaseKey;
				SiteStatusBase.remove(singleContractorScheduleEntryEndPoint, function(err){
					if(!err){
						console.log('Contractor removed.');
					} else {
						console.log('Error removing contractor for: ' + dateKey);
						console.log(err);
					}

					mixpanel.track("Toggle Off Contractor on Schedule",
					{
					});

				});
			} else {
				console.log('Contractor is now being assigned to this date.');
				var contractorsDayScheduleEntryEndPoint = "projects-schedule/" + projectKey + "/" + dateKey + "/contractors/";
				SiteStatusBase.push(contractorsDayScheduleEntryEndPoint, {
					data: contractorKey,
					then: function(err) {
						if(!err){
							console.log('Contractor added.')
						} else {
							console.log('Error adding contractor for: ' + dateKey);
							console.log(err);
						}

					mixpanel.track("Toggle On Contractor on Schedule",
					{
					});

					}
				});
			}
		}
		else{
		//date selected is in the past. user should not be able to edit.
			console.log(true);
			{ons.notification.alert("Contractor schedules cannot be changed for past dates.")}
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
				<div>No Contractor</div>
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
								<div></div>
							);
						}
						var activeCheck = scheduledContractorsAsArray.includes(contractor['key']);
						return (
							<SingleProjectScheduleCell key={i} projectKey={me.props.singleProject['key']} contractorKey={contractor['key']} dateKey={dateKey} onTap={me.toggleContractorSchedule} active={activeCheck} />
						);
					})}
				</div>
			</Ons.CarouselItem>
		)
	}
});

module.exports = SingleProjectScheduleRow;