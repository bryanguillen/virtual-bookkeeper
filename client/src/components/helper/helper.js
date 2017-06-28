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

	fullMonth: function (month, bool) { //boolObj stands for an option false to just return acronym 
		if (bool) {
			let months = {
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
			return months[month]
		}

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
		// takes num and converts to string for building ui
		num += '';
		
		if (num.length === 2) {
			return '$0.' + num; 
		}

		if (num.length === 1) {
			return '$0.0' + num;
		} 

		return '$' + num.slice(0, -2) + '.' + num.slice(-2);
	},

	convertOnSubmission: function (amount) {
		//converts to a redable format for the native functions this.amountStringToNum

		let charArray = amount.split(''),
			numChars = [], //will hold chars to be joined in order to format. 
			stringNum;    

		if (charArray.includes('.')) {
			let decimalCount = 0,
				decimalIndex = null,
				validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '.'];
			for (let i=0; i<charArray.length; i++) {
				let char = charArray[i];
				if (char === '.') {
					decimalIndex = i,
					decimalCount += 1;
				}
				if (!validChars.includes(char)) { //just changed from charArray to validChars
					return false;
				}
				numChars.push(char);
			}

			if (decimalCount > 1) {
				return false //return false for wrong user input
			}

			stringNum = numChars.join();
			return this.amountStringToNum(stringNum);
		}

		
		for (let i=0; i<charArray.length; i++) {
			let char = charArray[i],
				validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
			if (!validChars.includes(char)) { //check for a dollar sign
				return false;
			}
			numChars.push(char);
		}
		let numString = numChars.join('');
		return this.amountStringToNum(numString + '.00');
	},

	amountStringToNum: function (numString) {
		//takes amount and transforms to num type for sending to db
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