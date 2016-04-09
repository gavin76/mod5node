var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
	Favorites.findOne({postedBy: req.decoded._doc._id})
	    .populate('postedBy dishes')
	    .exec(function(err, favorite) {
			if (err) throw err;
			res.json(favorite);
		});
})
.post(function(req, res, next) {	
	Favorites.findOneAndUpdate({postedBy: req.decoded._doc._id}, 
		{$addToSet: {dishes: req.body._id}},
		{'upsert': true, 'new': true}, function(err, resp) {
			if (err) throw err;
			console.log('Dish with id: ' + req.body._id + ' added to favorites');
			res.json(resp);
		});
})
.delete(function(req, res, next) {
	Favorites.remove({postedBy: req.decoded._doc._id}, function(err, resp) {
		if (err) throw err;
		console.log('All favorites deleted.');
		res.json(resp);
	});
});

favoriteRouter.route('/:dishId')
.all(Verify.verifyOrdinaryUser)
.delete(function(req, res, next) {
	
	Favorites.findOneAndUpdate(
		{postedBy: req.decoded._doc._id},
		{$pull: {dishes: req.params.dishId}},
		{'new': true},
		function(err, resp) {
			if (err) throw err;
			console.log('Favorite with id: ' + req.params.dishId + ' deleted.');
			res.json(resp);
		}
	);
});
module.exports = favoriteRouter;
