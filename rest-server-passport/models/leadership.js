var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Add currency type to Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// create a model using the schema
var Leadership = mongoose.model('Leadership', leaderSchema);

// make this availbe to our Node applications
module.exports = Leadership;