var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var dishSchema = new Schema({
	name: {
		type: String,
		require: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// Create a model to use the schema
var Dishes = mongoose.model('Dish', dishSchema);

// Make this available to our Node applications
module.exports = Dishes;