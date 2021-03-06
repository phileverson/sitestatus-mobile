// var Constants = require('../../constants/Constants');

function Project(obj){
  // Fields:
  this.name = (obj.name) ? obj.name : "";
  this.address = (obj.address) ? obj.address : "";
  this.question = (obj.question) ? obj.question : "";
  this.questionTime = (obj.questionTime) ? obj.questionTime : "";
  this.note = (obj.note) ? obj.note : "";
  this.status = (obj.status) ? obj.status : "";
  this.shortListedContractors = (obj.shortListedContractors) ? obj.shortListedContractors : [];
  this.owner = (obj.owner) ? obj.owner : "";
  this.phoneNumber = (obj.phoneNumber) ? obj.phoneNumber : "";

  this.errorMessages = (obj.errorMessages) ? obj.errorMessages : {};
}

Project.prototype = {

  preparePutObject: function(){
    var rawDetails = new Project(this);
    var firebaseProject = {
      name: rawDetails.name,
      address: rawDetails.address,
      question: rawDetails.question,
      questionTime: rawDetails.questionTime,
      note: rawDetails.note,
      status: rawDetails.status,
      shortListedContractors: rawDetails.shortListedContractors,
      owner: rawDetails.owner,
      deleted: false // By default, a project should always be not deleted. When we delete, we modify what preparePutObject object gives us in the component that uses it.
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

  isValidQuestion: function() {
    var errorMessages = {
      question: ''
    }
    errorMessages.question = (this.question) ? "" : "This field is required."
    return errorMessages
  },

  isValidQuestionTime: function() {
    var errorMessages = {
      questionTime: ''
    }
    errorMessages.questionTime = (this.questionTime) ? "" : "This field is required."
    return errorMessages
  },

  isValid: function(){
    var numErrors = 0;
    var errorMessages = {
      name: '',
      question: '',
      questionTime: ''
    };

    // Checking each field
    errorMessages.name = this.isValidName().name;
    errorMessages.question = this.isValidQuestion().question;
    errorMessages.questionTime = this.isValidQuestionTime().questionTime;

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