var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// Connected!
	console.log("Connected correctly to server");

	// Create new user
	var newDish = Dishes({
		name: 'Uthapizza',
		description: 'Test'
	});

	// Save the user
	newDish.save(function(err) {
		if (err) throw err;
		console.log('Dish created!');

		// Get all the users
		Dishes.find({}, function(err, dishes) {
			if (err) throw err;

			// Object of all the users
			console.log(dishes);
			db.collection('dishes').drop(function() {
				db.close();
			});
		});
	});
});