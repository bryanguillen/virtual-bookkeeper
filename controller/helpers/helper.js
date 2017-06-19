const userHelper = {
	dateLookup: function (month) {
		//month is an integer value repr 
		//the month
		const lookupTable = {
			'1': 31,
			'2': 28,
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