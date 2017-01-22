var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var UserProfile = React.createClass({
	mixins: [ReactFireMixin],

	// getInitialState: function(){
	//   return {
	//   }
	// },

	renderToolbar: function() {
	    return (
		    <Ons.Toolbar>
				<div className='center'>User Profile</div>
				<div className='right'></div>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.props.showLeftMenu}>
						<Ons.Icon icon='ion-navicon, material:md-menu' />
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

module.exports = UserProfile;