const express = require('express');
const router = express.Router();
const { authenticationController } = require('../controller/authenticationController');
const { userProfileController } = require('../controller/userProfileController');
const { monthlyController } = require('../controller/monthlyController');

//authentication
router.post('/users/new', authenticationController.createNewUser); 

//user authenticated endpoints
router.get('/users/:userId', userProfileController.getProfile);
router.put('/users/:userId/finances', userProfileController.updateProfile);

//monthly endpoints
router.get('/users/:userId/:month/:year', monthlyController.getMonthlyRecord);
router.post('/users/:userId/new-month', monthlyController.createMonthlyRecord);
router.put('/users/:userId/:month/:year', monthlyController.updateMonthlyRecord);
router.put('/users/:userId/:month/:year/new-expenditure', monthlyController.addNewExpenditure);
router.put('/users/:userId/:month/:year/:expenditureId', monthlyController.updateExpenditure);
router.delete('/users/:userId/:month/:year/:expenditureId', monthlyController.deleteExpenditure);

module.exports = { router };