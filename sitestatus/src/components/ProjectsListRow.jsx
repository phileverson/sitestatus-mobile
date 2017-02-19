import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var ProjectsListRow = React.createClass({
	mixins: [ReactFireMixin],

	setActiveProjectInHub: function() {
		this.props.launchProject(this.props.singleProject)
	},

	render: function() {
		return (
			<Ons.ListItem modifier='chevron' key={this.props.index} onClick={this.setActiveProjectInHub}>
				<div className="center">
					<span className="list__item__title">
						{this.props.singleProject.name}
					</span>
					<span className="list__item__subtitle">
						{this.props.singleProject.address}
					</span>
				</div>

			</Ons.ListItem>
		)
	}
});

				// Phil's tired of this stupid error in the console.
				// <div className="right">
				// 	<NotificationBadge count='1' effect={Effect.ROTATE_X}/>
				// </div>

module.exports = ProjectsListRow;