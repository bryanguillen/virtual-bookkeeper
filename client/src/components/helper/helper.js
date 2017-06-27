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
	},

	convertUserInput: function (input) {
		let validValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
		if (validValues.includes(input)) {
			console.log(input.length);
			if (input.length === 1) {
				return '0.0' + input
			}

			if (input.length === 2) {
				return '0.' + input
			}

			if (input.legnth > 2) {
				let firstHalf =  input.slice(0, -3),
					secondHalf =  input.slice(-2);
				return firstHalf + '.' + secondHalf;
			}
 		}
	},

	numToStringDollar: function (num) {
		num += '';
		
		if (num.length === 2) {
			return '$0.' + num; 
		}

		if (num.length === 1) {
			return '$0.0' + num;
		} 

		return '$' + num.slice(0, -2) + '.' + num.slice(-2);
	},

	dollarStringToNum: function (numString) {
		let numStringChars = numString.split(''),
			pennyString = '',
			listNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
		for (let i=0; i<numStringChars.length; i++) {
			let currentChar = numStringChars[i];
			if (listNums.includes(currentChar)) {
				pennyString += currentChar;
			}
		}
		return parseInt(pennyString, 10);	
	}
}

export default componentHelper;