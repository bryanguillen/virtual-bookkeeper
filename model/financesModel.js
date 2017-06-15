const mongoose = require('mongoose');

const financialProfileSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	totalSaved: { type: Number, required: true, default: 0 },
	monthlyIncome: { type: Number, required: true },
	expenditures: [{ amount: Number, expenseName: String, createdAt: Date }]
});

financialProfileSchema.methods.apiRepr = function() {
	return {
		user: this.user,
		totalSaved: this.totalSaved,
		monthlyIncome: this.monthlyIncome,
		expenditures: this.expenditures
	}
}


const FinancialProfile = mongoose.model('FinancialProfile', financialProfileSchema);

module.exports = { FinancialProfile };