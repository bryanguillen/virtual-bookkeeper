const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //schema or better yet, known as the structure of model
	username: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true}
});

userSchema.methods.apiRepr = function() {
	//schema method for returning a json representation
	//of only the information that is going to be relevant
	return {
		id: this._id,
		username: this.username
	}
}

const User = mongoose.model('User', userSchema); //creates the User collection

module.exports = { User };