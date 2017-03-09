import React from 'react';
import ReactDOM from 'react-dom';

var ons = require('onsenui');
var Ons = require('react-onsenui');

var Loading = require('./Loading.jsx');

import PagesConstants from '../constants/pages.jsx';

var CheckingAuthWelcome = React.createClass({

  render: function() {
    console.log(this.props);
    var loadingBG = {
    	position: 'absolute',
    	top: '0',
    	right: '0px',
    	bottom: '0px',
    	left: '0px',
    	marginTop: '44px'
    };

	mixpanel.track("Checking Auth",{});

    return (
      <div style={loadingBG}>
      	<Loading />
      </div>
    );
  }
});

module.exports = CheckingAuthWelcome;