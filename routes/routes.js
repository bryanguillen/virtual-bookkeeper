const express = require('express');
const router = express.Router();
const { userProfileController } = require('../controller/userProfileController');
const { expenditureController } = require('../controller/expenditureController');
const { authenticationController } = require('../controller/authenticationController');

//user profile routes
router.post('/users/new', authenticationController.createNewUser); 
router.get('/users/:userId', userProfileController.getProfile);
router.put('/users/:userId/finances', userProfileController.updateProfile);
router.get('/users/:userId/history', userProfileController.getProfileHistory);

//expenditure routes
router.get('/users/:userId/expenditures/:expenditureId', expenditureController.getExpenditure);
router.post('/users/:userId/expenditures', expenditureController.createExpenditure);
router.put('/users/:userId/expenditures/:expenditureId', expenditureController.updateExpenditure);
router.delete('/users/:userId/expenditures/:expenditureId', expenditureController.deleteExpenditure);

module.exports = { router };