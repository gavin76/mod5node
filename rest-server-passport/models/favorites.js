var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dishes: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Dish'
	}]
}, {
	timestamps: true
});

// create a model using the schema
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;
