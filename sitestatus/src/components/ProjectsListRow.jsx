var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var ProjectsListRow = React.createClass({
	mixins: [ReactFireMixin],

	setActiveProjectInHub: function() {
		this.props.launchProject(this.props.singleProject['.key'])
	},

	render: function() {
		return (
			<Ons.ListItem modifier='chevron' key={this.props.index} onClick={this.setActiveProjectInHub}>
				<div className="center">
					<span className="list__item__title">
						{this.props.singleProject.name}
					</span>
				</div>
			</Ons.ListItem>
		)
	}
});

module.exports = ProjectsListRow;