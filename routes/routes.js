const express = require('express');
const router = express.Router();
const { userProfileController } = require('../controller/userProfileController');
const { authenticationController } = require('../controller/authenticationController');
const { monthlyController } = require('../controller/monthlyController');

//user profile routes
router.post('/users/new', authenticationController.createNewUser); 
router.get('/users/:userId', userProfileController.getProfile);
router.put('/users/:userId/finances', userProfileController.updateProfile);
router.get('/users/:userId/history', userProfileController.getProfileHistory);

router.post('/users/:userId/new-month', monthlyController.createMonthlyRecord);

module.exports = { router };