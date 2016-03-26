var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		require: true
	},
	comment: {
		type: String,
		require: true
	},
	author: {
		type: String,
		require: true
	}
});

// create a schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	comments: [commentSchema]
}, {
	timestamps: true
});

// create a model using the schema
var Dishes = mongoose.model('Dish', dishSchema);

// make this availbe to our Node applications
module.exports = Dishes;