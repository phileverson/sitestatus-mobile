var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var Rebase = require('re-base');

var SiteStatusBase = require('util/SiteStatusBase.jsx');

import PagesConstants from './constants/pages.jsx';

var GlobalConstants = require('./constants/global.jsx');

var User = require('./models/user.jsx');

// Pages:
import CheckingAuthWelcome from './components/CheckingAuthWelcome.jsx';
import NoAuthHome from './components/NoAuthHome.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import AuthHome from './components/AuthHome.jsx';

var App = React.createClass({

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
            firebaseAuthAlertDialogError: "",

            modalIsOpen: false,
            modalDetail: {
                body: '',
                showCloseButton: true
            }
        }
    },

    activateGlobalModal: function(body, showCloseButton = true, openModal = true) {
        this.setState({
            modalDetail: {
                body: body,
                showCloseButton: showCloseButton
            },
            modalIsOpen: openModal
        })
    },

    deactivateGlobalModal: function() {
        this.setState({
            modalIsOpen: false
        })
    },

    authenticateUser: function() {
        var me = this;
        console.log('Checking auth of passed user / activating onAuthChecker variable.')

        var onAuthChecker = SiteStatusBase.onAuth(function(user){
            if (user) {
                mixpanel.identify(user.uid);
                if (me.state.noAuthUser.company) { // if this isn't null, it means we were creating a new user!
                    var userObj = {
                        company: me.state.noAuthUser.company,
                        firstName: me.state.noAuthUser.firstName,
                        lastName: me.state.noAuthUser.lastName
                    };
                    var userUpdateEndPoint = "users/" + user.uid + "/";
                    SiteStatusBase.update(userUpdateEndPoint, {
                        data: userObj,
                        then: function(err) {
                            if (!err) {
                                console.log('User details (first name, last name, company, etc. saved successfully.');
                            } else {
                                console.log(err);
                            }
                        }
                    });
                    mixpanel.people.set({
                        "$email": me.state.noAuthUser.emailAddress,
                        "company": me.state.noAuthUser.company,
                        "$first_name": me.state.noAuthUser.firstName,
                        "$last_name": me.state.noAuthUser.lastName
                    });
                }

                me.setState({
                    authChecked: true,
                    loggedIn: true,
                    user: user
                });
                
                mixpanel.people.set({
                    "$last_login": new Date()
                });
            }
            else {
                me.setState({
                    authChecked: true,
                    loggedIn: false,
                    user: null
                });
            }
        })
    },

    componentDidMount: function() {
        this.authenticateUser();
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
        SiteStatusBase.createUser({
          email: this.state.noAuthUser.emailAddress,
          password: this.state.noAuthUser.password
        }, this.baseAuthHandler);
      } else {
        // Issues with form validation
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
      if (this.state.noAuthUser.emailAddress) {
        SiteStatusBase.authWithPassword({
          email: this.state.noAuthUser.emailAddress,
          password: this.state.noAuthUser.password
        }, this.baseAuthHandler);
      } else {
          me.setState({
            firebaseAuthAlertDialogShowing: true,
            firebaseAuthAlertDialogError: "Please enter an email address."
          })
      }
    }
    },

    baseAuthHandler: function(error, user){
        var me = this;
        if (error){
            console.log('Error signing user in:'); 
            console.log(error); 
            me.setState({
                firebaseAuthAlertDialogShowing: true,
                firebaseAuthAlertDialogError: error.message
            })
        } else {
            this.setState({
                authChecked: true,
                loggedIn: true,
                user: user
            });
        }
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

    renderGlobalModal: function() {
        return (
            <Ons.Modal isOpen={this.state.modalIsOpen} >
                <section style={{margin: '16px'}}>
                    <p style={{opacity: 0.6}}>{this.state.modalDetail.body}</p>
                    {this.state.modalDetail.showCloseButton &&
                    <p><Ons.Button onClick={() => this.setState({modalIsOpen: false})}>Close</Ons.Button></p>
                    }
                </section>
            </Ons.Modal>
        )
    },

    render: function() {
    if (!this.state.authChecked) {
        // Temp splash screen while we check auth status...
        return (
            <CheckingAuthWelcome />
        );
    } else {
        // We've checked auth at least once, and can now figure out where to go...
        var appLanding = <NoAuthHome 
                            navToLogin={this.navTo_NoAuthLogin}
                            navToSignUp={this.navTo_NoAuthSignUp}
                            />;
        if (this.state.loggedIn) {
            appLanding = <AuthHome
                            user={this.state.user}
                            activateGlobalModal={this.activateGlobalModal}
                            deactivateGlobalModal={this.deactivateGlobalModal}
                            />;
        } else {
            if (this.state.appState == PagesConstants.NO_AUTH_LOGIN) {
                appLanding = <Login 
                                updateNoAuthUser={this.updateNoAuthUser}
                                submit={this.submitLoginOrSignUp}
                                />;
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
            <Ons.Page
                renderToolbar={this.renderToolbar} 
                renderModal={this.renderGlobalModal}>
                {appLanding}
                <Ons.AlertDialog
                    isOpen={this.state.firebaseAuthAlertDialogShowing}
                    isCancelable={false}>
                    <div className='alert-dialog-title'>Error</div>
                    <div className='alert-dialog-content'>
                        {this.state.firebaseAuthAlertDialogError}
                    </div>
                    <div className='alert-dialog-footer'>
                        <button onClick={this.clearFirebaseAuthErrorShowing} className='alert-dialog-button'>Ok</button>
                    </div>
                </Ons.AlertDialog>
            </Ons.Page>
        );
    }
  }
});

module.exports = App;