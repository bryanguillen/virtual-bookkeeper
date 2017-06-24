const userHelper = {
	getQueryDates: function () {
		
		let currentTime = new Date(Date.now()),
			year = currentTime.getFullYear(),
			month = currentTime.getMonth() + 1,
			nextMonth;

		if (month === 12) {
			nextMonth = '01';
			year += 1;
		} else {
			nextMonth = month + 1;
		}

		if (month < 10) {
			month = '0' + month;
		}
		
		if (nextMonth < 10) {
			nextMonth = '0' + nextMonth;
		}

		queryDates = {
			beginDate: year + '/' + month + '/01',
			endDate: year + '/' + nextMonth + '/01'
		} 

		return queryDates;
	}
}

module.exports = { userHelper };