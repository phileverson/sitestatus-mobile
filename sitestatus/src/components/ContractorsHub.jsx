var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var PagesConstants = require('constants/pages.jsx');
var GlobalConstants = require('constants/global.jsx');
var Utils = require('util/util.jsx');

var Contractor = require('../models/contractor.jsx');

var ContractorsListRow = require('./ContractorsListRow.jsx');
var NewContractor = require('./NewContractor.jsx');
var Loading = require('./Loading.jsx');

var ContractorsHub = React.createClass({
	getInitialState: function(){
	  return {
	  	authContractorAppState: PagesConstants.CONTRACTORS_LIST,
	  	activeContractorKey: '',
	  	contractors: GlobalConstants.LOADING,
	  	contractorsLoading: true
	  }
	},

	updateSingleContractor: function(contractorObj) {
		var me = this;
		console.log('contractorObj:');
		console.log(contractorObj);
		if (this.state.activeContractorKey) {
			// updating an already existing contractor:
			var activeContractorEntryEndPoint = "contractors/" + this.props.currentUser.uid + "/" + this.state.activeContractorKey;
			SiteStatusBase.update(activeContractorEntryEndPoint, {
				data: contractorObj,
				then: function(err) {
					if(!err){
						console.log('Contractor Updated');
						me.setState({
							authContractorAppState: PagesConstants.CONTRACTORS_LIST,
							activeContractorKey: ''
						})
					} else {
						console.log('Error Updating Contractor:');
						console.log(err);
					}
				}
			});
		} else { 
			// adding new contractor:
			var newContractorEntryEndPoint = "contractors/" + this.props.currentUser.uid + "/";
			SiteStatusBase.push(newContractorEntryEndPoint, {
				data: contractorObj,
				then: function(err) {
					if(!err){
						console.log('Contractor Added');
						me.setState({
							authContractorAppState: PagesConstants.CONTRACTORS_LIST,
							activeContractorKey: ''
						}, function(){
							me.props.deactivateGlobalModal();
						})
					} else {
						console.log('Error Adding New Contractor:');
						console.log(err);
					}
				}
			});
		}
	},

	navTo_AddContractor: function() {
		this.props.activateGlobalModal("Loading Contractor", false);
		this.setState({
			authContractorAppState: PagesConstants.ADD_CONTRACTOR,
			activeContractorKey: ''
		})
	},

	navTo_EditContractor: function(activeContractorKey) {
		this.props.activateGlobalModal("Loading Contractor", false);
		this.setState({
			authContractorAppState: PagesConstants.EDIT_CONTRACTOR,
			activeContractorKey: activeContractorKey
		})
	},

	navTo_ContractorsHub: function() {
		this.props.deactivateGlobalModal();
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

	pullHookGetContent: function() {
	    switch (this.state.state) {
	      case 'initial':
	        return 'Pull to Refresh';
	      case 'preaction':
	     mixpanel.track("Pulled to Refresh",
		{
		"App Location": "Contractors Hub"
		});		
	        return 'Release to Refresh';
	      case 'action':
	        return <Loading />;
	    }
	},
	
	pullHookHandleChange: function(e) {
    	this.setState({
    		state: e.state
    	});
    },

	renderListOfContractors: function() {
		var me = this;
		if (this.props.contractorsLoading || (!this.props.contractors)) {
			return (
		    	<Loading />
		    )
		} else if (this.props.contractors.length == 0) {
			return (
	        	<div>whoops looks like theres no contractors here.</div>
	        )
		} else {
			return (
				<Ons.List>
				<Ons.PullHook onChange={this.pullHookHandleChange} onLoad={this.props.fetchFirebaseContractors} >
					{this.pullHookGetContent()}
				</Ons.PullHook>
				{this.props.contractors.map(function(contractor, i){
					return <ContractorsListRow singleContractor={contractor} index={i} requestContractorEdit={me.navTo_EditContractor}/> ;
				})}
				</Ons.List>
			)
		}
	},

	render: function() {
		// console.log(this.state);
		var authContractorAppComponent = '';
    	if (this.state.authContractorAppState == PagesConstants.CONTRACTORS_LIST) {
    		authContractorAppComponent = this.renderListOfContractors(); 
    	} else if (this.state.authContractorAppState == PagesConstants.EDIT_CONTRACTOR) {
    		var activeContractorObject = Utils.findContractorByKey(this.state.activeContractorKey, this.props.contractors);
    		activeContractorObject = new Contractor(activeContractorObject);
    		authContractorAppComponent = <NewContractor 
    										activeContractorKey={this.state.activeContractorKey} 
    										singleContractor={activeContractorObject} 
    										cancelCreate={this.navTo_ContractorsHub} 
    										updateSingleContractor={this.updateSingleContractor}
    										currentUser={this.props.currentUser}
											activateGlobalModal={this.props.activateGlobalModal}
				                            deactivateGlobalModal={this.props.deactivateGlobalModal}
    										/>;
    	} else if (this.state.authContractorAppState == PagesConstants.ADD_CONTRACTOR) {
    		var blankContractor = new Contractor({});
    		authContractorAppComponent = <NewContractor 
    										activeContractorKey={this.state.activeContractorKey} 
    										singleContractor={blankContractor} 
    										cancelCreate={this.navTo_ContractorsHub} 
    										updateSingleContractor={this.updateSingleContractor}
    										currentUser={this.props.currentUser}
											activateGlobalModal={this.props.activateGlobalModal}
				                            deactivateGlobalModal={this.props.deactivateGlobalModal}
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