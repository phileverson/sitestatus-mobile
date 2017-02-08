var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var ProjectsListRow = require('./ProjectsListRow.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectScheduleRow = require('./SingleProjectScheduleRow.jsx');

var SingleProjectSchedule = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			items: [
				'02/07/2017',
				'02/08/2017',
				'02/09/2017',
				'02/10/2017',
				'02/11/2017',
				'02/12/2017',
				'02/13/2017',
				'02/14/2017',
				'02/15/2017',
				'02/16/2017',
				'02/17/2017',
			],
			index: 0
		};
	},

	componentWillMount: function() {
		// var projects = firebase.database().ref("projects");
		// this.bindAsArray(projects, "projects");
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Project Schedule</div>
				<div className='right'>
					<Ons.ToolbarButton >
						<Ons.Icon icon='md-settings' onClick={this.props.navToProjectSettings} />
					</Ons.ToolbarButton>
				</div>
				<div className='left'>
					<Ons.ToolbarButton >
						<Ons.Icon icon='md-home' onClick={this.props.navToHub} />
					</Ons.ToolbarButton>
          		</div>
		    </Ons.Toolbar>
	  	)
	},

	// renderContractors: function() {
	// 	return (
	// 		)
	// },

	renderListOfContractors: function() {
		var me = this;
		var borderColor = "#CCCCCC";
		var singleDayHeaderStyle = {
			paddingLeft: '5px',
			fontSize: '12px',
			display: 'block',
			height: '66px'
		}
		var contractorCellStyle = {
			paddingLeft: '0px',
			fontSize: '12px'
		}
		var contractorColStyle = {
			borderBottomColor: borderColor,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderRightColor: borderColor,
			borderRightWidth: '1px',
			borderRightStyle: 'solid',
			paddingLeft: '5px',
			paddingRight: '5px',
			fontSize: '12px',
			overflow: 'hidden',
			height: '50px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center'
		}
		var contractorTradeStyle = {
			fontSize: '10px',
			fontStyle: 'italic'
		}
		return (
			<div>
				<div style={{height: '40px', background: borderColor}}>
				</div>
				{this.props.commonContractors.map(function(contractor, i){
					return (
						<Ons.Row><Ons.Col style={contractorColStyle}>
							<div>{contractor.firstName + " " + contractor.lastName}</div>
							<div style={contractorTradeStyle}>{contractor.trade}</div>
						</Ons.Col></Ons.Row>
					);
				})}
				<div style={{height: '40px'}}>
					<Ons.Button style={{fontSize:'10px', height:'25px', marginLeft: '5px', marginTop:'10px', lineHeight:'16px'}}>
						Add Contractor
					</Ons.Button>
				</div>
			</div>
		)
	},

	render: function() {
		var me = this;
		var carouselStyle ={
      		height: '100%',
      		left:'25%',
      		width:'75%'
    	}
    	var contractorList = this.renderListOfContractors();
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<Ons.Row>
					<Ons.Col width="25%">
						{contractorList}
					</Ons.Col>
					<Ons.Col width="75%">
						<Ons.Carousel style={carouselStyle} onPostChange={this.handleChange} index={this.state.index} itemWidth="20%" fullscreen swipeable autoScroll overscrollable>
						{this.state.items.map(function(item, index){
							var day = ''; //.renderSingleDayCol(item);
							return (
								<SingleProjectScheduleRow commonContractors={me.props.commonContractors} day={item}/>
								);
						})}
						</Ons.Carousel>
					</Ons.Col>
				</Ons.Row>
			</Ons.Page>
		)
	}
});

module.exports = SingleProjectSchedule;