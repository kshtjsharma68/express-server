const Genre = require('../models/genre.model.js');

exports.create = (req, res) => {
	if(!req.body.content) {
		return res.status(404).send({
			message: "Content not available to create record"
		});
	}

	const { title, content } = req.body;  //fetching data

	//creating new instance for genre
	const genre = new Genre({
		title: title || "untitled genre",
		content: content
	});

	//saving the genre
	genre.save()
		.then((data) => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				messgae: "Error while saving genre"
			});
		});
};

// getting all records
exports.getAll = (req, res) => {
	Genre.find()
		.then(genres => {
			res.send(genres);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error while fetching the records of genre"
			});
		})
};

//getting preticular genre record
exports.update = (req, res) => {

	//checking for request content
	if(!req.body.content) {
		return res.status(404).send({
			message: "No Content available to update genre"
		});
	}

	//retrieving the content from request
	let id = req.params.genreId;
	const { title, content } = req.body;

	// To find record
	// Genre.findById(req.params.genreId);
	Genre.findByIdAndUpdate(id, {
		title: title || "Untitled update genre",
		content: content
	})
	.then(genre => {
		if(!genre) {
			return res.status(404).send({
				message: "Genre not found with id: "+ id
			});
		}
		res.send(genre);
	})
	.catch(err => {
		//if id doesnot match
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Genre not found with id: "+ id
			});
		}

		res.status(500).send({
			message: "Error while fetching genre and updating" + err
		});
	})
};	

exports.delete = (req, res) => {
	// get record by id
	Genre.findByIdAndRemove(req.params.genreId)
		.then(genre => {
			
			if(!genre) {
				return res.status(404).send({
					message: "Genre not found with id: " + req.params.genreId
				});
			}

			res.send({
				message: "Genre removed successfully."
			});
		})
		.catch(err => {
			if(err.kind == 'ObjectId' || err.name == 'Not found') {
				return res.status(404).send({
					messgae: "Genre not found with id: " +req.params.genreId
				});
			}

			res.status(500).send({
				message: "error while fetching records"
			});
		});
}