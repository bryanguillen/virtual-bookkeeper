const express = require('express');
const app = express();
const { router }  = require('./routes/routes');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const morgan = require('morgan'); //http logging middleware 

app.use(express.static('public')); //subject to change static files directory
app.use(morgan('common'));
app.use('/', router);

app.listen(3000, function () {
	console.log('Your app is now listening on port 3000!');
})