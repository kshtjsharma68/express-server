const User = require('./user.model.js');
const userSession = require('./userSession.model.js');

exports.signUp = (req, res) => {
	const {body} = req;
	const {
			firstName,
			lastName,
			password
			} = body;
	let  { 
		email
	}	= body;

	checkValidity(firstName, res);
	checkValidity(lastName, res);
	checkValidity(email, res);
	checkValidity(password, res);
	

	email = email.toLowerCase();


	//Steps to signup
	/*
		1. Verify email 
	*/
	// User.find({
	// 	email: email
	// }, (err, previousUser) => {
	// 	if(err) {
	// 		return res.status(404).send({
	// 			message: err.message || 'Something went wrong'
	// 		});
	// 	} else if (previousUser.length > 0) {
	// 		return res.status(404).send({
	// 			message: 'Duplicate entry for email'
	// 		});
	// 	}

	// 	const newUser = new User();
	// 	newUser.email = email;
	// 	newUser.firstName = firstName;
	// 	newUser.lastName = lastName;
	// 	newUser.password = newUser.generateHash(password);
	// 	newUser.save()
	// 		.then(user => {
	// 			if(!user) {
	// 				return res.status(400).send({
	// 				mnessage: 'User not saved successfully'
	// 			});
	// 			}
	// 			res.status(200).send({
	// 				mnessage: 'User saved successfully'
	// 			});
	// 		})
	// 		.catch(err => {
	// 			return res.status(500).send({
	// 				messgae: 'Unable to save user'
	// 			});
	// 		});
	// });

	User.find({
		email: email
	})
	.then(user => {
		if (user.length) {
			 return res.status(404).send({
				message: `Duplicate entry for email :${email}`
			});
		}
	})
	.then( () => {console.log('hererer')
			const newUser = new User();
		newUser.email = email;
		newUser.firstName = firstName;
		newUser.lastName = lastName;
		newUser.password = newUser.generateHash(password);
		return newUser.save()
	}) 
	.then(newUse => {
		if (!newUse) {
			return res.status(400).send({
				message: 'Unable to create new record'
			});
		}

		return res.status(200).send({
				message: 'User created successfully'
			});
	})
	.catch(err => {
		return res.status(500).send({
			message: err.message || `Server error `
		});
	});

}; 

exports.signIn = (req, res, next) => {
	return res.status(200).send({
		message: 'Welcome come join & use /api/signup to singUp'
	});
};

exports.LoginIn = (req,  res) => {
	let {
		email,
		password
	} = req.body;

	if (!email) {
		sendResponseWithStatus(res, 404, 'No email available');
	}

	if (!password) {
		sendResponseWithStatus(res, 404, 'No password available');
	}

	email = email.toLowerCase();

	User.find({
		email: email
	})
	.then(users => {
		if(users.length == 0) {
			sendResponseWithStatus(res, 404, `User with email: ${email} not found` );
		}

		const user = users[0];
		if(!user.validPassword(password)) {
			sendResponseWithStatus(res, 400, 'Password does not match');
		}

		//Otherwise need to create a session for user to login

		const session = new userSession();
		session.userId = user._id;
		session.isDeleted = false;
		return session.save();
	})
	.then(sess => {
		req.session.token = sess._id;
		return res.status(200).send({
			success: true,
			message: 'Valid login',
			token: sess._id             // point back to user id for session purpose
		});
	})
	.catch(err => {console.log(err)
		if(err) {
			sendResponseWithStatus(res, 500, JSON.stringify(err) )
		}
		
	});
};

exports.Verify = (req, res, next) => {
	const { token } = req.query;

	userSession.findById({
		_id: token,
		isDeleted: false
	})
	.then(sess => {
		if(sess.length == 0) {
			sendResponseWithStatus(res, 400, 'Invalid');
		} else {
			sendResponseWithStatus(res, 200, 'Good', sess);
		}
	})
	.catch(err => {
			sendResponseWithStatus(res, 500, JSON.stringify(err))
	});
};

exports.Logout = (req, res, next) => {
	const { token } = req.query;

	// res.setHeader('Content-Type', 'text/html')
	userSession.findOneAndUpdate({
		_id: token,
		isDeleted: false
	},{isDeleted: true}, null)
	.then(sess => {
		if (!sess) {
			sendResponseWithStatus(res, 400, 'No session available')
		}
		req.session.destroy(err => {
			if (err) {
				sendResponseWithStatus(res, 500, 'Session not deleted. Server error');
			} else {
				sendResponseWithStatus(res, 200, 'Session deleted succesfully');
		// res.redirect('/');
			}
		});
		
	})
	.catch(err => {
		sendResponseWithStatus(res, 500, 'Server error', err)
	}) 
};

function checkValidity(parameter, res) {
	if (!parameter) {
		return res.status(404).send({
			success: false,
			message: `Error: ${parameter} can not be blank`
		});
	}
};

function sendResponseWithStatus(res, stat = 500, message = '', data = {}) {
	let types = [ 'object' ];
	if(types.includes(typeof data ) ) {
		data = JSON.stringify(data); 
	}
	return res.status(stat).send({
		message: message,
		data: data,
	});
}