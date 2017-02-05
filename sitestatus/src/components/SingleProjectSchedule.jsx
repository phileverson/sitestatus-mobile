var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var PagesConstants = require('constants/pages.jsx');
var Utils = require('util/util.jsx');

var Project = require('../models/project.jsx');

var ProjectsListRow = require('./ProjectsListRow.jsx');
var NewProject = require('./NewProject.jsx');
var SingleProjectHome = require('./SingleProjectHome.jsx');

var SingleProjectSchedule = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  }
	},

	componentWillMount: function() {
		// var projects = firebase.database().ref("projects");
		// this.bindAsArray(projects, "projects");
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Project Schedule</div>
				<div className='right'>
				</div>
				<div className='left'>
					<Ons.ToolbarButton >
						<Ons.Icon icon='md-home' onClick={this.props.navToHub} />
					</Ons.ToolbarButton>
          		</div>
		    </Ons.Toolbar>
	  	)
	},

	// renderListOfProjects: function() {
	// 	var me = this;
	// 	return (
	// 		<Ons.List>
	// 		{this.state.projects.map(function(project, i){
	// 			return <ProjectsListRow singleProject={project} index={i} key={i} launchProject={me.navTo_SingleProject}/> ;
	// 		})}
	// 		</Ons.List>
	// 	)
	// },

	render: function() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			Potential Doode/Schedule Thingy Here
			</Ons.Page>
		)
	}
});

module.exports = SingleProjectSchedule;