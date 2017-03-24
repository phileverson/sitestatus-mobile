var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Textarea = require('react-textarea-autosize').default;

var Project = require('../models/project.jsx');

var GlobalConstants = require('constants/global.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var ContractorsListRow = require('./ContractorsListRow.jsx');
var NewProjectQuestionTimeSelect = require('./NewProjectQuestionTimeSelect.jsx');

var NewProject = React.createClass({

	getInitialState: function(){
		var creatingNewProject = (this.props.singleProjectKey) ? false : true;

		return {
			questionTimeSelectActive: false,
			creatingNewProject: creatingNewProject,

			name: this.props.singleProject.name,
			address: this.props.singleProject.address,
			question: this.props.singleProject.question,
			questionTime: this.props.singleProject.questionTime,
			note: this.props.singleProject.note,
			status: this.props.singleProject.status,
			shortListedContractors: this.props.singleProject.shortListedContractors,

			errorMessages: {}
		}
	},

	createNewOrUpdateProject: function(e) {
		//this.props.activateGlobalModal("Saving Project", false);
		
		e.preventDefault();
		var changingProject = this.createProjectObject();
		var changingProjectIsValid = changingProject.isValid();

		if (changingProjectIsValid.isValid) {
			changingProject = changingProject.preparePutObject();
			this.props.createNewOrUpdateProject(changingProject, this.props.passedNavigator);
			this.props.activateGlobalModal("Saving Project", false);
		} else {
			var mergedErrorMessages = _.merge(this.state.errorMessages, changingProjectIsValid.errorMessages);
			this.setState({
				errorMessages: changingProjectIsValid.errorMessages
			})
		}
	},

	handleProjectDelete: function() {
		var changingProject = this.createProjectObject();
		changingProject.deleted = true;
		this.props.createNewOrUpdateProject(changingProject, this.props.passedNavigator);
	},

	createProjectObject: function() {
		var project = {
			name: this.state.name,
			address: this.state.address,
			question: this.state.question,
			questionTime: this.state.questionTime,
			note: this.state.note,
			status: this.state.status,
			shortListedContractors: this.state.shortListedContractors,
			owner: this.props.currentUser.uid,

			errorMessages: this.state.errorMessages
		}
		return new Project(project);
	},

	handleNameChange: function(e){
		var me = this;
		var tempProjectObject = new Project({
			name: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempProjectObject.isValidName());
		me.setState({
			name: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleQuestionChange: function(e){
		var me = this;
		var tempProjectObject = new Project({
			question: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempProjectObject.isValidQuestion());
		me.setState({
			question: e.target.value,
			errorMessages: errorMessages
		});
	},

	handleQuestionTimeChange: function(e){
		var me = this;
		var tempProjectObject = new Project({
			questionTime: e.target.value
		});
		var errorMessages = _.merge(me.state.errorMessages, tempProjectObject.isValidQuestionTime());
		me.setState({
			questionTime: e.target.value,
			errorMessages: errorMessages
		});
		console.log(this.state);
	},

	handleAddressChange: function(e){
		var me = this;
		me.setState({
			address: e.target.value,
		});
	},

	handleNotesChange: function(e){
		var me = this;
		me.setState({
			note: e.target.value,
		});
	},

	handleStatusChange: function(e){
		var me = this;
		me.setState({
			status: e.target.status
		});
		this.setState({checked: e.target.checked});
	},

	cancelCreateManual: function() {
		this.props.generalPop(this.props.passedNavigator);
	},

	openTimeSelect: function() {
		this.setState({
			questionTimeSelectActive: true,
		})
	},

	cancelTimeSelect: function() {
		this.setState({
			questionTimeSelectActive: false,
		})
	},

	setTimeFromTimeSelect: function(selectedTime) {
		var me = this;
		var tempProjectObject = new Project({
			questionTime: selectedTime
		});
		var errorMessages = _.merge(me.state.errorMessages, tempProjectObject.isValidQuestionTime());
		me.setState({
			questionTime: selectedTime,
			questionTimeSelectActive: false,
			errorMessages: errorMessages
		});
		console.log(this.state);
	},

	renderToolbar: function() {
		var projectDetailsHeader = (this.state.creatingNewProject) ? 'Create Project' : 'Project Settings'
	    return (
		    <Ons.Toolbar>
				<div className='center'>{projectDetailsHeader}</div>
				<div className='right'>
					<Ons.ToolbarButton onClick={this.createNewOrUpdateProject}>
						Save
					</Ons.ToolbarButton>
				</div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.cancelCreateManual}>
						Cancel
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	render: function() {
		// var listOfContractors = this.renderListOfContractors();
		// console.log(this.props);
		console.log(this.state.errorMessages);
	    var errorMessageTextStyle = {
	      color: 'red',
	      fontSize: '8px',
	      background: 'white',
	      width: '100%',
	    }
	    var inputItemStyle = {
	      width: '100%',
	      color: 'grey'

	    }
	    var divListItemStyle ={
	      width: '100%',
	      display: 'flex',
	      flexWrap: 'wrap'
	    }
	    var noteBoxInside ={
	      width: '100%',
	      resize: 'none',
	      padding: '0px',
	      height: '100%',
	      fontSize: '15px',
    	  lineHeight: '1',
    	  fontFamily: '-apple-system, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    	  border: '1px solid #FFF',
    	  appearance: 'none',
    	  '-webkit-appearance': 'none'
	    }
	    var noteBoxOutside ={
	      width: '100%',
	      borderBottom: '1px solid rgb(204, 204, 204)'
	    }
	    var inputLabelStyle = {
	    	fontSize: '14px',
	    	width: '100%'
	    }
	    var fieldHeaderStyle={
	    	fontSize: '12px',
	    	color: Styles.onsenBlue
	    }
	    if (this.state.questionTimeSelectActive) {
	    	return (
	    		<NewProjectQuestionTimeSelect
	    			cancelSelect={this.cancelTimeSelect}
	    			selectedTime={this.state.questionTime}
	    			selectTime={this.setTimeFromTimeSelect}
	    			/>
	    		)
	    } else {
	    	var prettyPrintQuestionTime = this.state.questionTime;
	    	prettyPrintQuestionTime = Utils.lookupDisplayTime(this.state.questionTime, GlobalConstants.QUESTION_TIME_OPTIONS);

	    	return (
				<Ons.Page renderToolbar={this.renderToolbar}>
					<section>
						<Ons.List>
							<Ons.ListItem modifier="nodivider">
								<div style={divListItemStyle}>
									{this.state.errorMessages.name && this.state.errorMessages.name.length > 0 &&
									<div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.name}</div>
									}
									<div className='list__item__title' style={fieldHeaderStyle}>
										Name
									</div>
									<Ons.Input
									style={inputItemStyle}
									className="center"
									value={this.state.name}
									onChange={this.handleNameChange}
									modifier='underbar'
									placeholder='Project Name' 
									/>
								</div>		
							</Ons.ListItem>
							<Ons.ListItem modifier="nodivider">
								<div className='list__item__title' style={fieldHeaderStyle}>
									Address
								</div>
								<Ons.Input
								style={inputItemStyle}
								value={this.state.address}
								onChange={this.handleAddressChange}
								modifier='underbar'
								placeholder='123 Fourth Street, Toronto, Ontario' 
								/>
							</Ons.ListItem>
							<Ons.ListItem modifier="nodivider" >
								<div style= {divListItemStyle}>
								{this.state.errorMessages.question && this.state.errorMessages.question.length > 0 &&
								<span style={errorMessageTextStyle}>{this.state.errorMessages.question}</span>
								}
								<div className='list__item__title' style={fieldHeaderStyle}>
									Question
								</div>
								<Ons.Input
								style={inputItemStyle}
								className="center"
								value={this.state.question}
								onChange={this.handleQuestionChange}
								modifier='underbar'
								placeholder='Prompt Question. Eg: "What did you do today?"' 
								/>
								</div>
							</Ons.ListItem>
							<Ons.ListItem onClick={this.openTimeSelect}>
								<div className='list__item__title' style={fieldHeaderStyle}>
									Ping Time
								</div>
								<div style={divListItemStyle}>
									{this.state.errorMessages.questionTime && this.state.errorMessages.questionTime.length > 0 &&
									<div style={errorMessageTextStyle}>{this.state.errorMessages.questionTime}</div>
									}
									<div style={{borderBottom: '1px solid rgb(204, 204, 204)', width: '100%'}}>{prettyPrintQuestionTime} <Ons.Icon style={{float:'right', fontSize: '28px', color: Styles.onsenGrey, width: '10px', position: 'relative', top: '-10px'}} icon='fa-angle-right' /></div>
								</div>
							</Ons.ListItem>
							{false &&
							<Ons.ListItem modifier="nodivider">
							<div className='left'>Project Status:</div>
							<div className='center'>{this.state.checked ? '  Active' : '  Inactive'}</div>
								 <Ons.Switch classname='center' value={this.state.status} onChange={this.handleStatusChange}/>
							</Ons.ListItem>
							}
							<Ons.ListItem modifier="nodivider">
								<div className='list__item__title' style={fieldHeaderStyle}>
									Notes
								</div>
								<div style={noteBoxOutside}>
									<Textarea
									style= {noteBoxInside}
									className="center"
									value={this.state.note}
									onChange={this.handleNotesChange}
									placeholder='Last corner lot in Beaverglen.' ></Textarea>
								</div>
							</Ons.ListItem>
						</Ons.List>
						<p></p>
							{!(this.state.creatingNewProject) &&
							<Ons.List>
								<Ons.ListItem modifier='longdivider' style={{color:'red'}} tappable="true" tapbackgroundcolor="red" onClick={this.handleProjectDelete}>
									Delete Project
								</Ons.ListItem>
							</Ons.List>
							}
					</section>
				</Ons.Page>
			)
	    }
	}
});

module.exports = NewProject;