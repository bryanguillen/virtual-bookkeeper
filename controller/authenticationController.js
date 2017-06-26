const { User } = require('../model/userModel');

authenticationController = {
	createNewUser: function (req, res) {
		if(!req.body) {
	 		return res.status(400).json({ errorMessage: "Your request is empty and invalid." })
		}
		
		let userSubmission = Object.keys(req.body);
		let requiredKeys = ['username', 'password', 'email']; //required keys for req.body 

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
		
		//.hasPassword returns a promise so what we have to do here is
		//have a single then callback that way we do not get the 
		//error: 'can't set headers after res'.
		return User
				.hashPassword(password)
				.then((hash) => {
					User
						.find({ username })
						.count()
						.exec(function (err, count) {
							if (err) {
								return res.status(500).json({ errorMessage: 'Internal Server Error' });
							}
							return count
						})
						.then(count => {
				
							if(count>0) {
								return res.status(422).json({ errorMessage: 'User Already Exists' });
							}

							let newUser = new User ({
								email: email,
								username: username, 
								password: hash,
								created_At: created_At,
								months: []
							});
				
							newUser.save(function(err, user) {
								if (err) {
									return res.status(500).json({ errorMessage: 'Internal Server Error' });
								}
								res.status(201).json(user.profileAPIRepr()); //right here you going to have account created successfully.
							});
						})
			}) 
	}
}

module.exports = { authenticationController }