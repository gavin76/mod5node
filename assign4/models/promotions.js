var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Add currency type to Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var promotionSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true,
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
	}
}, {
	timestamps: true
});

// create a model using the schema
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this availbe to our Node applications
module.exports = Promotions;