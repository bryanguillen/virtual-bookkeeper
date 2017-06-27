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

	fullMonthAcronym: function (month) {
		let months = {
			'January': 'jan',
			'February': 'feb',
			'March': 'mar',
			'April': 'apr',
			'May': 'may',
			'June': 'jun',
			'July': 'jul',
			'August': 'aug',
			'September': 'sep',
			'October': 'oct',
			'November': 'nov',
			'December': 'dec'	
		}
		return months[month];
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

	convertOnChange: function (amount) {
		let charArray = amount.split(''),
			decimalCount = 0,
			validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '.'];

		for (let i=0; i<charArray.length; i++) {
			let char = charArray[i];
			
			if (!validChars.includes(char)) { //check for a dollar sign
				return false;
			}

			if (char === '.') {
				decimalCount += 1;
			}
		}

		if (decimalCount > 1) {
			return false 
		}

		if (decimalCount === 0) {
			return this.amountStringToNum(amount + '.00');
		}

		return this.amountStringToNum(amount);
	},

	amountStringToNum: function (numString) {
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