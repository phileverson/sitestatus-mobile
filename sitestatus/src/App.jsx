var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

import PagesConstants from './constants/pages.jsx';

var User = require('./models/user.jsx');

// Pages:
import CheckingAuthWelcome from './components/CheckingAuthWelcome.jsx';
import NoAuthHome from './components/NoAuthHome.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import AuthHome from './components/AuthHome.jsx';

var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      authChecked: false,
      loggedIn: false,
      appState: PagesConstants.NO_AUTH_WELCOME,
      noAuthUser: {
        errorMessages: {
          company: '',
          emailAddress: '',
          password: '',
          firstName: '',
          lastName: ''
        }
      },
      user: null
    }
  },

  authenticateUser: function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({
          authChecked: true,
          loggedIn: true,
          user: user
        });
      }
      else {
        this.setState({
          authChecked: true,
          loggedIn: false,
          user: null
        });
      }
    }.bind(this));
  },

  componentDidMount: function() {
    this.authenticateUser();
  },

  renderToolbar: function() {
    var onLoginOrSignUp = (this.state.appState == PagesConstants.NO_AUTH_LOGIN || this.state.appState == PagesConstants.NO_AUTH_SIGN_UP)
    if (this.state.user) {

    } else {
        return (
        <Ons.Toolbar>
          <div className='center'>SiteStatus</div>
          <div className='right'>
            {onLoginOrSignUp &&
            <Ons.ToolbarButton onClick={this.submitLoginOrSignUp}>Submit</Ons.ToolbarButton>
            }
          </div>
          <div className='left'>
            {onLoginOrSignUp &&
            <Ons.ToolbarButton onClick={this.navTo_NoAuthHome}>Cancel</Ons.ToolbarButton>
            }
          </div>
        </Ons.Toolbar>
      )
    }
  },

  navTo_NoAuthHome: function() {
    this.setState({
      appState: PagesConstants.NO_AUTH_WELCOME
    })
  },

  navTo_NoAuthLogin: function() {
    this.setState({
      appState: PagesConstants.NO_AUTH_LOGIN
    })
  },

  navTo_NoAuthSignUp: function() {
    this.setState({
      appState: PagesConstants.NO_AUTH_SIGN_UP
    })
  },

  updateNoAuthUser: function(userObj) {
    this.setState({
      noAuthUser: userObj
    });
  },

  submitLoginOrSignUp: function() {
    console.log('REQUEST: submitLoginOrSignUp');
    if (this.state.appState == PagesConstants.NO_AUTH_SIGN_UP) {
      var newUserObject = new User(this.state.noAuthUser);
      var isValidResult = newUserObject.isValid();

      if(isValidResult.isValid) {
        firebase.auth().createUserWithEmailAndPassword(this.state.noAuthUser.emailAddress, this.state.noAuthUser.password).catch(function(error) {
          console.log(error.message);
          console.log(error.code);
        });
      } else {
        console.log(isValidResult);
        var noAuthUserWithErrors = newUserObject;
        var noAuthUserWithErrors = _.merge(newUserObject, {errorMessages: isValidResult.errorMessages});
        this.setState({
          noAuthUser: noAuthUserWithErrors
        });
        console.log(this.state);
      }
    } else {
      // Authenticate with Firebase with the login details from state
      firebase.auth().signInWithEmailAndPassword(this.state.noAuthUser.emailAddress, this.state.noAuthUser.password).catch(function(error) {
        console.log(error.message);
        console.log(error.code);
      });
    }
  },

  render: function() {
    // console.log(this.state);
    // console.log((this.state.user));

    if (!this.state.authChecked) {
      // Temp splash screen while we check auth status...
      return (
        <CheckingAuthWelcome />
        );
    } else {
      // We've checked auth at least once, and can now figure out where to go...
      var appLanding = <NoAuthHome navToLogin={this.navTo_NoAuthLogin} navToSignUp={this.navTo_NoAuthSignUp}/>;
      if (this.state.loggedIn) {
        appLanding = <AuthHome user={this.state.user}/>;
      } else {
        if (this.state.appState == PagesConstants.NO_AUTH_LOGIN) {
          appLanding = <Login updateNoAuthUser={this.updateNoAuthUser} submit={this.submitLoginOrSignUp}/>;
        } else if (this.state.appState == PagesConstants.NO_AUTH_SIGN_UP) {
          appLanding = <SignUp noAuthUser={this.state.noAuthUser} updateNoAuthUser={this.updateNoAuthUser} submit={this.submitLoginOrSignUp}/>;
        }
      }

      return (
        <Ons.Page renderToolbar={this.renderToolbar}>
          {appLanding}
        </Ons.Page>
      );
    }
  }
});

module.exports = App;