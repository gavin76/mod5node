var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign and verify tokens
var config = require('../config.js');

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    console.log('Verify token.');
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if (err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if no token, return an error
    console.log('No token.');
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
};

exports.verifyAdmin = function(req, res, next) {
  console.log('Checking admin status: ' + req.decoded._doc.admin);
  if (req.decoded._doc.admin) {
    next();
  } else {
    var err = new Error('You do not have sufficient privileges.');
    err.status = 403;
    return next(err);
  }
};