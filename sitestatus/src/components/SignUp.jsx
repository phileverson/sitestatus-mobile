var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var _ = require('lodash');

var GlobalConstants = require('constants/global.jsx');
var Styles = require('constants/styles.jsx');

var User = require('../models/user.jsx');

var SignUp = React.createClass({

  getInitialState: function(){
    var newUserSigningUp = (this.props.currentUser) ? false : true;

    if (!newUserSigningUp) {
      return {
        newUserSigningUp: newUserSigningUp,

        emailAddress: this.props.currentUser.emailAddress,
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,
        company: this.props.currentUser.company,
        errorMessages: {
          company: '',
          emailAddress: '',
          password: '',
          firstName: '',
          lastName: ''
        }
      }
    } else {
      return {
        newUserSigningUp: newUserSigningUp,

        emailAddress: '',
        password: '',
        passwordConf: '',
        firstName: '',
        lastName: '',
        company: '',
        errorMessages: this.props.noAuthUser.errorMessages
      }
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

  renderToolbar: function() {
    if (!this.state.newUserSigningUp) {
      return (
        <Ons.Toolbar>
        <div className='center'>Edit User Profile</div>
        <div className='right'>
          <Ons.ToolbarButton onClick={this.props.saveUserProfile}>
            Save
          </Ons.ToolbarButton>
        </div>
        <div className='left'>
          <Ons.ToolbarButton onClick={this.props.cancelEdit}>
            Cancel
          </Ons.ToolbarButton>
              </div>
        </Ons.Toolbar>
      )
    }
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
    var fieldHeaderStyle={
        fontSize: '12px',
        color: Styles.onsenBlue
      }
    var divListItemStyle ={
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    }

    var listItemStyle ={
      paddingRight: '6px'
    }

    var showFirebaseAuthFields = this.state.newUserSigningUp;
    // var showFirebaseAuthLink = this.state.newUserSigningUp;
    var saveButtonLabel = 'Sign Up';
    if (!this.state.newUserSigningUp) {
      saveButtonLabel = "Save Profile" 
    }
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
    <section>
      <Ons.List>
          <Ons.ListItem modifier="nodivider"  style={listItemStyle}>
          <div style={divListItemStyle}>
            {this.state.errorMessages.company && this.state.errorMessages.company.length > 0 &&
              <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.company}</div>
            }
            <div className='list__item__title' style={fieldHeaderStyle}>Company Name</div>
            <Ons.Input 
              style={inputItemStyle}
              className="center"
              value={this.state.company}
              onChange={this.handleCompanyChange}
              modifier='underbar'
              placeholder='Company Name' />
          </div>
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider" style={listItemStyle}>
          <div style={divListItemStyle}>
            {this.state.errorMessages.firstName && this.state.errorMessages.firstName.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.firstName}</div>
            }
            <div className='list__item__title' style={fieldHeaderStyle}>First Name</div>
            <Ons.Input
              style={inputItemStyle}
              className="center"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
              modifier='underbar'
              placeholder='First Name' />
          </div>
        </Ons.ListItem>
        <Ons.ListItem modifier="nodivider" style={listItemStyle}>
          <div style={divListItemStyle}>
            {this.state.errorMessages.lastName && this.state.errorMessages.lastName.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.lastName}</div>
            }
            <div className='list__item__title' style={fieldHeaderStyle}>Last Name</div>
            <Ons.Input
              style={inputItemStyle}
              className="center"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
              modifier='underbar'
              placeholder='Last Name' />
          </div>
        </Ons.ListItem>
        {showFirebaseAuthFields &&
        <Ons.ListItem modifier="nodivider" style={listItemStyle}>
          <div style={divListItemStyle}>
            {this.state.errorMessages.emailAddress && this.state.errorMessages.emailAddress.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.emailAddress}</div>
            }
            <div className='list__item__title' style={fieldHeaderStyle}>Email Address</div>
            <Ons.Input
              style={inputItemStyle}
              className="center"
              value={this.state.emailAddress}
              onChange={this.handleEmailAddressChange}
              modifier='underbar'
              placeholder='Email' />
          </div>
        </Ons.ListItem>
        }
        {showFirebaseAuthFields &&
        <Ons.ListItem modifier="nodivider" style={listItemStyle}>
          <div style={divListItemStyle}>
            {this.state.errorMessages.password && this.state.errorMessages.password.length > 0 &&
            <div modifier='nodivider' style={errorMessageTextStyle}>{this.state.errorMessages.password}</div>
            }
            <div className='list__item__title' style={fieldHeaderStyle}>Password</div>
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
        }
        <Ons.ListItem style={listItemStyle}>
          <Ons.Button modifier='large' style={{paddingRight: '6px'}} onClick={this.props.submit}>{saveButtonLabel}</Ons.Button>
        </Ons.ListItem>
      </Ons.List>
      {!showFirebaseAuthFields &&
      <div style={{width: '100%'}}>
        <div style={{textAlign: 'center', fontSize: '12px', marginTop:'10px'}}>To change your email address or password, please <a href="mailto:info@sitestatus.co">contact us</a>.</div>
      </div>
      }
    </section>
    </Ons.Page>
    );
  }
});

module.exports = SignUp;