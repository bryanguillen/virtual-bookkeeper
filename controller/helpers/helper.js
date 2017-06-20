const userHelper = {
	dateLookup: function (month, year) {
		
		//calculate whether current year is a leap year
		if (month === '2') {
            if ((year % 4 == 0) && (year % 100 != 0) || year % 400 == 0) {
            	lookupTable['2'] = 29;
            }
            lookupTable['2'] = 28;
		}
		
		//numbers are for the month
		const lookupTable = {
			'1': 31,
			'3': 31,
			'4': 30,
			'5': 31,
			'6': 30,
			'7': 31,
			'8': 31,
			'9': 30,
			'10': 31,
			'11': 30,
			'12': 31
		}
		return lookupTable[month];
	}
}

module.exports = { userHelper };