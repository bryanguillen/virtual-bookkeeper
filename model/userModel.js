const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({ //schema or better yet, known as the structure of model
	username: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	totalSaved: { type: Number, default: 0 },
	monthlyIncome: { type: Number, default: 0 },
	expenditures: [{type: mongoose.Schema.Types.ObjectId, ref: 'Expenditure'}]
});

userProfileSchema.methods.apiRepr = function() {
	//schema method for returning a json representation
	//of only the information that is going to be relevant
	return {
		username: this.username,
		totalSaved: this.totalSaved,
		monthlyIncome: this.monthlyIncome,
		expenditures: this.expenditures
	}
}

const User = mongoose.model('User', userProfileSchema); //creates the User collection

module.exports = { User };