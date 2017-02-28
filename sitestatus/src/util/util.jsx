var moment = require('moment');

module.exports = {
	findContractorByKey: function(key, contractorsList) {
		for (var i = 0; i < contractorsList.length; i++) {
			if (contractorsList[i]['key'] == key) {
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
			if (projectsList[i]['key'] == key) {
				return projectsList[i];
			}
		}
	},
	findStatusUpdateByKey: function(key, statusUpdateList) {
		for (var i = 0; i < statusUpdateList.length; i++) {
			if (statusUpdateList[i]['key'] == key) {
				return statusUpdateList[i];
			}
		}
	},
	daysScheduleContractorIndex: function(contractorKey, daysSchedule) {
		// console.log('contractorKey');
		// console.log(contractorKey);
		// console.log('daysSchedule');
		// console.log(daysSchedule);
		for(var key in daysSchedule) {
		    if (daysSchedule[key] == contractorKey) {
				return key;
			}
		}
		
		return -1;
	},
	prettyfirebaseArray: function(firebaseArrayObject) {
		var prettyArray = [];
		if(firebaseArrayObject) {
			for(var key in firebaseArrayObject) {
			    prettyArray.push(firebaseArrayObject[key]);
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
	},
	updatesForSpecificProject: function(projectKey, allUpdates) {
		if(!allUpdates) {
			return null;
		}
		for (var i = 0; i < allUpdates.length; i++) {
			if (allUpdates[i]['projectKey'] == projectKey) {
				return allUpdates[i]
			}
		}
	}
};
