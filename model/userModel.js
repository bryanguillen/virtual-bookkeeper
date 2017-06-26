const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({ //schema or better yet, known as the structure of model
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	created_At: { type: Date, default: Date.now() },
	months: [{type: mongoose.Schema.Types.ObjectId, ref: 'Month'}]
});

userSchema.methods.profileAPIRepr = function(correctMonth) { //toalExp is the total for the month
	//all of the keys below contain relevant values for 
	//a user to see how they are doing on savings this month 
	//calculate relevant info for profile apiRepr 
	return {
		username: this.username,
		month: correctMonth
	}

}

userSchema.methods.signupAPIRepr = function () {
	return { //returns user apiRepr after signup
		username: this.username,
		email: this.email,
		created_At: this.created_At
	}
}

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema); //creates the User collection

module.exports = { User };