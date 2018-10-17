var express = require('express');
//create express app
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const dbConfig = require('./config/database.config.js')

//parse requests of content-type- application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
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
	res.send('Please use /api/books or /api/genre');
});

require('./app/routes/note.routes.js')(app);

app.listen(3000);
console.log('Running on port.....')