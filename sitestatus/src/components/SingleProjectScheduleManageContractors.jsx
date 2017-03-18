var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var moment = require('moment');

var PagesConstants = require('constants/pages.jsx');
var Styles = require('constants/styles.jsx');
var Utils = require('util/util.jsx');

var ContractorsListRow = require('./ContractorsListRow.jsx');

var SingleProjectScheduleManageContractors = React.createClass({
	
	handleContractorSwitch: function(contractorKey) {
		var alreadySelected = _.includes(this.props.shortListedContractors_Editable, contractorKey);

		if (alreadySelected) {
			this.props.removeContractorFromShortlist(contractorKey);
		} else if (!alreadySelected) {
			this.props.addContractorToShortlist(contractorKey);
		}
	},

	addContractor: function() {
		this.props.activateGlobalModal("Loading Add a Contractor", true);
		this.props.navToAddContractor();
	},

	render: function() {
		var me = this;
		var orderedContractors =this.props.contractors;
		orderedContractors = orderedContractors.sort(function(a, b){
		    if(a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
		    if(a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
		    return 0;
		});
		return (
			<section>
				<Ons.ListHeader>Select Project Contrators</Ons.ListHeader>
				<Ons.List>
				{orderedContractors.map(function(contractor, i){
					var alreadySelected = _.includes(me.props.shortListedContractors_Editable, contractor['key']);
					return <ContractorsListRow 
							singleContractor={contractor}
							index={i}
							key={i}
							schedule={true}
							toggleSwitchChange={me.handleContractorSwitch}
							contractorChecked={alreadySelected}
							/> ;
				})}
				</Ons.List>
				<Ons.List style={{marginTop:'10px'}}>
					<Ons.ListItem modifier="chevron" onClick={this.addContractor}>
					<div className="center">
						<span className="list__item__title">
							Create New Contractor
						</span>
					</div>
					</Ons.ListItem>
				</Ons.List>
			</section>
		)
	}
});

module.exports = SingleProjectScheduleManageContractors;