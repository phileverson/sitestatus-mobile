import React from 'react';
import ReactDOM from 'react-dom';

var ons = require('onsenui');
var Ons = require('react-onsenui');

import PagesConstants from '../constants/pages.jsx';

var CheckingAuthWelcome = React.createClass({
  mixins: [ReactFireMixin],

  render: function() {
    console.log(this.props);
    return (
      <div>
        <h1>Authenicating you...</h1>
      </div>
    );
  }
});

module.exports = CheckingAuthWelcome;