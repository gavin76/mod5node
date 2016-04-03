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
  console.log('Verifying token...');
  // decode token
  if (token) {
    // verifies secret and checks exp
    console.log('Token provided.');
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
    console.log('No token found?');
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
};

exports.verifyAdmin = function(req, res, next) {
  // check header, url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('Verifying token...');

  // decode token
  if (token) {
    // verify secret, check if admin
    console.log('Token provided, check if admin...');
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if (err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
      } else {
        // token ok, check if admin
        if (decoded._doc.admin) {
          console.log('User has admin privileges.');
          next();
        } else {
          var err = new Error('You do not have sufficient privileges.');
          err.status = 401;
          return next(err);
        }
      }
    });
  } else {
    // no token, return an error
    console.log('No token found.');
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
};

