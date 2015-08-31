// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');                       // logger middleware
var bodyParser = require('body-parser');
//var mongoConnect = require('connect-mongo')(express);

// configuration ===============================================================
mongoose.connect(database.url, function(err) {
    if (!err) {
        console.log('connection successful');
    } else {
        console.log('connection error', err);
    }
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

//app.use(express.sessions());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);