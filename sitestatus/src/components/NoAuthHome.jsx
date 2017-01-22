import React from 'react';
import ReactDOM from 'react-dom';

var ons = require('onsenui');
var Ons = require('react-onsenui');

import PagesConstants from '../constants/pages.jsx';

var NoAuthHome = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      user: null,
      isOpen: false,
      currentPage: PagesConstants.DEFAULT
    }
  },

  componentWillMount: function() {
    // var ref = firebase.database().ref("items");
    // this.bindAsArray(ref, "items");
  },

  render: function() {
    console.log(this.props);
    return (
      <div>
        <p>Welcome! No Auth :(</p>
        <Ons.Button onClick={this.props.navToLogin}>Login</Ons.Button>
        <Ons.Button onClick={this.props.navToSignUp}>Sign Up</Ons.Button>
      </div>
    );
  }
});

module.exports = NoAuthHome;