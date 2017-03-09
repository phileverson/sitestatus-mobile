var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var _ = require('lodash');

var User = require('../models/user.jsx');

var Login = React.createClass({

  getInitialState: function(){
    return {
      emailAddress: '',
      password: '',
      errorMessages: ''
    }
  },

  createNoAuthUserObject: function() {
      var noAuthUserData = {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
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
    // console.log(this.state.errorMessages);
    return (
    <section>
      <Ons.List>
        <Ons.ListItem modifier='nodivider'>
          {this.state.errorMessages.emailAddress && this.state.errorMessages.emailAddress.length > 0 &&
              <p>helloworld</p>
            }
          <Ons.Input
            style={{width: '100%', 'paddingRight': '14px'}}
            className="center"
            value={this.state.emailAddress}
            onChange={this.handleEmailAddressChange}
            modifier='underbar'
            placeholder='Email Address' 
            float/>
        </Ons.ListItem>
        <Ons.ListItem modifier='nodivider'>
          <Ons.Input
            type = 'password'
            style={{width: '100%', 'paddingRight': '14px'}}
            className="center"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            modifier='underbar'
            placeholder='Password' 
            float/>
        </Ons.ListItem>
        <Ons.ListItem style={{paddingRight: '6px'}} >
          <Ons.Button modifier='large' onClick={this.props.submit}>Login</Ons.Button>
        </Ons.ListItem>
      </Ons.List>
    </section>
    );
  }
});

module.exports = Login;