var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var ContractorsListRow = React.createClass({
	mixins: [ReactFireMixin],

	setActiveContractorInHub: function() {
		this.props.requestContractorEdit(this.props.singleContractor['.key'])
	},

	render: function() {
		console.log(this.props);
		return (
			<Ons.ListItem key={this.props.index} onClick={this.setActiveContractorInHub}>
				<div className="center">
					{this.props.singleContractor.firstName + ' ' + this.props.singleContractor.lastName}
				</div>
				<div className="right">
					>
				</div>
			</Ons.ListItem>
		)
	}
});

module.exports = ContractorsListRow;