const { User } = require('../model/userModel');

const userController = {
	getUser: function (req, res) { 
		User 
			.findById(req.params.userId, function (err, profile) { //beware using params
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}
				return profile
			})
			.then(profile => {
				res.status(200).json(profile.apiRepr());
			})
			.catch(err => {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			})
	},

	updateProfile: function (req, res) {
		//right here we are going to allow the user to update one field 
		//for now. 
		//so we take in a userId and then take in the field we want to update 
		//remember type checking and all of that. 
		let updatedFields = {};
		Object.keys(req.body).forEach(function (field) {
			if (field !== 'user' ) {
				updatedFields[field] = req.body[field];
			}
		})

		User
			.findByIdAndUpdate(req.params.userId, { $set: updatedFields }, function (err, profile) {
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}

				res.status(201).end();
			})
	}
} 

module.exports = { userController };