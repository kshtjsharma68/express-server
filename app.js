var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mongoose

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;


// to handle request
/**
*  can take any type of request
* .get(), .post()
*/
app.get('/', function(req, res) {
	res.send('Please use /api/books or /api/genre');
});

app.listen(3000);
console.log('Running on port.....')