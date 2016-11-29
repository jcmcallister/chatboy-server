var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var helmet = require('helmet');
var mysql = require('mysql');
var path = require('path');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var requireFu = require('require-fu');


var config = {
	'PORT_FRONTEND' : 3000,
	'PORT_APP' 		: 3000,
	'DB_HOST' 		: 'localhost',
	'DB_PORT' 		: 3306,
	'DB_USER' 		: 'chatboy',
	'DB_PASS' 		: 'foobar',
	'APP_ROOT'		: __dirname
};


// DB Config
var dbOptions = new ({
	host 			: config['DB_HOST'],
	port 			: config['DB_PORT'],
	user 			: config['DB_USER'],
	password 		: config['DB_PASS'],
	database 		: 'chatboy',
	connectionLimit	: 10
});

var dbPool = mysql.createPool(dbOptions);


// Session Config
var sessionStore = new MySQLStore({
	checkExpirationInterval: 15*1000*60, // mins * ms * seconds
	createDatabaseTable: true // if it doesn't exist
}, dbPool);


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



app.listen(config['PORT_APP'], function () {
	console.log('Chatboy :: Listening on port ' + config['PORT_APP'] + "...");
})