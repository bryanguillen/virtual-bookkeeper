const { Month } = require('../model/monthlyModel');
const { User } = require('../model/userModel');
const { controllerHelper } = require('./helpers/helper');

//HOW TO TEST FOR A USER THAT DOES NOT EXIST? and also, type checking

const monthlyController = {
	getMonthlyRecord: function (req, res) {
		let reqParams = req.params,
			user = reqParams.userId,
			month = reqParams.month,
			year = reqParams.year;

		//get a single record
		Month
			.findOne({ user, month, year }, function (err, record) {
				if (err) {
					return res.status(500).json({ errorMessage: 'Internal Server Error' })
				}
				return record;
			})
			.then(record => {
				res.status(200).json(record.monthlyAPIRepr());
			})

	},

	createMonthlyRecord: function (req, res) {
		//create the current month in question for the user in question
		let currentDate = controllerHelper.getCurrentMonth(),
			year = currentDate.year,
			month = currentDate.month, //removed toLowerCase ************* 
			user = req.params.userId;

		let newMonth = new Month ({
			user,
			month,
			year,
			expenditures: [] 
		})

		if ( typeof year !== 'number' || typeof month !== 'string' ) {
			return res.status(400).json({ errorMessage: 'Bad request!' });
		}

		//first protect against another month submission for the same user and then save that month and return it
		Month
			.find({ user, month, year })
			.count()
			.exec(function (err, count) {
				if (err) {
					return res.status(500).json({ errorMessage: 'Internal Server Error' });
				}

				return count;
			})
			.then(count => {
				if ( count > 0 ) {
					return res.status(400).json({ errorMessage: 'Month Already Exists' });
				}

				newMonth.save(function (err, month) {
					if (err) {
						console.log(err);
						return res.status(500).json({ errorMessage: 'Internal Server Error' });
					}	
					return month
				})
				.then(month => {
					User
						.findByIdAndUpdate(
							req.params.userId, 
							{ $push: { months: month } },
							{ new: true },
							function (err, user) {
								if (err) {
									return res.status(500).json({ errorMessage: 'Internal Server Error' })
								}
								res.status(201).json(user.profileAPIRepr(month))
							}
						)
				})
			})
	},

	updateMonthlyRecord: function (req, res) {
		let reqBody = req.body,
			user = reqBody.user, 
			month = reqBody.month, 
			year = reqBody.year,
			updatedFields = {},
			mutableFields = ['income', 'goal'],
			submittedKeys = Object.keys(req.body),
			dynamicUpdate = false;//dynamic because this tests for a netIncome Update.
		
		submittedKeys.forEach(function (field) {
			if (mutableFields.includes(field)) {
				updatedFields[field] = req.body[field];
				if (field === 'income') {
					dynamicUpdate = true;
				}
			}
		})

		Month 
			.findOneAndUpdate(
				{ 
					user, month, year 
				},
				{ $set: updatedFields },
				{ new: true },
				function (err, month) {
					if (err) {
						return res.status(500).json({ errorMessage: 'Internal Server Error' })
					}

					if (dynamicUpdate) { 
						month.netIncome = month.income - month.expenses;
						month.save(function (err, updatedMonth) {
							if (err) {
								console.log(err);
								return res.status(500).json({ errorMessage: 'Internal Server Error' });
							}
							return res.status(204).end();
						})
					}
					res.status(204).end();
				}
			)
	},

	addNewExpenditure: function (req, res) { 
		let requiredKeys = ['user', 'expenseName', 'amount', 'month', 'year'],
			reqBody = req.body,
			submittedKeys = Object.keys(reqBody);

		for (let i=0; i<requiredKeys.length; i++) {
			let currentKey = requiredKeys[i];
			if (!submittedKeys.includes(currentKey)) {
				return res.status(400).json({ errorMessage: 'You are missing ' + currentKey });
			}
		}

		let user = reqBody.user, 
			newExpenditure = {
				expenseName: reqBody.expenseName,
				amount: reqBody.amount //newly added
			},
			month = reqBody.month,
			year = reqBody.year,
			increaseExpenses = newExpenditure.amount,
			decreaseIncome = -Math.abs(newExpenditure.amount);

		Month 
			.findOneAndUpdate(
				{ user, month, year }, 
				{ 
					$push:  { expenditures: newExpenditure },
					$inc: { expenses: increaseExpenses } 

				},
				{ new: true },
				function (err, month) {
					if (err) {
						console.log(err.message);
						return res.status(500).json({ errorMessage: 'Internal Server Error' })
					}
					console.log(month.income);
					month.netIncome = month.income - month.expenses;
					month.save(function (err, updatedMonth) {
						if (err) {
							console.log(err.message);
							return res.status(500).json({ errorMessage: 'Internal Server Error' })
						}
						res.status(204).end();
					})
				}
			)

	},

	updateExpenditure: function (req, res) {
		//first we need to find the doc.. then 
		//we need to update it. By doc, we mean find, 
		//the main doc, then the expenditure.. 
		let reqBody = req.body,
			submittedKeys = Object.keys(reqBody), 
			updatedFields = {},
			user = reqBody.user,
			month = reqBody.month, 
			year = reqBody.year;

		let requiredKeys = ['user', 'month', 'year'];

		for (let i=0; i<requiredKeys.length; i++) {
			let currentKey = requiredKeys[i];
			if (!submittedKeys.includes(currentKey)) {
				return res.status(400).json({ errorMessage: 'You are missing ' + currentKey })
			}
		}
		
		submittedKeys.forEach(function (field) {		
			if (field === 'amount' || field === 'expenseName') {
				let positionalOperation = 'expenditures.$.' + field ;
				updatedFields[positionalOperation] = reqBody[field];
			}
		})
		
		Month
			.findOneAndUpdate(
				{ 
					user, 
					month, 
					year, 
					'expenditures._id': req.params.expenditureId //Added to find the right embedded doc
				},
				{ $set: updatedFields }, 
				{ new: true },
				function (err, month) {
					if (err) {
						return res.status(500).json({ errorMessage: 'Internal Server Error' })
					}

					let newTotalExp = 0; //new total expenses after updating expenditure
					for (let i=0, length=month.expenditures.length; i<length; i++) {
						let expenditure = month.expenditures[i];
						newTotalExp += expenditure.amount;
					} 
					month.expenses = newTotalExp;
					month.netIncome = month.income - month.expenses;
					month.save(function (err, updatedMonth) {
						if (err) {
							console.log(err.message);
							return res.status(500).json({ errorMessage: 'Internal Server Error' });
						}
						res.status(204).end();						
					})
				}
			) 
	},

	deleteExpenditure: function (req, res) {
		//so first you want to find the right expenditure like you did above, and
		//then remove that one by using pull.
		let reqBody = req.body,
			submittedKeys = Object.keys(reqBody), 
			deletedExpenditure = {},
			deleteQuery = { expenditures: deletedExpenditure },
			user = reqBody.user,
			month = reqBody.month, 
			year = reqBody.year,
			requiredKeys = ['user', 'month', 'year'];

		for (let i=0; i<requiredKeys.length; i++) {
			let currentKey = requiredKeys[i];
			if (!submittedKeys.includes(currentKey)) {
				return res.status(400).json({ errorMessage: 'You are missing ' + currentKey })
			}
		}

		//do not need required keys nor the id to delete it. just the expenseName and amount
		submittedKeys.forEach(function (field) {		
			if (field === 'amount' || field === 'expenseName') { 
				deletedExpenditure[field] = reqBody[field];
			}
		})

		Month
			.findOneAndUpdate(
				{ 
					user, 
					month, 
					year,
					'expenditures._id': req.params.expenditureId
				},
				{ $pull: deleteQuery }, 
				{ new: true },
				function (err, month) {
					if (err) {
						console.log(err.message);
						return res.status(500).json({ errorMessage: 'Internal Server Error' })
					}
					let newTotalExp = 0; //new total expenses after deleting expenditure
					for (let i=0, length=month.expenditures.length; i<length; i++) {
						let expenditure = month.expenditures[i];
						newTotalExp += expenditure.amount;
					} 
					month.expenses = newTotalExp;
					month.netIncome = month.income - month.expenses;
					month.save(function (err, updatedMonth) {
						if (err) {
							console.log(err.message);
							return res.status(500).json({ errorMessage: 'Internal Server Error' });
						}
						console.log(updatedMonth);
						res.status(204).end();						
					})
				}
			)
	}
}

module.exports = { monthlyController };