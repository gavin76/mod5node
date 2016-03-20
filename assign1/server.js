// Setup and configuration

var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

var port = 3000
var hostname = 'localhost';

// Configure router modules
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

// Report status error if found
app.use(function(req, res, next) {
	res.status = 404;
	res.end('Error: Cannot ' + req.method + ' ' + req.url);

});

app.listen(port, hostname, function() {
	console.log(`Server running at http://${hostname}:${port}/`);
});