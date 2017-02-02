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
		var creatingNewProject = (this.props.singleProject['.key']) ? false : true;

		return {
			creatingNewProject: creatingNewProject,

			name: this.props.singleProject.name,
			address: this.props.singleProject.address,
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

	createNewProject: function(e) {
		e.preventDefault();
		var changingProject = this.createProjectObject();
		var changingProjectIsValid = changingProject.isValid();

		if (changingProjectIsValid.isValid) {
			changingProject = changingProject.preparePutObject();
			// allowing for this to be used outside single project
			if (creatingNewProject) {
				this.props.createNewProject(changingProject);
			} else {
				// actually updating project
			}
		} else {
			var mergedErrorMessages = _.merge(this.state.errorMessages, changingProjectIsValid.errorMessages);
			this.setState({
				errorMessages: changingProjectIsValid.errorMessages
			})
		}
	},

	createProjectObject: function() {
		var project = {
			name: this.state.name,
			address: this.state.address,
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
			status: e.target.value,
		});
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
	    return (
		    <Ons.Toolbar>
				<div className='center'>Create Project</div>
				<div className='right'>
					<Ons.ToolbarButton onClick={this.createNewProject}>
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

		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<section>
					<Ons.List>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.name}
							onChange={this.handleNameChange}
							modifier='underbar'
							placeholder='name' />
							{this.state.errorMessages.name && this.state.errorMessages.name.length > 0 &&
							<span>{this.state.errorMessages.name}</span>
							}
						</Ons.ListItem>
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.address}
							onChange={this.handleAddressChange}
							modifier='underbar'
							placeholder='address' />
						</Ons.ListItem>
						{!(this.state.creatingNewProject) &&
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.status}
							onChange={this.handleStatusChange}
							modifier='underbar'
							placeholder='status' />
						</Ons.ListItem>
						}
						<Ons.ListItem modifier="nodivider">
							<Ons.Input
							className="center"
							value={this.state.notes}
							onChange={this.handleNotesChange}
							modifier='underbar'
							placeholder='notes' />
						</Ons.ListItem>
					</Ons.List>
				</section>
				<section>
					<Ons.List>
						<Ons.ListHeader>
							"Short Listed Contractors"
						</Ons.ListHeader>
						{listOfContractors}
					</Ons.List>
				</section>
			</Ons.Page>
		)
	}
});

module.exports = NewProject;