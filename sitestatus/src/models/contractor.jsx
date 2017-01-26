// var Constants = require('../../constants/Constants');

function Contractor(obj){
  // Fields:
  this.contractorID = (obj.contractorID) ? obj.contractorID : "";
  this.firstName = (obj.firstName) ? obj.firstName : "";
  this.lastName = (obj.lastName) ? obj.lastName : "";
  this.phone = (obj.phone) ? obj.phone : "";
  this.company = (obj.company) ? obj.company : "";
  this.trade = (obj.trade) ? obj.trade : "";
  this.note = (obj.note) ? obj.note : "";

  this.errorMessages = (obj.errorMessages) ? obj.errorMessages : {};
}

Contractor.prototype = {

  preparePutObject: function(){
    var rawDetails = new Contractor(this);
    var firebaseContractor = {
      firstName: rawDetails.firstName,
      lastName: rawDetails.lastName,
      phone: rawDetails.phone,
      company: rawDetails.company,
      trade: rawDetails.trade,
      note: rawDetails.note
    }
    return firebaseContractor;
  },

  isValidCompany: function() {
    var errorMessages = {
      company: ''
    }
    errorMessages.company = (this.company) ? "" : "This field is required."
    return errorMessages
  },

  isValidTrade: function() {
    var errorMessages = {
      trade: ''
    }
    errorMessages.trade = (this.trade) ? "" : "This field is required."
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

  isValidPhone: function() {
    var errorMessages = {
      phone: ''
    }
    errorMessages.phone = (this.phone) ? "" : "This field is required."
    return errorMessages
  },

  isValid: function(){
    var numErrors = 0;
    var errorMessages = {
      phone: '',
      password: '',
    };

    // Checking each field
    errorMessages.phone = this.isValidEmailAddress().phone;

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

module.exports = Contractor;