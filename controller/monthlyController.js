const { Month } = require('../model/monthlyModel');
const { User } = require('../model/userModel');
const { controllerHelper } = require('./helpers/helper');

const monthlyController = {
	createMonthlyRecord: function (req, res) {
		//create the current month in question for the user in question
		let currentDate = controllerHelper.getCurrentMonth(),
			year = currentDate.year,
			month = currentDate.month,
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
	}
}

module.exports = { monthlyController };