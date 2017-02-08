var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var Project = require('../models/project.jsx');

var ContractorsListRow = require('./ContractorsListRow.jsx');

var NewProject = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
		console.log(this.props);
		var creatingNewProject = (this.props.singleProjectKey) ? false : true;

		return {
			creatingNewProject: creatingNewProject,

			name: this.props.singleProject.name,
			address: this.props.singleProject.address,
			question: this.props.singleProject.question,
			questionTime: this.props.singleProject.questionTime,
			note: this.props.singleProject.note,
			status: this.props.singleProject.status,
			shortListedContractors: this.props.singleProject.shortListedContractors,

			errorMessages: this.props.singleProject.errorMessages
		}
	},

	componentWillMount: function() {
		var contractors = firebase.database().ref("contractors");
		this.bindAsArray(contractors, "contractors");
	},

	createNewOrUpdateProject: function(e) {
		e.preventDefault();
		var changingProject = this.createProjectObject();
		var changingProjectIsValid = changingProject.isValid();

		if (changingProjectIsValid.isValid) {
			changingProject = changingProject.preparePutObject();
			// allowing for this to be used outside single project
			this.props.createNewOrUpdateProject(changingProject);
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
		this.props.createNewOrUpdateProject(changingProject);
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

	handleContractorSwitch: function(contractor) {
		var alreadySelected = _.includes(this.state.shortListedContractors, contractor);

		if (alreadySelected) {
			var shortListedContractorsToUpdate = _.clone(this.state.shortListedContractors);
			var indexToRemove = shortListedContractorsToUpdate.indexOf(contractor);
			shortListedContractorsToUpdate.splice(indexToRemove, 1);
			this.setState({
				shortListedContractors: shortListedContractorsToUpdate
			})
		} else {
			var shortListedContractorsToUpdate = _.clone(this.state.shortListedContractors);
			shortListedContractorsToUpdate.push(contractor);
			this.setState({
				shortListedContractors: shortListedContractorsToUpdate
			})
		}
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
					<Ons.ToolbarButton onClick={this.props.cancelCreate}>
						Cancel
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	renderListOfContractors: function() {
		var me = this;
		return (
			<Ons.List>
			{this.state.contractors.map(function(contractor, i){
				var alreadySelected = _.includes(me.state.shortListedContractors, contractor['.key']);
				return <ContractorsListRow 
							singleContractor={contractor}
							index={i}
							key={i}
							newProject='true' 
							toggleSwitchChange={me.handleContractorSwitch}
							contractorChecked={alreadySelected}
							/> ;
			})}
			</Ons.List>
		)
	},

	render: function() {
		var listOfContractors = this.renderListOfContractors();
		console.log(this.state.errorMessages);
	    var errorMessageTextStyle = {
	      color: 'red',
	      fontSize: '8px',
	      background: 'white',
	      width: '100%',

	    }
	    var inputItemStyle = {
	      width: '100%'
	    }
	    var divListItemStyle ={
	      width: '100%'
	    }
	    var noteBoxInside ={
	      width: '98%',
	      height: '100%',
	      borderStyle: 'solid',
	      borderWidth: '1px',
	      borderColor: '#ccc',
	      fontSize: '15px',
    	  lineHeight: '1',
    	  fontFamily: '-apple-system, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif'
	    }
	    var noteBoxOutside ={
	      width: '100%',
	      height: '100px',
	      
	      
	    }

		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<section>
					<Ons.List>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.name && this.state.errorMessages.name.length > 0 &&
							<div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.name}</div>
							}
							<Ons.Input
							style={inputItemStyle}
							className="center"
							value={this.state.name}
							onChange={this.handleNameChange}
							modifier='underbar'
							placeholder='Project Name' />
							</div>		
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.address}
							onChange={this.handleAddressChange}
							modifier='underbar'
							placeholder='Address' />
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style= {divListItemStyle}>
							{this.state.errorMessages.question && this.state.errorMessages.question.length > 0 &&
							<span>{this.state.errorMessages.question}</span>
							}
							<Ons.Input
							style={inputItemStyle}
							className="center"
							value={this.state.question}
							onChange={this.handleQuestionChange}
							modifier='underbar'
							placeholder='Prompt Question. Eg: "What did you do today?"' />
							</div>
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<div style={divListItemStyle}>
							{this.state.errorMessages.questionTime && this.state.errorMessages.questionTime.length > 0 &&
							<div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.questionTime}</div>
							}
							<Ons.Input

							style={inputItemStyle}

							style={{width:'100%'}}

							value={this.state.questionTime}
							onChange={this.handleQuestionTimeChange}
							className="center" 
							modifier='underbar'
							placeholder="Time: "
							type="time"/>
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
							<div style={noteBoxOutside}>
								<textarea
								style= {noteBoxInside}
								className="center"
								value={this.state.note}
								onChange={this.handleNotesChange}
								placeholder='notes' ></textarea>
							</div>
						</Ons.ListItem>
						{!(this.state.creatingNewProject) &&
						<Ons.ListItem modifier="nodivider">
							<Ons.Button onClick={this.handleProjectDelete}>Delete Project</Ons.Button>
						</Ons.ListItem>
						}
					</Ons.List>
				</section>
				{false &&
				<section>
					<Ons.List>
						<Ons.ListHeader>
							"Short Listed Contractors"
						</Ons.ListHeader>
						{listOfContractors}
					</Ons.List>
				</section>
				}
			</Ons.Page>
		)
	}
});

module.exports = NewProject;