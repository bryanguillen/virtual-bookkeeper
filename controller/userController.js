const { User } = require('../model/userModel');

const userController = {
	getProfile: function (req, res) { 
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
		let updatedFields = {};

		Object.keys(req.body).forEach(function (field) {
			updatedFields[field] = req.body[field];
		})

		User
			.findByIdAndUpdate(req.params.userId, { $set: updatedFields }, function (err, profile) {
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}

				res.status(204).end();
			})
	}
} 

module.exports = { userController };