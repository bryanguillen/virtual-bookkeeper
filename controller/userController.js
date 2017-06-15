const { User } = require('../model/userModel');

const userController = {
	getUser: function (req, res) { 
	//find the user by the id and then 
	//send it. 
	User 
		.findById(req.params.userId, function (err, user) {
			if (err) {
				console.log(err);
				res.json({ userNotFound: 'User does not exist in system' });
			}
			return user
		})
		.then(user => {
			res.status(200).json(user.apiRepr());
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Oops! Something went wrong!' });
		})
	}
} 

module.exports = { userController };