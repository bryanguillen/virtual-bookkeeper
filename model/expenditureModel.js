const mongoose = require('mongoose');

const expenditureSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	amount: {type: Number, required: true}, //changed the amount type to number it was string 
	expenseName: {type: String, required: true},
	dateCreated: {type: Date, default: Date.now()}
})


expenditureSchema.methods.expenditureAPIRepr = function() {
	return {
		_id: this._id,
		user: this.user,
		amount: this.amount,
		expenseName: this.expenseName
	}
}

const Expenditure = mongoose.model('Expenditure', expenditureSchema);

module.exports = { Expenditure }