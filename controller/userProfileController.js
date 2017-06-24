const { User } = require('../model/userModel');
const { Expenditure } = require('../model/expenditureModel');
const { userHelper } = require('./helpers/helper'); //keep an eye on the memory leak warning

const userProfileController = {
	getProfile: function (req, res) {  
		let queryDates = userHelper.getQueryDates();

		let query = { 
						user: req.params.userId, 
						dateCreated: { 
							$gte: new Date(queryDates.beginDate), 
							$lt: new Date(queryDates.endDate) 
						} 
					};
		Expenditure
			.find(query, function (err, docs) {
				if (err) {
					res.status(500).json({ errorMessage: 'Internal Server Error' });
				} 
				return docs;
			})
			.then(docs => {
				let docAdditions = {};//obj holding docs with monthly expenses and total
				//expense for the month will be added to docAdditions
				let formattedDocs = [],
				    totalExp = 0; 
				for (let i=0, length=docs.length; i<length; i++) {
					let currentDoc = docs[i];
					totalExp += currentDoc.amount; 
					formattedDocs.push(currentDoc.expenditureAPIRepr());
				}
				docAdditions = { totalExp, formattedDocs };
				return docAdditions;
			})
			.then(docAdditions => {
				User
					.findById(req.params.userId)
					.populate('expenditures')
					.exec(function (err, profile) {
						if (err) {
							res.status(500).json({ errorMessage: 'Internal Server Error' });
						}
						res.status(200).json(profile.profileAPIRepr(docAdditions.formattedDocs, docAdditions.totalExp));
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

module.exports = { userProfileController };