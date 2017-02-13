var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var SingleProjectScheduleRow = require('./SingleProjectScheduleRow.jsx');
var SingleProjectScheduleContractorLabelCell = require('./SingleProjectScheduleContractorLabelCell.jsx');

var SingleProjectScheduleGantt = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		var daysToRender = Utils.back7Forward14Days();
		return {
			carouselDays: daysToRender,
			carouselDayIndex: 0,
			addContractorsActive: false
		};
	},

	componentDidMount: function() {
		var me = this;
	// 	// if (this.refs.scheduleCarousel) {
	// 	// 	var itemCount = this.refs.scheduleCarousel.itemCount;
	// 	// 	console.log(itemCount);
	// 	// 	if (itemCount == 60) {
	// 	// 		this.refs.scheduleCarousel.setActiveIndex(30);
	// 	// 	}
	// 	// }
	// 	// // console.log(this.refs);
	// 	// console.log(this.refs.scheduleCarousel);
	// 	// console.log(this.refs.scheduleCarousel.refs.Carousel);
	// 	// this.refs.scheduleCarousel.next();
	// 	// this.refs.scheduleCarousel.setActiveIndex(30);
		// this.setState({
		// 	carouselDayIndex: 30
		// })
		// this.setIndex(10);

		// Really, really, really shitty work around for pushing it to the current date.
		setTimeout(function() {
		  console.log('Pushing carousel to today.')
		  me.setIndex(7)
		}, 2000);
	},

	handleChange: function(e) {
    	this.setState({carouselDayIndex: e.activeIndex});
	},

	setIndex: function(index) {
  		// console.log('requesting index: ' + index);
    	this.setState({carouselDayIndex: index});
	},

	toggleAddContractorsDialog: function() {
		var newDialogState = !(this.state.addContractorsActive);
		this.setState({
			addContractorsActive: newDialogState
		})
	},

//   Navigator covers this... don't need to render our own toolbar now! :)
	// renderToolbar: function() {
	//     return (
	// 	    <Ons.Toolbar>
	// 			<div className='center'>Project Schedule</div>
	// 			<div className='right'>
	// 				<Ons.ToolbarButton >
	// 					<Ons.Icon icon='md-settings' onClick={this.props.navToProjectSettings} />
	// 				</Ons.ToolbarButton>
	// 			</div>
	// 			<div className='left'>
	// 				<Ons.ToolbarButton >
	// 					<Ons.Icon icon='md-home' onClick={this.props.navToHub} />
	// 				</Ons.ToolbarButton>
 //          		</div>
	// 	    </Ons.Toolbar>
	//   	)
	// },

	renderListOfContractors: function() {
		var me = this;

		return (
			<div>
				<div style={{height: '40px', background: 'rgba(24,103,194,0.81)'}}></div>
				{this.props.shortListedContractorsDetails.map(function(contractor, i){
					return (
						<SingleProjectScheduleContractorLabelCell key={i} contractor={contractor}/>
					);
				})}
			</div>
		)
	},

	render: function() {
		var me = this;
		var carouselStyle ={
      		height: '100%',
      		left:'30%',
      		width:'70%'
    	}
    	var addContractorCTA = {
			fontSize: '11px',
			padding: '5px',
			paddingLeft: '10px',
			paddingRight: '10px',
			textAlign: 'left',
			borderTopRightRadius: '0px',
			borderTopLeftRadius: '0px',
			display: 'flex',
			alignItems: 'center',
			border: 'none',
			position: 'relative',
    		top: '-1px'
    	}
    	var noContractorsBanner = {
			backgroundColor: 'rgb(249, 249, 249)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: '14px',
			padding: '10px',
			flexDirection: 'column',
			textAlign: 'center'
		}

    	var contractorList = this.renderListOfContractors();
    	var showAddFirstContractorTip = false;
    	showAddFirstContractorTip = (this.props.shortListedContractorsDetails.length > 0) ? false : true;

    	// console.log(this.state.carouselDayIndex);

		return (
			<Ons.Page>
				<Ons.Row>
					<Ons.Col width="30%">
						{contractorList}
					</Ons.Col>
					<Ons.Col width="70%">
						<Ons.Carousel ref='scheduleCarousel' style={carouselStyle} onPostChange={this.handleChange} index={this.state.carouselDayIndex} itemWidth="65px" fullscreen swipeable autoScroll overscrollable>
						{this.state.carouselDays.map(function(day, index){
							return (
								<SingleProjectScheduleRow key={index} shortListedContractorsDetails={me.props.shortListedContractorsDetails} day={day} singleProject={me.props.singleProject}/>
							);
						})}
						</Ons.Carousel>
					</Ons.Col>
				</Ons.Row>
				{showAddFirstContractorTip &&
					<Ons.Row>
						<Ons.Col width="100%">
							<div style={noContractorsBanner}>
								<div style={{marginTop:'10px', marginBottom: '20px'}}>No contractors added to project.</div>
								<Ons.Icon style={{color: 'black', opacity: '0.5', fontSize:'40px'}} icon="fa-exclamation-triangle" />
								<div style={{marginTop:'20px', marginBottom: '10px'}}>Please add contractors so SiteStatus can request updates from those who are onsite.</div>
								<div style={{marginTop:'10px', marginBottom: '10px'}}>
									<Ons.Button onClick={this.props.navToManageContractors}>
										Add Contractors
									</Ons.Button>
								</div>
							</div>
						</Ons.Col>
					</Ons.Row>
				}
				{!showAddFirstContractorTip &&
				<Ons.Row>
					<Ons.Col width="100%">
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<Ons.Button style={addContractorCTA} onClick={this.props.navToManageContractors}>
								<Ons.Icon style={{color: 'white', opacity: '0.5', fontSize:'16px', lineHeight: '20px'}} icon="fa-users" />
								<div style={{lineHeight: '16px', marginLeft: '7px'}} >Edit Contractors</div>
							</Ons.Button>
						</div>
					</Ons.Col>
				</Ons.Row>
				}
			</Ons.Page>
		)
	}
});

module.exports = SingleProjectScheduleGantt;