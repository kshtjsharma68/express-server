const mongoose = require('mongoose');
const bcrypt 	= require('bcryptjs');

const userSchema = new mongoose.Schema({
		firstName: {
			type: String,
			default: ''
		},
		LastName: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			default: ''
		},
		password: {
			type: String,
			default: ''
		},
		isDeleted: {
			type: String,
			default: ''
		},
		firstName: {
			type: String,
			default: ''
		}
	});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);