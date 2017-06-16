const { FinancialProfile } = require('../model/financesModel');
const { User } = require('../model/userModel');

financialProfileController ={ 
	getProfile: function (req, res) {
		FinancialProfile
			.findOne({ 'user': req.params.userId }, function (err, profile) {
				if (err) {
					return res.status(400).end('Bad Request');
				}
				return profile;
			}) 
			.then(profile => {
				res.status(200).json(profile.apiRepr());
			})
			.catch(err => {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			})
	},

	createProfile: function (req, res) {
		if (!req.body) {
			return res.status(400).json({ errorMessage: 'Must include a request body!' })
		}

		let newProfile = new FinancialProfile ({
			'user': req.body.user,
			'totalSaved': req.body.totalSaved,
			'monthlyIncome': req.body.monthlyIncome,
			'expenditures': req.body.expenditures
		})

		User 
			.findById(req.body.user, function (err, user) {
				if (err) {
					res.status(400).end('User Does Not Exist');					
				}
			})

		newProfile.save(function (err, profile) {
			if (err) {
				res.status(500).end('Internal Server Error');
			}

			try { //handling the async flow for now. 
				res.status(201).json(profile.apiRepr());
			}
			catch(err) {
				res.status(500).end('Internal Server Error');
			}
		})
	}
}

module.exports = { financialProfileController };