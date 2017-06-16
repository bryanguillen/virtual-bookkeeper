const express = require('express');
const router = express.Router();
const { userController } = require('../controller/userController');
const { financialProfileController } = require('../controller/userFinancesController');

//user routes
router.get('/users/:userId', userController.getUser);

//financial profile routes
router.get('/users/:userId/finances', financialProfileController.getProfile);

module.exports = { router };