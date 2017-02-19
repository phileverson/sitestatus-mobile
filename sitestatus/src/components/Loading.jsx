var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var Loading = React.createClass({
	render: function() {

		return (
			<div style={{textAlign: 'center'}}>
				Loading...
			</div>
		)
	}
});

module.exports = Loading;