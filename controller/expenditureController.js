const { Expenditure } = require('../model/expenditureModel');
const { User } = require('../model/userModel');

//some things to note. 
//What happens when the expenditure does not exists?
//what happens when you try to submit false information?
//what happens 

const expenditureController =  {
	getExpenditure: function (req, res) {
		Expenditure
			.findById(req.params.expenditureId, function (err, expenditure) { //this is using params for now	
				if (err) {
					res.status(500).json({ errorMessage: 'Internl Server Error' });
				}
				res.status(200).json(expenditure.apiRepr());
			})
	},

	//create expenditure 
	createExpenditure: function (req, res) {
		//must take in some new information from the user
		//then take all of that information and then create it. 
		let newExpenditure = new Expenditure ({
			'user': req.body.user,
			'amount': req.body.amount,
			'expenseName': req.body.expenseName
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
			res.status(500).json({ errorMessage: 'Oops, you are missing the user id' });
		}

		//one thing to make sure is that if the type of input is supposed to be int, 
		//then test for that.. but do that later. 
		Object.keys(req.body).forEach(function (field) {
			if (field !== 'user') {
				updatedFields[field] = req.body[field];
			}
		})

		Expenditure 
			.findByIdAndUpdate(req.body.id, { $set: updatedFields }, function (err) {
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}

				res.status(201).end();
			})
	},

	deleteExpenditure: function (req, res) {
		//find out which one you want to delete. 
		// how are we going to know? Well first we have to find it. 
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
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				}
			})
	}
}

module.exports = { expenditureController }