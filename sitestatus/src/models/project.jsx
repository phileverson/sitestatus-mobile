// var Constants = require('../../constants/Constants');

function Project(obj){
  // Fields:
  this.projectID = (obj.projectID) ? obj.projectID : "";
  this.name = (obj.name) ? obj.name : "";
  this.address = (obj.address) ? obj.address : "";
  this.note = (obj.note) ? obj.note : "";
  this.status = (obj.status) ? obj.status : "";
  this.shortListedContractors = (obj.shortListedContractors) ? obj.shortListedContractors : [];

  this.errorMessages = (obj.errorMessages) ? obj.errorMessages : {};
}

Project.prototype = {

  preparePutObject: function(){
    var rawDetails = new Project(this);
    var firebaseProject = {
      name: rawDetails.name,
      address: rawDetails.address,
      note: rawDetails.note,
      status: rawDetails.status,
      shortListedContractors: rawDetails.shortListedContractors
    }
    return firebaseProject;
  },

  isValidName: function() {
    var errorMessages = {
      name: ''
    }
    errorMessages.name = (this.name) ? "" : "This field is required."
    return errorMessages
  },

  isValid: function(){
    var numErrors = 0;
    var errorMessages = {
      name: '',
    };

    // Checking each field
    errorMessages.name = this.isValidName().name;

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

module.exports = Project;