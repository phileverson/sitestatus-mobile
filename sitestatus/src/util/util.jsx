module.exports = {
	findContractorByKey: function(key, contractorsList) {
		for (var i = 0; i < contractorsList.length; i++) {
			if (contractorsList[i]['.key'] == key) {
				return contractorsList[i];
			}
		}
	}
};
