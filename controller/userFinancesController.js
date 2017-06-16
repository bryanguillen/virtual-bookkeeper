const { FinancialProfile } = require('../model/financesModel');

financialProfileController ={ 
	getProfile: function (req, res) {
		//first we need to find the user via the user id
		//which is going to be provided from the params
		FinancialProfile
			.findOne({ 'user': req.params.userId }, function (err, profile) {
				if (err) {
					console.log(err);
					return res.json({ notFound: 'The page you are looking for does not exist' });
				}
				return profile;
			}) 
			.then(profile => {
				res.status(200).json(profile.apiRepr());
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			})
	}
}

module.exports = { financialProfileController };