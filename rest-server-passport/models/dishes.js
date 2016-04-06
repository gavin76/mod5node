var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Add currency type to Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
}, {
	timestamps: true
});

// create a schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ''
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [commentSchema]
}, {
	timestamps: true
});

// create a model using the schema
var Dishes = mongoose.model('Dish', dishSchema);

// make this availbe to our Node applications
module.exports = Dishes;
