const { User } = require('../model/userModel');
const { Month } = require('../model/monthlyModel');
const { monthlyController } = require('./monthlyController');
const { controllerHelper } = require('./helpers/helper'); //keep an eye on the memory leak warning

const userProfileController = {
	getProfile: function (req, res) {  
		User 
			.findById(req.params.userId)
			.populate('months')
			.exec(function (err, user) {
				if (err) {
					return res.status(500).json({ errorMessage: 'Internal Server Error' });
				}
				return user; 
			})
			.then(user => {
				let months = user.months,
			 		correctMonth = null, //month to be represented with user.profileAPIRepr() 
					currentDate = controllerHelper.getCurrentMonth(),
					year = currentDate.year,
					month = currentDate.month; 
				
				for (let i=0, length=months.length; i<length; i++) {
					let idx = months[i],
						monthAtIdx = idx.month, 
						yearAtIdx = idx.year;

					if (monthAtIdx === month && yearAtIdx === year) {
						correctMonth = idx;
						break;
					}
				}

				if (correctMonth === null) {
					return monthlyController.createMonthlyRecord(req, res);
				}

				res.status(200).json(user.profileAPIRepr(correctMonth));
			})
			.catch(err => {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			})
	},

	getHistory: function (req, res) {
		User
			.findById(req.params.userId)
			.populate('months')
			.exec(function (err, user) {
				if (err) {
					console.log(err.message);
					return res.status(500).json({ errorMessage: 'Internal Server Error' });
				}
				return user;
			})
			.then(user => {
				let months = user.months,
					formattedMonths = [];//formmatted months to give a user to check all history
				for (let i=0, length=months.length; i<length; i++) {
					let currentIdx = months[i],
						month = controllerHelper.fullMonthLookup(currentIdx.month)
						year = currentIdx.year;
					formattedMonths.unshift({ month, year }); //sort for more recent months
				}
				res.status(200).json(formattedMonths);
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

module.exports = { userProfileController };