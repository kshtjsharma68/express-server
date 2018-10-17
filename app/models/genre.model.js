const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
	{
		title: String,
		content: String
	},{
		timestamps: true
	});

module.exports = mongoose.model('Genre', genreSchema);