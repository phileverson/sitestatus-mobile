var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var Project = require('../models/project.jsx');

var GlobalConstants = require('constants/global.jsx');

var ContractorsListRow = require('./ContractorsListRow.jsx');

var NewProjectQuestionTimeSelect = React.createClass({

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Select Time</div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.cancelSelect}>
						Cancel
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	render: function() {
		var me = this;

		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<Ons.List>
		            {GlobalConstants.QUESTION_TIME_OPTIONS.map(function(time, t){
		            	var selectTimeOnClick = function(){
		            		me.props.selectTime(time.value);
		            	}
		            	var selectedIcon = (me.props.selectedTime == time.value) ? <Ons.Icon style={{marginLeft:'5px'}} icon='ion-checkmark' /> : "";
						return (
				            <Ons.ListItem modifier="chevron" key={t} onClick={selectTimeOnClick}>
								<span>{time.displayTime}</span>
								<span>{selectedIcon}</span>
				            </Ons.ListItem>
						);
					})}
		        </Ons.List>
	        </Ons.Page>
			)

	}
});

module.exports = NewProjectQuestionTimeSelect;