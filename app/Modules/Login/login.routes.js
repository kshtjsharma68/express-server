
//Login routes for process
module.exports = (app) => {
	const login = require('./login.controller.js');

	app.get('/api/signin', login.signIn);

	app.post('/api/signup', login.signUp);

	app.post('/api/signin', login.LoginIn);

	//Verify user login
	//Check the token is one of kind
	app.get('/api/verify', login.Verify);

	//Logout
	app.get('/api/logout', login.Logout);
}