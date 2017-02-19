var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var Loading = React.createClass({
	render: function() {

		return (
			<div>
				<Ons.ProgressBar indeterminate />
				<div style={{textAlign: 'center', marginTop:'10px'}}>
					Loading...
				</div>
			</div>
		)
	}
});

module.exports = Loading;