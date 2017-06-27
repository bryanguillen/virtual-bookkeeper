const mongoose = require('mongoose');

const monthlySchema = mongoose.Schema({ 
	//numbers will be added in pennies.. Avoid rounding errors
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	month: { type: String, required: true },
	year: { type: Number, required: true },
	income: { type: Number, default: 0 },
	expenses: { type: Number, default: 0 },
	netIncome: { type: Number, default: 0 },
	goal: { type: Number, default: 0 },
	expenditures: [{ expenseName: String, amount: Number }]
});

monthlySchema.methods.monthlyAPIRepr = function() { 
	return {
		user: this.user, 
		month: this.month,
		year: this.year, 
		income: this.income, 
		expenses: this.expenses,
		netIncome: this.netIncome,
		goal: this.goal,
		expenditures: this.expenditures
	}
}

const Month = mongoose.model('Month', monthlySchema);

module.exports = { Month };
