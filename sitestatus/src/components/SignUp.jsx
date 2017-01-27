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
      errorMessages: this.props.noAuthUser.errorMessages
    }
  },

  createNoAuthUserObject: function() {
      var noAuthUserData = {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        passwordConf: this.state.passwordConf,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
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
    console.log(this.state.errorMessages);
    var errorMessageTextStyle = {
      color: 'red',
      fontSize: '8px',
      background: 'white',
      width: '100%',

    }
    var inputItemStyle = {
      width: '100%'
    }
    var divListItemStyle ={
      width: '100%'
    }
    return (
    <section>
      <Ons.List>
          <Ons.ListItem modifier="nodivider" >
          <div style={divListItemStyle}>
            {this.state.errorMessages.company && this.state.errorMessages.company.length > 0 &&
              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.company}</div>
            }
            <Ons.Input 
              style={inputItemStyle}
              className="center"
              value={this.state.company}
              onChange={this.handleCompanyChange}
              modifier='underbar'
              placeholder='Company Name' />
          </div>
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <div style={divListItemStyle}>
            {this.state.errorMessages.firstName && this.state.errorMessages.firstName.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.firstName}</div>
            }
            <Ons.Input
              style={inputItemStyle}
              className="center"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
              modifier='underbar'
              placeholder='First Name' />
          </div>
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <div style={divListItemStyle}>
            {this.state.errorMessages.lastName && this.state.errorMessages.lastName.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.lastName}</div>
            }
            <Ons.Input
              style={inputItemStyle}
              className="center"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
              modifier='underbar'
              placeholder='Last Name' />
          </div>
        </Ons.ListItem>
        
        <Ons.ListItem modifier="nodivider">
          <div style={divListItemStyle}>
            {this.state.errorMessages.emailAddress && this.state.errorMessages.emailAddress.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.emailAddress}</div>
            }
            <Ons.Input
              style={inputItemStyle}
              className="center"
              value={this.state.emailAddress}
              onChange={this.handleEmailAddressChange}
              modifier='underbar'
              placeholder='Email' />
          </div>
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider">
          <div style={divListItemStyle}>
            {this.state.errorMessages.password && this.state.errorMessages.password.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.password}</div>
            }
            <Ons.Input
              style={inputItemStyle}
              type= 'Password'
              className="center"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              modifier='underbar'
              placeholder='Password' />
          </div>
        </Ons.ListItem>
        <Ons.ListItem>
          <Ons.Button modifier='large' onClick={this.props.submit}>Sign Up</Ons.Button>
        </Ons.ListItem>
      </Ons.List>
    </section>
    );
  }
});

module.exports = SignUp;