// var Constants = require('../../constants/Constants');

function User(obj){
  // Fields:
  this.emailAddress = (obj.emailAddress) ? obj.emailAddress : "";
  this.password = (obj.password) ? obj.password : "";
  this.passwordConf = (obj.passwordConf) ? obj.passwordConf : "";
  this.firstName = (obj.firstName) ? obj.firstName : "";
  this.lastName = (obj.lastName) ? obj.lastName : "";
  this.company = (obj.company) ? obj.company : "";

  this.errorMessages = (obj.errorMessages) ? obj.errorMessages : {};
}

User.prototype = {

  preparePutObject: function(){
    var rawDetails = new User(this);
    var firebaseUser = {
      emailAddress: rawDetails.emailAddress,
      password: rawDetails.password,
      futureFieldsForSignUpToo_DotDotDot: ''
    }
    return firebaseUser;
  },

  isValidCompany: function() {
    var errorMessages = {
      company: ''
    }
    errorMessages.company = (this.company) ? "" : "This field is required."
    return errorMessages
  },

  isValidFirstName: function() {
    var errorMessages = {
      firstName: ''
    }
    errorMessages.firstName = (this.firstName) ? "" : "This field is required."
    return errorMessages
  },

  isValidLastName: function() {
    var errorMessages = {
      lastName: ''
    }
    errorMessages.lastName = (this.lastName) ? "" : "This field is required."
    return errorMessages
  },

  isValidEmailAddress: function() {
    var errorMessages = {
      emailAddress: ''
    }
    errorMessages.emailAddress = (this.emailAddress) ? "" : "This field is required."
    return errorMessages
  },

  isValidPassword: function() {
    var errorMessages = {
      password: ''
    }
    errorMessages.password = (this.password) ? "" : "This field is required."
    return errorMessages
  },

  isValid: function(){
    var numErrors = 0;
    var errorMessages = {
      emailAddress: '',
      password: '',
    };

    // Checking each field
    errorMessages.emailAddress = this.isValidEmailAddress().emailAddress;
    errorMessages.password = this.isValidPassword().password;

    // Did we get any error messages?
    for (var field in errorMessages) {
      if (errorMessages[field]) {
        numErrors++;
      }
    }

    return {
      isValid: ((numErrors == 0) ? true : false),
      errorMessages: errorMessages
    };
  }
}

module.exports = User;