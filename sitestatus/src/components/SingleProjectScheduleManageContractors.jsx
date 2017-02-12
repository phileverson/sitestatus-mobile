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
	mixins: [ReactFireMixin],

	handleContractorSwitch: function(contractorKey) {
		var alreadySelected = _.includes(this.props.singleProject.shortListedContractors, contractorKey);

		if (alreadySelected) {
			this.props.removeContractorFromShortlist(contractorKey);
		} else {
			this.props.addContractorToShortlist(contractorKey);
		}
	},

	render: function() {
		var me = this;
		return (
			<section>
				<Ons.ListHeader>Select Project Contrators</Ons.ListHeader>
				<Ons.List>
				{this.props.allContractors.map(function(contractor, i){
					var alreadySelected = _.includes(me.props.singleProject.shortListedContractors, contractor['.key']);
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
			</section>
		)
	}
});

module.exports = SingleProjectScheduleManageContractors;