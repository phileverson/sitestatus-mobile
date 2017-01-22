var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var NewProject = React.createClass({
	mixins: [ReactFireMixin],

	// getInitialState: function(){
	//   return {
	//   }
	// },

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>Create Project</div>
				<div className='right'>Save</div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.cancelCreate}>
						Cancel
					</Ons.ToolbarButton>
				</div>
		    </Ons.Toolbar>
	  	)
	},

	render: function() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
			New Project stuff here...
			</Ons.Page>
		)
	}
});

module.exports = NewProject;