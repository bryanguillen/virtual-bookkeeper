const componentHelper = {
	monthLookup: function (month) {
		let monthNum = month.toString();
		let months = {
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
		return months[monthNum];
	},

	getMonth: function () {
		let currentDate = new Date(Date.now()),
			month = this.monthLookup(currentDate.getMonth() + 1),
			year = currentDate.getFullYear(),
			currentMonth = {
				month, 
				year
			};

			return currentMonth; //return object with current month
	}
}

export default componentHelper;