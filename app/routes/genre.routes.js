module.exports = (app) => {
	//getting the controller to explain methods
	const genre = require('../controllers/genre.controller.js');

	// get all genres
	app.get('/genres', genre.getAll);

	// get all genres
	app.post('/genres', genre.create);

	// get all genres
	app.put('/genre/:genreId', genre.update);

	// get all genres
	app.delete('/genre/:genreId', genre.delete);
}