const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
		userId: {
			type: String,
			default: -1
		},
		timeStamp: {
			type: Date,
			default: Date.now()
		},
		isDeleted: {
			type: Boolean,
			dafault: false
		}
});

module.exports = mongoose.model('session', userSessionSchema);