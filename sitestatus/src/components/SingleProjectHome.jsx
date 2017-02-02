var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var SingleProjectHome = React.createClass({
	mixins: [ReactFireMixin],

	// getInitialState: function(){
	//   return {
	//   }
	// },

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
			<Ons.Page renderToolbar={this.renderToolbar}>
			test
			</Ons.Page>
		)
	}
});

module.exports = SingleProjectHome;