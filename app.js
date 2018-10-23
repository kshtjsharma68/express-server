var express = require('express');
var session = require('express-session');
//create express app
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = require('./config/database.config.js')

const port = process.env.PORT || 4000;
//initializing session
//parse requests of content-type- application/x-www-form-urlencoded
app.use(session({ token: '', secret: 'keyboard', resave: false, saveUninitialized: true }), bodyParser.urlencoded({ extended: true }), bodyParser.json());

//connect to mongoose

// mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connect(dbConfig.url, {
			useNewUrlParser: true
		}).then(() => {
			console.log('successfully connected')

		}).catch(err => {
			console.log('Could not connect to the database. Exiting now...', err);
    		process.exit();
		});

// to handle request
/**
*  can take any type of request
* .get(), .post()
*/
app.get('/', function(req, res) {
	res.send('App is working...');
});


//require notes routes

require('./app/Modules/Login/login.routes.js')(app);

require('./app/routes/note.routes.js')(app);

require('./app/routes/genre.routes.js')(app);

app.listen(port);
console.log('Running on port.....')