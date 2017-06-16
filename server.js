const express = require('express');
const app = express();
const { router }  = require('./routes/routes');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const morgan = require('morgan'); //http logging middleware 

app.use(morgan('common'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); //subject to change static files directory
app.use('/', router);

function runServer () {
	return new Promise((resolve, reject) => { 
		mongoose.connect('mongodb://localhost/vb_app_test', err => {
			if(err) {
				console.log(err);
				return reject(err);
			}
		})
		server = app.listen(process.env.PORT || 3000, function() {
			//this uri is going to change below to a parameter instead
			console.log(`Your application is listening on port 3000 and db uri vb_app_test`); 
			resolve();
		})
		.on('error', err => {
			mongoose.disconnect();
			return reject(err)
		})
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
	return new Promise((resolve, reject) => {
		console.log('Killing the server now!')
		server.close(err => {
			if(err) {
				return reject(err);
			}
			resolve();
		});
	});
	});
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };