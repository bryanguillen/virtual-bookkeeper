const userHelper = {
	monthLookup: function (month) {
		let monthNum = month.toString();

		months = {
			'1': 'Jan',
			'2': 'Feb',
			'3': 'Mar',
			'4': 'Apr',
			'5': 'May',
			'6': 'Jun',
			'7': 'Jul',
			'8': 'Aug',
			'9': 'Sep',
			'10': 'Oct',
			'11': 'Nov',
			'12': 'Dec'
		}
		return months[monthNum];
	},

	getMonthlyQuery: function () {
		
		let currentDate = new Date(Date.now()),
			year = currentDate.getFullYear(),
			month = currentDate.getMonth() + 1,
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
	},

	activeTimeframe: function (signupDate) {
		//return timeframe for the user's active months
		//in other words, if the user signed up in May of 2016
		//this function will return 
		//{ start: {year:2016, month: 5}, end: {year:2017, month: 7} }

		let currentDate = new Date(Date.now()),
			dates = [signupDate, currentDate],
			keys = ['start', 'end'],
			timeframe = {};

		for (let i=0; i<dates.length; i++) {
			let typeOfDate = dates[i],
				currentKeys = keys[i],
				monthAndYear = {};

			//getting specific numbers for signupDate and currentDate...
			let year = typeOfDate.getFullYear(),
			month = typeOfDate.getMonth() + 1;

			monthAndYear = {
				year, 
				month
			};
			
			timeframe[currentKeys] = monthAndYear;
		}
		
		return timeframe;
	},

	monthsActive: function (timeframe) {
		//reutrn all of the months active in array 
		//of obj containting all of the months between 
		//the user's signup date and the current month

		let activeMonths = [];
		let endYear = timeframe.end.year,
			endMonth = timeframe.end.month;
		//might not work
		let startMonth = timeframe.start.month,
			startYear = timeframe.start.year;
		
		let i=startYear, iTwo=startMonth;
		while (i <= endYear ) {
			while (iTwo <= endMonth) {
				let monthAndYear = {
					year: iTwo,
					month: this.monthLookup(i)
				}
				activeMonths.unshift(monthAndYear);

				if (iTwo === 12) {
					iTwo = 1;
					i += 1;
				}				
				iTwo += 1;

			}
		}

		//get the amount of times you want to increment the counter


		// while(month !== endMonth+1 && year !== endYr) {
		// 	//Right here we need to look up the month and 
		// 	//then get the month acronym. Next, we get the year.
		// 	//After that, we add those two to an array .  

		// 	month = this.monthLookup(month);


		// 	monthAndYear = {
		// 		year, 
		// 		month
		// 	}

		// 	activeMonths.unshift(monthAndYear);

		// 	if (month === 12) {
		// 		month = 1;
		// 		year += 1;
		// 	}
		// 	else {
		// 		month  += 1;
		// 	}
		// }

		// return {endYr, endMonth, month, year};
	}	
}

module.exports = { userHelper };