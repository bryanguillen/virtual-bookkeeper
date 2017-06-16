const mongoose = require('mongoose');

const expenditureSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	amount: {type: String, required: true},
	expenseName: {type: String, required: true}
})


expenditureSchema.methods.apiRepr = function() {
	return {
		user: this.user,
		amount: this.amount,
		expenseName: this.expenseName
	}
}

const Expenditure = mongoose.model('Expenditure', expenditureSchema);

module.exports = { Expenditure }