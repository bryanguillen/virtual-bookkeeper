const { User } = require('../model/userModel');
const { Expenditure } = require('../model/expenditureModel');
const { userHelper } = require('./helpers/helper'); //keep an eye on the memory leak warning

const userController = {
	getProfile: function (req, res) { 
		//temporary way of doing this. 
		let currentTime = new Date(Date.now()),
			year = currentTime.getFullYear(),
			month = currentTime.getMonth() + 1;

		let lastDay = userHelper.dateLookup(month.toString());

		if (month < 10) {
			month = '0' + month;
		}

		let beginMonth = year + '/' + month + '/01',
			endMonth = year + '/' + month + '/' + lastDay;

		let query = { 
						user: req.params.userId, 
						dateCreated: { 
							$gte: new Date(beginMonth), 
							$lt: new Date(endMonth) 
						} 
					};
		Expenditure
			.find(query, function (err, docs) {
				if (err) {
					res.status(500).json({ errorMessage: 'Inernal Server Error' });
				} 
				return docs;
			})
			.then(docs => {
				let formattedDocs = [];
				for (let i=0, length=docs.length; i<docs.length; i++) {
					let currentDoc = docs[i];
					formattedDocs.push(currentDoc.expenditureAPIRepr());
				}
				return formattedDocs;
			})
			.then(formattedDocs => {
				User
					.findById(req.params.userId)
					.populate('expenditures')
					.exec(function (err, profile) {
						if (err) {
							res.status(500).json({ errorMessage: 'Inernal Server Error' });
						}
						res.status(200).json(profile.profileAPIRepr(formattedDocs));
					})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ errorMessage: 'Internal Server Error' });
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

module.exports = { userController };