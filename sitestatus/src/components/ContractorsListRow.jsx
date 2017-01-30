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
		var contractorLineStyle = {
	      fontSize: '8px',
	    }
		return (
			<Ons.ListItem modifier='chevron' key={this.props.index} onClick={this.setActiveContractorInHub}>
				<div className="center">
					<span className="list__item__title">
						{this.props.singleContractor.firstName + ' ' + this.props.singleContractor.lastName}
					</span>
					<span className="list__item__subtitle">
						{this.props.singleContractor.trade+ ' | ' +this.props.singleContractor.company}
					</span>
				</div>
			</Ons.ListItem>
		)
	}
});

module.exports = ContractorsListRow;