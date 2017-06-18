const { Expenditure } = require('../model/expenditureModel');
const { User } = require('../model/userModel');

//What happens when the expenditure does not exists?
//what happens when you try to submit false information?

const expenditureController =  {
	getExpenditure: function (req, res) {
		Expenditure
			.findById(req.params.expenditureId, function (err, expenditure) { //this is using params for now	
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}
				
				res.status(200).json(expenditure.apiRepr());					
			})
	},

	createExpenditure: function (req, res) {
		let userSubmission = Object.keys(req.body);
		let requiredKeys = ['user', 'amount', 'expenseName']; //required keys 
		
		for (let i=0; i<requiredKeys.length; i++) {
			let currentKey = requiredKeys[i];
			if (!userSubmission.includes(currentKey)) { //check if all of the keys are included in req.body
				res.json({ errorMessage: `You are missing ${requiredKeys[i]}` });
			}
		}

		let newExpenditure = new Expenditure ({
			'user': req.body.user,
			'amount': req.body.amount,
			'expenseName': req.body.expenseName.trim() //remove white space //^^NEWLY ADDED!
		})

		//so after we have that new guy ... we just need to take him and save him. 
		newExpenditure.save(function (err, expenditure) {
			if (err) {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			}

			User
				.findByIdAndUpdate(req.body.user, { $push : { expenditures: expenditure._id } }, function (err) {
					if (err) {
						res.status(500).json({ errorMessage: 'Internal Server Error' });
					}

					res.status(201).json(expenditure.apiRepr());
				})
		})
	},

	updateExpenditure: function (req, res) {
		let updatedFields = {};
		
		if (!req.body.user || !req.body.id) {
			res.status(400).json({ errorMessage: 'Oops, you are missing the id' });
		}

		Object.keys(req.body).forEach(function (field) {
			if (field !== 'user' || field !== 'id') {
				updatedFields[field] = req.body[field];
			}
		})

		Expenditure 
			.findByIdAndUpdate(req.body.id, { $set: updatedFields }, function (err) {
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}

				res.status(204).end();
			})
	},

	deleteExpenditure: function (req, res) { 
		Expenditure 
			.findByIdAndRemove(req.body.id, function (err) {
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}
			})
			.then(() => {
				User
					.findByIdAndUpdate(req.body.user, { $pull: {  'expenditures': req.body.id } }, function (err) {
						if (err) {
							res.status(500).json({ errorMessage: 'Internal Server Error' });
						}

						res.status(201).end();
					})
			})
			.catch(err => {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			})
	}
}

module.exports = { expenditureController }