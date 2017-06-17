const { User } = require('../model/userModel');

const userController = {
	getUser: function (req, res) { 
		User 
			.findById(req.params.userId, function (err, profile) { //beware using params
				if (err) {
					res.status(400).json('Bad Request');
				}
				return profile
			})
			.then(profile => {
				res.status(200).json(profile.apiRepr());
			})
			.catch(err => {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			})
	}
} 

module.exports = { userController };