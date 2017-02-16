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
      user: null,
      firebaseAuthAlertDialogShowing: false,
      firebaseAuthAlertDialogError: ""
    }
  },

  authenticateUser: function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        mixpanel.identify(user.uid);
        if (this.state.noAuthUser.company) { // if this isn't null, it means we were creating a new user!
          var user = firebase.database().ref("users/" + user.uid);
          user.set({
            company: this.state.noAuthUser.company,
            firstName: this.state.noAuthUser.firstName,
            lastName: this.state.noAuthUser.lastName
          });
          mixpanel.people.set({
            "$email": this.state.noAuthUser.emailAddress,
            "company": this.state.noAuthUser.company,
            "$first_name": this.state.noAuthUser.firstName,
            "$last_name": this.state.noAuthUser.lastName
          });
        }

        this.setState({
          authChecked: true,
          loggedIn: true,
          user: user
        });
        
        mixpanel.people.set({
          "$last_login": new Date()
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

  clearFirebaseAuthErrorShowing: function() {
    this.setState({
      firebaseAuthAlertDialogShowing: false
    })
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
    var me = this;
    console.log('REQUEST: submitLoginOrSignUp');
    if (this.state.appState == PagesConstants.NO_AUTH_SIGN_UP) {
      var newUserObject = new User(this.state.noAuthUser);
      var isValidResult = newUserObject.isValid();

      if(isValidResult.isValid) {
        firebase.auth().createUserWithEmailAndPassword(this.state.noAuthUser.emailAddress, this.state.noAuthUser.password).catch(function(error) {
          console.log(error.message);
          console.log(error.code);
          me.setState({
            firebaseAuthAlertDialogShowing: true,
            firebaseAuthAlertDialogError: error.message
          })
        });
      } else {
        console.log(isValidResult);
        var noAuthUserWithErrors = newUserObject;
        var noAuthUserWithErrors = _.merge(newUserObject, {errorMessages: isValidResult.errorMessages});
        me.setState({
          noAuthUser: noAuthUserWithErrors
        });
        console.log(this.state);
      }
    } else {
      // Authenticate with Firebase with the login details from state
      firebase.auth().signInWithEmailAndPassword(this.state.noAuthUser.emailAddress, this.state.noAuthUser.password).catch(function(error) {
        console.log(error.message);
        console.log(error.code);
        me.setState({
          firebaseAuthAlertDialogShowing: true,
          firebaseAuthAlertDialogError: error.message
        })
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
          appLanding = <SignUp 
                          noAuthUser={this.state.noAuthUser}
                          updateNoAuthUser={this.updateNoAuthUser}
                          submit={this.submitLoginOrSignUp}
                          clearFirebaseAuthErrorShowing={this.clearFirebaseAuthErrorShowing}
                          firebaseAuthAlertDialogShowing={this.state.firebaseAuthAlertDialogShowing}
                          firebaseAuthAlertDialogError={this.state.firebaseAuthAlertDialogError}
                          />;
        }
      }

      return (
        <Ons.Page renderToolbar={this.renderToolbar}>
          {appLanding}
          <Ons.AlertDialog
            isOpen={this.state.firebaseAuthAlertDialogShowing}
            isCancelable={false}>
            <div className='alert-dialog-title'>Error</div>
            <div className='alert-dialog-content'>
              {this.state.firebaseAuthAlertDialogError}
            </div>
            <div className='alert-dialog-footer'>
              <button onClick={this.clearFirebaseAuthErrorShowing} className='alert-dialog-button'>
                Ok
              </button>
            </div>
          </Ons.AlertDialog>
        </Ons.Page>
      );
    }
  }
});

module.exports = App;