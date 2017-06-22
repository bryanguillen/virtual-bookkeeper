const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({ //schema or better yet, known as the structure of model
	username: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	totalSaved: { type: Number, default: 0 },
	monthlyIncome: { type: Number, default: 0 },
	expenditures: [{type: mongoose.Schema.Types.ObjectId, ref: 'Expenditure'}]
});

userProfileSchema.methods.profileAPIRepr = function(formattedDocs, totalExp) { //toalExp is the total for the month
	//all of the keys below contain relevant values for 
	//a user to see how they are doing on savings this month 
	//calculate relevant info for profile apiRepr
	let netIncome = this.monthlyIncome - totalExp; 
	
	return {
		username: this.username,
		totalSaved: this.totalSaved,
		monthlyIncome: this.monthlyIncome,
		monthlySpend: totalExp,
		netIncome, //newly added
		expenditures: formattedDocs
	}

}

const User = mongoose.model('User', userProfileSchema); //creates the User collection

module.exports = { User };