const controllerHelper = {
	monthLookup: function (month) {
		let monthNum = month.toString();

		months = {
			'1': 'jan',
			'2': 'feb',
			'3': 'mar',
			'4': 'apr',
			'5': 'may',
			'6': 'jun',
			'7': 'jul',
			'8': 'aug',
			'9': 'sep',
			'10': 'oct',
			'11': 'nov',
			'12': 'dec'
		}
		//lowercase every month
		return months[monthNum];
	},

	fullMonthLookup: function (month) {
		months = {
			'jan': 'January',
			'feb': 'February',
			'mar': 'March',
			'apr': 'April',
			'may': 'May',
			'jun': 'June',
			'jul': 'July',
			'aug': 'August',
			'sep': 'September',
			'oct': 'October',
			'nov': 'November',
			'dec': 'December'	
		}
		return months[month];
	},

	getCurrentMonth: function () {
		
		let currentDate = new Date(Date.now()),
			year = currentDate.getFullYear(),
			month = currentDate.getMonth() + 1;
		
		month = this.monthLookup(month);

		queryDates = {
			month, year
		} 

		return queryDates;
	}	
} //recently deleted two other helpers

module.exports = { controllerHelper };