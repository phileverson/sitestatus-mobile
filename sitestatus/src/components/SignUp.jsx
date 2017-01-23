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
      firstName: '',
      lastName: '',
      company: '',
      errorMessages: ''
    }
  },

  createNoAuthUserObject: function() {
      var noAuthUserData = {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        passwordConf: this.state.passwordConf,
        firstName: this.state.firstName,
        lastName: this.state.firstName,
        company: this.state.company
      }
      return new User(noAuthUserData);
  },

  handleNoAuthUserChange: function() {
    var changingNoAuthUser = this.createNoAuthUserObject();
    this.props.updateNoAuthUser(changingNoAuthUser);
  },

  handleFirstNameChange: function(e){
    var me = this;
    var noAuthUserObject = new User({
      firstName: e.target.value
    });
    var errorMessages = _.merge(me.state.errorMessages, noAuthUserObject.isValidFirstName());
    me.setState({
        firstName: e.target.value,
        errorMessages: errorMessages
    }, function(){
      me.handleNoAuthUserChange();
    })
  },

  handleLastNameChange: function(e){
    var me = this;
    var noAuthUserObject = new User({
      lastName: e.target.value
    });
    var errorMessages = _.merge(me.state.errorMessages, noAuthUserObject.isValidLastName());
    me.setState({
        lastName: e.target.value,
        errorMessages: errorMessages
    }, function(){
      me.handleNoAuthUserChange();
    })
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
  
  handleCompanyChange: function(e){
    var me = this;
    var noAuthUserObject = new User({
      company: e.target.value
    });
    var errorMessages = _.merge(me.state.errorMessages, noAuthUserObject.isValidCompany());
    me.setState({
        company: e.target.value,
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
            className="center"
            value={this.state.company}
            onChange={this.handleCompanyChange}
            modifier='underbar'
            placeholder='Company' />
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <Ons.Input
            className="center"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
            modifier='underbar'
            placeholder='first' />
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <Ons.Input
            className="center"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
            modifier='underbar'
            placeholder='last' />
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <Ons.Input
            className="center"
            value={this.state.emailAddress}
            onChange={this.handleEmailAddressChange}
            modifier='underbar'
            placeholder='email' />
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