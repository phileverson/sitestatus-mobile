// var Constants = require('../../constants/Constants');

function Contractor(obj){
  // Fields:
  this.firstName = (obj.firstName) ? obj.firstName : "";
  this.lastName = (obj.lastName) ? obj.lastName : "";
  this.emailAddress = (obj.emailAddress) ? obj.emailAddress : "";
  this.company = (obj.company) ? obj.company : "";
  this.trade = (obj.trade) ? obj.trade : "";
  this.note = (obj.note) ? obj.note : "";
  this.owner = (obj.owner) ? obj.owner : "";
  // Formatting Phone:
  var workingPhone = (obj.phone) ? obj.phone : "";
  if (workingPhone.charAt(0) == "+") {
    workingPhone = workingPhone.substring(2, workingPhone.length);
  }
  this.phone = workingPhone;

  this.errorMessages = (obj.errorMessages) ? obj.errorMessages : {};
}

Contractor.prototype = {

  preparePutObject: function(){
    var rawDetails = new Contractor(this);
    var phoneFormated = rawDetails.phone;
    if(rawDetails.phone) {
      if(rawDetails.phone.charAt(0) != '+') {
        phoneFormated = "+1" + rawDetails.phone;
      }
      if(rawDetails.phone) {
        phoneFormated = phoneFormated.split('-').join('');
      }
    }
    var firebaseContractor = {
      firstName: rawDetails.firstName,
      lastName: rawDetails.lastName,
      phone: phoneFormated,
      emailAddress: rawDetails.emailAddress,
      company: rawDetails.company,
      trade: rawDetails.trade,
      note: rawDetails.note,
      owner: rawDetails.owner,
      deleted: false //new contractors will always default to not deleted.
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

  isValidEmailAddress: function() {
    var errorMessages = {
      emailAddress: ''
    }
    errorMessages.emailAddress = (this.emailAddress) ? "" : "This field is required."
    return errorMessages
  },

  isValid: function(){
    var numErrors = 0;
    var errorMessages = {
      phone: '',
      firstName: '',
      lastName: '',
    };

    // Checking each field
    errorMessages.phone = this.isValidPhone().phone;
    errorMessages.firstName = this.isValidFirstName().firstName;
    errorMessages.lastName = this.isValidLastName().lastName;

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