const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({ //schema or better yet, known as the structure of model
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	totalSaved: { type: Number, default: 0 },
	monthlyIncome: { type: Number, default: 0 },
	monthlyGoal: { type: Number, default: 0 },
	months: [{type: mongoose.Schema.Types.ObjectId, ref: 'Expenditure'}],
	created_At: { type: Date, default: Date.now() }
});

userSchema.methods.profileAPIRepr = function(formattedDocs, totalExp) { //toalExp is the total for the month
	//all of the keys below contain relevant values for 
	//a user to see how they are doing on savings this month 
	//calculate relevant info for profile apiRepr 
	return {
		username: this.username,
		created_At: this.created_At,
		totalSaved: this.totalSaved,
		monthlyIncome: this.monthlyIncome,
		monthlySpend: totalExp,
		monthlyGoal: this.monthlyGoal, 
		expenditures: formattedDocs
	}

}

userSchema.methods.signupAPIRepr = function () {
	return { //returns user apiRepr after signup
		username: this.username,
		created_At: this.created_At,
		email: this.email
	}
}

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema); //creates the User collection

module.exports = { User };