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
	Favorites.findById(req.decoded._doc._id)
	    .populate('dishes.favDish')
	    .exec(function(err, favorite) {
			if (err) throw err;
			res.json(favorite);
	});	
})
.post(function(req, res, next) {
	console.log('Request posted by: ' + req.decoded._doc._id);
	console.log('Received dish id: ' + req.body._id + ' for addition to favorites');
	Favorites.findOneAndUpdate({postedBy: req.decoded._doc._id}, {$addToSet: {dishes: req.body._id}}, function(err, resp) {
		if (err) throw err;
		if (resp === null) {
			console.log("No favorites existing. Create...");
			Favorites.create({
				postedBy: req.decoded._doc._id,
				dishes: [req.body._id]
				}, function(err, favDish) {
					if (err) throw err;
					console.log('Favorite dish added!');
					res.json(favDish);
			});
		} else {
			console.log('Updated favorite dish list.');
			res.json(resp);
		}
	});
	
	
	/*
	Favorites.create(req.body, function(err, favorite) {
		if (err) throw err;
		console.log('Favorite created!');
		var id = dish._id;

		res.writeHead(200,  {
			'Content-Type': 'text/plain'
		});
		res.end('Added the Favorites with id: ' + id);
	});
	*/
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Favorites.remove({}, function(err, resp) {
		if (err) throw err;
		res.json(resp);
		
		/*
		res.writeHead(200,  {
			'Content-Type': 'text/plain'
		});
		res.end('All favorites deleted.');
		*/
	});
});

/*
favoriteRouter.route('/:favoriteId')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
	Favorites.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish) {
			if (err) throw err;
			res.json(dish);
	});
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Favorites.findByIdAndUpdate(req.params.dishId, {
		$set: req.body
	}, {
		new: true
	}, function(err, dish) {
		if (err) throw err;
		console.log('Updated dish!');
		res.json(dish);
	});
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	Favorites.findByIdAndRemove(req.params.dishId, function(err, resp) {
		if (err) throw err;

		res.writeHead(200,  {
			'Content-Type': 'text/plain'
		});
		res.end('Dish deleted.');
	});
});

favoriteRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)

.get(function(req, res, next) {
	Favorites.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish) {
			if (err) throw err;
			res.json(dish.comments);
	});
})

.post(function(req, res, next) {
	Favorites.findById(req.params.dishId, function(err, dish) {
		if (err) throw err;
		req.body.postedBy = req.decoded._doc._id;
		dish.comments.push(req.body);
		dish.save(function(err, dish) {
			if (err) throw err;
			console.log('Updated Comments!');
			res.json(dish);
		});
	});
})
.delete(Verify.verifyAdmin, function(req, res, next) {
	Favorites.findById(req.params.dishId, function(err, dish) {
		if (err) throw err;
		for (var i = (dish.comments.length - 1); i >= 0; i --) {
			dish.comments.id(dish.comments[i]._id).remove();
		}
		dish.save(function(err, result) {
			if (err) throw err;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Deleted all comments!');
		})
	})
});

favoriteRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next) {
	Favorites.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish) {
			if (err) throw err;
			res.json(dish.comments.id(req.params.commentId));
	});
})

.put(function(req, res, next) {
	// Delete existing comment and insert the updated comment as new comment
	Favorites.findById(req.params.dishId, function(err, dish) {
		if (err) throw err;
		dish.comments.id(req.params.commentId).remove();
		req.body.postedBy = req.decoded._doc._id;
		console.log(req.body.postedBy);
		dish.comments.push(req.body);
		dish.save(function(err, dish) {
			if (err) throw err;
			console.log('Updated Comments!');
			res.json(dish);
		});
	});
})
.delete(function(req, res, next) {
	Favorites.findById(req.params.dishId, function(err, dish) {
		if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
			var err = new Error('You are not authorized to perform this operation!');
			err.status = 403;
			return next(err);
		}
		dish.comments.id(req.params.commentId).remove();
		dish.save(function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});
});

*/
module.exports = favoriteRouter;
