module.exports = (app) => {
		const notes = require('../controllers/note.controller.js');

		//create new
		app.post('/notes', notes.create);

		// get all notes
		app.get('/notes', notes.getAll);

		//update note
		app.put('/note/:noteId', notes.update);

		//delete
		app.delete('/note/:noteId', notes.delete);
}