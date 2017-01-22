var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var _ = require('lodash');

var User = require('../models/user.jsx');

var SignUp = React.createClass({

  getInitialState: function(){
    return {
      emailAddress: '',
      password: '',
      passwordConf: '',
      errorMessages: ''
    }
  },

  createNoAuthUserObject: function() {
      var noAuthUserData = {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        passwordConf: this.state.passwordConf
      }
      return new User(noAuthUserData);
  },

  handleNoAuthUserChange: function() {
    var changingNoAuthUser = this.createNoAuthUserObject();
    this.props.updateNoAuthUser(changingNoAuthUser);
  },

  handleEmailAddressChange: function(e){
    var me = this;
    var noAuthUserObject = new User({
      emailAddress: e.target.value
    });
    var errorMessages = _.merge(me.state.errorMessages, noAuthUserObject.isValidEmailAddress());
    me.setState({
        emailAddress: e.target.value,
        errorMessages: errorMessages
    }, function(){
      me.handleNoAuthUserChange();
    })
  },

  handlePasswordChange: function(e){
    var me = this;
    var noAuthUserObject = new User({
      password: e.target.value
    });
    var errorMessages = _.merge(me.state.errorMessages, noAuthUserObject.isValidPassword());
    me.setState({
        password: e.target.value,
        errorMessages: errorMessages
    }, function(){
      me.handleNoAuthUserChange();
    })
  },

  render: function() {
    return (
    <section>
      <Ons.List>
        <Ons.ListItem modifier="nodivider">
          <Ons.Input
            style={{width: '100%', 'paddingRight': '14px'}}
            className="center"
            value={this.state.emailAddress}
            onChange={this.handleEmailAddressChange}
            modifier='underbar'
            placeholder='Email Address' />
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <Ons.Input
            style={{width: '100%', 'paddingRight': '14px'}}
            className="center"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            modifier='underbar'
            placeholder='Password' />
        </Ons.ListItem>
        <Ons.ListItem>
          <Ons.Button onClick={this.props.submit}>Sign Up</Ons.Button>
        </Ons.ListItem>
      </Ons.List>
    </section>
    );
  }
});

module.exports = SignUp;