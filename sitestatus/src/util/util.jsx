module.exports = {
	findContractorByKey: function(key, contractorsList) {
		for (var i = 0; i < contractorsList.length; i++) {
			if (contractorsList[i]['.key'] == key) {
				return contractorsList[i];
			}
		}
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
	}
};
