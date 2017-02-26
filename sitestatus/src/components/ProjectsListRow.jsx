import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');
var moment = require('moment');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

var ProjectsListRow = React.createClass({

	getInitialState: function(){
	  return {
	  	latestUpdates: []
	  }
	},

	componentWillMount: function() {
		var statusUpdateEndPoint = "projects-status-updates/" + this.props.singleProject['key'] + "/";
		SiteStatusBase.fetch(statusUpdateEndPoint, {
			context: this,
			asArray: true,
			queries: {
			},
			then: function(data){
				this.setState({
					latestUpdates: data
				});
			}
		});
	},

	setActiveProjectInHub: function() {
		this.props.launchProject(this.props.singleProject, this.props.passedNavigator)
	},

	render: function() {
		// var updates = this.props.singleProjectStatusUpdate.updates

		var numNew = 0;
		if (this.state.latestUpdates && this.props.singleProject.lastViewed) {
			for (var i = 0; i < this.state.latestUpdates.length; i++) {
				if (moment(this.state.latestUpdates[i].timestamp).isAfter(this.props.singleProject.lastViewed)) {
					numNew = numNew + 1;
				}
			}
		}

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
				{numNew > 0 &&
				<div className="right">
					<span className="notification">{numNew}</span>
				</div>
				}
			</Ons.ListItem>
		)
	}
});

module.exports = ProjectsListRow;