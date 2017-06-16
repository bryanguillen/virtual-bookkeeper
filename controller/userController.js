const { User } = require('../model/userModel');

const userController = {
	getUser: function (req, res) { 
	//find the user by the id and then 
	//send it. 
	User 
		.findById(req.params.userId, function (err, user) {
			if (err) {
				return res.status(400).end('Bad Request');
			}
			return user
		})
		.then(user => {
			res.status(200).json(user.apiRepr());
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Internal Server Error' });
		})
	}
} 

module.exports = { userController };