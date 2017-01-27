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
        <Ons.List >
          <Ons.ListItem modifier='nodivider'>
            <Ons.Button modifier='large' onClick={this.props.navToLogin}>Login</Ons.Button>
          </Ons.ListItem>
          <Ons.ListItem modifier='nodivider'>
            <Ons.Button modifier='large' onClick={this.props.navToSignUp}>Sign Up</Ons.Button>
          </Ons.ListItem>
        </Ons.List>
      </div>
    );
  }
});

module.exports = NoAuthHome;