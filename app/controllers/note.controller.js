const Note = require('../models/note.model.js');

//create and save a new note
exports.create = (req, res) => {
	//Validate request
	if(!req.body.content) {
		return res.status(400).send({
				message: "Note content can not be empty"
			});
	}

	//Create a Note
	const note = new Note({
		title: req.body.title || "Untitled note",
		content: req.body.content
	});

	//Save Note in the database
	note.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating note."
			});
		});
};

//Retrieve and return all notes
exports.getAll = (req, res) => {

	//fetching records
	Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
	// Note.find()
	// 	.then(notes => {
	// 		res.send(notes);
	// 	}).catch(err => {
	// 		res.status(500).send({
	// 			message: err.message || "Some error while fetching notes" 
	// 		});
	// 	});

};

//find a single note with a noteId
exports.findOne = (req, res) => {

	//get one note
	Note.findById(req.params.noteId)
		.then(note => {
			if(!note) {
				res.status(404).send({
					message: "No record found with id: " + req.params.noteId
				});
			}

			res.send(note);
		})
		.catch(err => {
			//catching error
			if(err.kind === 'ObjectId') {
				res.status(404).send({
					message: "No record found with id: " + req.params.noteId
				});
			}
			return res.status(500).send({
				messge: "Error while retreiving notes"
			});
		});

};

//Update a note identifies by the noteId in request
exports.update = (req, res) => {
	//update using noteid
	//validate request
	if(!req.body.content) {
		return res.status(400).send({
			message: "Note content can not be empty"
		});
	}

	//find note and update it with the request body
	Note.findByIdAndUpdate(req.params.noteId, {
		title: req.body.title || "untitled note",
		content: req.body.content
	}, {new: true})
	.then(note => {
		if(!note) {
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			});
		}

		res.send(note);
	})
	.catch(err => {
		if(err.Kind === 'ObjectId') {
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			});
		}

		return res.status(500).send({
			message : "Error while fetching note."
		});
	});
};

//delete a note with identifies
exports.delete = (req, res) => {
		// find and remove note
		Note.findByIdAndRemove(req.params.noteId)
		.then(note => {
			if(!note) {
				return note.status(404).send({
					message: "Note not found wuth id: "+ req.params.noteId
				});
			}
			res.send({
				message: "Note deleted successfullly."
			});
		})
		.catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
		});
};