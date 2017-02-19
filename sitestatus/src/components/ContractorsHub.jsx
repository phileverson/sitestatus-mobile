var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Contractor = require('../models/contractor.jsx');

var ContractorsListRow = require('./ContractorsListRow.jsx');
var NewContractor = require('./NewContractor.jsx');

var ContractorsHub = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  	authContractorAppState: PagesConstants.CONTRACTORS_LIST,
	  	activeContractorKey: ''
	  }
	},

	componentWillMount: function() {
		//var contractors = firebase.database().ref("contractors/" + this.props.currentUser.uid + "/");
		var contractors = firebase.database().ref("contractors/" + this.props.currentUser.uid + "/").orderByChild("deleted").equalTo(false);
		this.bindAsArray(contractors, "contractors");
	},

	updateSingleContractor: function(contractorObj) {
		console.log('contractorObj:');
		console.log(contractorObj);
		if (this.state.activeContractorKey) {
			// updating an already existing contractor:
			var activeContractorEntry = firebase.database().ref("contractors/" + this.props.currentUser.uid + "/" + this.state.activeContractorKey);
			activeContractorEntry.set(contractorObj);
			console.log('Contractor Updated');
		} else { 
			// adding new contractor:
			var contractors = firebase.database().ref("contractors/" + this.props.currentUser.uid + "/" + this.state.activeContractorKey);
			var newContractorEntry = contractors.push();
			newContractorEntry.set(contractorObj);
			console.log('New Contractor Saved');
		}
		this.setState({
			authContractorAppState: PagesConstants.CONTRACTORS_LIST,
			activeContractorKey: ''
		})
	},

	navTo_AddContractor: function() {
		this.setState({
			authContractorAppState: PagesConstants.ADD_CONTRACTOR,
			activeContractorKey: ''
		})
	},

	navTo_EditContractor: function(activeContractorKey) {
		this.setState({
			authContractorAppState: PagesConstants.EDIT_CONTRACTOR,
			activeContractorKey: activeContractorKey
		})
	},

	navTo_ContractorsHub: function() {
		this.setState({
			authContractorAppState: PagesConstants.CONTRACTORS_LIST
		})
	},

	renderToolbar: function() {
		if (this.state.authContractorAppState == PagesConstants.CONTRACTORS_LIST) {
		    return (
			    <Ons.Toolbar>
					<div className='center'>Contractors</div>
					<div className='right'>
						<Ons.ToolbarButton onClick={this.navTo_AddContractor}>
							New
						</Ons.ToolbarButton>
					</div>
					<div className='left'>
						<Ons.ToolbarButton onClick={this.props.showLeftMenu}>
							<Ons.Icon icon='ion-navicon, material:md-menu' />
						</Ons.ToolbarButton>
	          		</div>
			    </Ons.Toolbar>
		  	)
		}
	},

	renderListOfContractors: function() {
		var me = this;
		if (this.state.contractors.length==0){
			return "whoops looks like theres no contractors here."
		}
		else{
			return (
			<Ons.List>
			{this.state.contractors.map(function(contractor, i){
				return <ContractorsListRow singleContractor={contractor} index={i} requestContractorEdit={me.navTo_EditContractor}/> ;
			})}
			</Ons.List>
			)
		}
		
	},

	render: function() {
		console.log(this.state);
		var authContractorAppComponent = '';
    	if (this.state.authContractorAppState == PagesConstants.CONTRACTORS_LIST) {
    		authContractorAppComponent = this.renderListOfContractors(); 
    	} else if (this.state.authContractorAppState == PagesConstants.EDIT_CONTRACTOR) {
    		var activeContractorObject = Utils.findContractorByKey(this.state.activeContractorKey, this.state.contractors);
    		activeContractorObject = new Contractor(activeContractorObject);
    		authContractorAppComponent = <NewContractor 
    										activeContractorKey={this.state.activeContractorKey} 
    										singleContractor={activeContractorObject} 
    										cancelCreate={this.navTo_ContractorsHub} 
    										updateSingleContractor={this.updateSingleContractor}
    										currentUser={this.props.currentUser}
    										/>;
    	} else if (this.state.authContractorAppState == PagesConstants.ADD_CONTRACTOR) {
    		var blankContractor = new Contractor({});
    		authContractorAppComponent = <NewContractor 
    										activeContractorKey={this.state.activeContractorKey} 
    										singleContractor={blankContractor} 
    										cancelCreate={this.navTo_ContractorsHub} 
    										updateSingleContractor={this.updateSingleContractor}
    										currentUser={this.props.currentUser}
    										/>;
    	}
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			{authContractorAppComponent}
			</Ons.Page>
		)
	}
});

module.exports = ContractorsHub;