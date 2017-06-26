const mongoose = require('mongoose');

const monthlySchema = mongoose.Schema({ 
	//the information that we need: the month, 
	//year, expenditures, amount saved, total expenses for month 
	//and income. On top of that, the user which owns that monthly
	//db entity. 
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	month: { type: Number, required: true },
	year: { type: Number, required: true },
	income: { type: Number, default: 0 },
	expense: { type: Number, default: 0 },
	netIncome: { type: Number, default: 0 },
	goal: { type: Number, default: 0 },
	expenditures: [{  expenseName: String, amount: Number }]
});

monthlySchema.methods.monthlyAPIRepr = function() { 
	return {
		user: this.user, 
		month: this.month. 
		year: this.month, 
		income: this.income, 
		expense: this.expense,
		netIncome: this.netIncome,
		goal: this.goal,
		expenditures: this.expenditures
	}
}

const Month = mongoose.model('Month', monthlySchema);

module.exports = { Month };
