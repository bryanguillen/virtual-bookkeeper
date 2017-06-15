const express = require('express');
const router = express.Router();
const { userController } = require('../controller/userController');

//routes

//user routes
router.get('/users/:userId', userController.getUser);

//financial profile routes


module.exports = { router };