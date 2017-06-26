const { User } = require('../model/userModel');

authenticationController = {
	createNewUser: function (req, res) {
		if(!req.body) {
	 		return res.status(400).json({ errorMessage: "Your request is empty and invalid." })
		}
		
		let userSubmission = Object.keys(req.body);
		let requiredKeys = ['username', 'password', 'email', 'months']; //required keys for req.body 

		for (let i=0; i<requiredKeys.length; i++) {
			let currentKey = requiredKeys[i];
			if (!userSubmission.includes(currentKey)) { //check if all of the keys are included in req.body
				res.status(400).json({ errorMessage: `You are missing ${requiredKeys[i]}` });
			}
		}

		Object.keys(req.body).forEach(function(field) {
			let submittedValue = req.body[field];
			if(typeof submittedValue === 'string' && submittedValue.trim() === '') {
				return res.status(422).json({ errorMessage: 'Invalid length, must be larger than one character.' });
			} 
		})
		
		let { username, email, password, created_At } = req.body;

		email = email.trim().toLowerCase(); 
		username = username.trim().toLowerCase();
		password = password.trim();
		

		//next check if user exists then create if it does not exist. 
		return User
				.find({ username })
				.count()
				.exec(function (err, count) {
					if (err, count) {
						console.log(err);
						res.status(500).json({ errorMessage: 'Internal Server Error' });
					}

					if(count>0) {
						res.status(422).json({ errorMessage: 'User already exists!' });
					}
					return User.hashPassword(password);
				})
				.then(hash => {
					let newUser = new User ({
						email: email,
						username: username, 
						password: hash,
						created_At: created_At,
						months: []
					});

					newUser.save(function(err, user) {
						if (err) {
							console.log(err);
							res.status(500).json({ errorMessage: 'Internal Server Error' });
						}
						User
	   	 					.find(user.username)
	   	 					.then(res.status(201).json(user.signupAPIRepr()))
	   	 					.catch(err => {
	   	 						console.log(err);
	   	 						res.status(500).json({ errorMessage: 'Internal Server Error' });
	   	 					})
					});
				})
				.catch( err => {
					console.log(err);
					res.json({ errorMessage: 'Internal Server Error' });
				})
	}
}

module.exports = { authenticationController }