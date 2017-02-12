var moment = require('moment');

module.exports = {
	findContractorByKey: function(key, contractorsList) {
		for (var i = 0; i < contractorsList.length; i++) {
			if (contractorsList[i]['.key'] == key) {
				// console.log('returning:');
				// console.log(contractorsList[i]);
				return contractorsList[i];
			}
		}
		return null;
	},
	findContractorByPhoneNumber: function(phoneNumber, contractorsList) {
		for (var i = 0; i < contractorsList.length; i++) {
			if (contractorsList[i]['phone'] == phoneNumber) {
				return contractorsList[i];
			}
		}
	},
	findProjectByKey: function(key, projectsList) {
		for (var i = 0; i < projectsList.length; i++) {
			if (projectsList[i]['.key'] == key) {
				return projectsList[i];
			}
		}
	},
	findStatusUpdateByKey: function(key, statusUpdateList) {
		for (var i = 0; i < statusUpdateList.length; i++) {
			if (statusUpdateList[i]['.key'] == key) {
				return statusUpdateList[i];
			}
		}
	},
	daysScheduleContractorIndex: function(contractorKey, daysSchedule) {
		for (var i = 0; i < daysSchedule.length; i++) {
			if (daysSchedule[i]['.value'] == contractorKey) {
				return i;
			}
		}
		return -1;
	},
	prettyfirebaseArray: function(firebaseArrayObject) {
		var prettyArray = [];
		if(firebaseArrayObject) {
			for (var i = 0; i < firebaseArrayObject.length; i++) {
				prettyArray.push(firebaseArrayObject[i]['.value']);
			}
		}
		return prettyArray;
	},
	back7Forward14Days: function() {
		var dateArray = [];
	    var currentDate = moment().subtract(1, 'week');
	    var stopDate = moment().add(2, 'week');
	    while (currentDate <= stopDate) {
	        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
	        currentDate = moment(currentDate).add(1, 'days');
	    }
	    return dateArray;
	}
};
