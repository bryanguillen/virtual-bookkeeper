const express = require('express');
const router = express.Router();
const { userController } = require('../controller/userController');
const { expenditureController } = require('../controller/expenditureController');

//user routes
router.get('/users/:userId', userController.getUser);
router.put('/users/:userId/finances', userController.updateProfile);

//expenditure routes
router.get('/users/:userId/expenditures/:expenditureId', expenditureController.getExpenditure);
router.post('/users/:userId/expenditures', expenditureController.createExpenditure);
router.put('/users/:userId/expenditures/:expenditureId', expenditureController.updateExpenditure);
router.delete('/users/:userId/expenditures/:expenditureId', expenditureController.deleteExpenditure);

module.exports = { router };