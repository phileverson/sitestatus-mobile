var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var SingleProjectStatusUpdateList = require('./SingleProjectStatusUpdateList.jsx');
var SingleProjectSchedule = require('./SingleProjectSchedule.jsx');

var SingleProjectHome = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function(){
	  return {
	  	index:0,
	  	commonContractors: []
	  }
	},

	componentWillMount: function() {
		var allContractors = firebase.database().ref("contractors");
		this.bindAsArray(allContractors, "allContractors");
	},

	renderTabs: function() {
		return [
			{
				content: <SingleProjectStatusUpdateList singleProject={this.props.singleProject} allContractors={this.state.allContractors} navToHub={this.props.navToHub} />,
				tab: <Ons.Tab label='Updates' icon='md-settings' />
			},
			{
				content: <SingleProjectSchedule singleProject={this.props.singleProject} navToHub={this.props.navToHub} />,
				tab: <Ons.Tab label='Schedule' icon='md-settings' />
			},
			{
				content: <SingleProjectStatusUpdateList singleProject={this.props.singleProject} navToHub={this.props.navToHub} />,
				tab: <Ons.Tab label='Settings' icon='md-settings' />
			}
		];
	},

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Single Project</div>
				<div className='right'></div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.navToHub}>
						<Ons.Icon icon='ion-android-folder-open' />
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	render: function() {
		return (
			<Ons.Tabbar
				index={this.state.index}
				onPreChange={(event) =>
					{
						if (event.index != this.state.index) {
							this.setState({index: event.index});
						}
					}
				}
				renderTabs={this.renderTabs}
			/>
		)
	}
});

module.exports = SingleProjectHome;