require('dotenv').config();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var helmet = require('helmet');
var mysql = require('mysql');
var path = require('path');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var requireFu = require('require-fu');

var config = require("./config");
var db = require("./modules/db");

// Session Config
var sessionStore = new MySQLStore({
	checkExpirationInterval: 15*1000*60, // mins * ms * seconds
	createDatabaseTable: true // if it doesn't exist
}, db);


// Use a Different Session Middleware
app.use(
	session({
		secret: 'veltpunchVandals',
		cookie: { maxAge: 60000 },
		store: sessionStore,
		resave: true,
    	saveUninitialized: false
	})
);


// Form & Request JSON capture
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Baseline Security
app.use( helmet() );
app.disable('x-powered-by');


// Routing -- Static Files served from Root, e.g. /css/styles.css, /index.html, etc.
app.use(express.static( path.join(__dirname + '/dist') ));


// Routing -- Dynamic, Requirable files
requireFu(__dirname + '/routes')(app);
requireFu(__dirname + '/routes/api')(app);

// Mount our various APIs as sub-apps
app.use('/api/users', require("./modules/user-api"));
app.use('/api/reps', require("./modules/rep-api"));
app.use('/api/chat', require("./modules/chat-api"));

app.listen(config.web.port, function () {
	console.log('Chatboy :: Listening on port ' + config.web.port + "...");
})