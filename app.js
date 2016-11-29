var express = require('express');
var app = express();
var helmet = require('helmet');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var requireFu = require('require-fu');


var config = {
	'PORT_FRONTEND' : 3000,
	'PORT_APP' 		: 3000,
	'DB_HOST' 		: 'localhost',
	'DB_PORT' 		: 3306,
	'DB_USER' 		: 'chatboy',
	'DB_PASS' 		: 'foobar'
};


// Session Config
var sessionStore = new MySQLStore({
	host 			: config['DB_HOST'],
	port 			: config['DB_PORT'],
	user 			: config['DB_USER'],
	password 		: config['DB_PASS'],
	database 		: 'chatboy',
	connectionLimit : 10,
	checkExpirationInterval: 15*1000*60, // mins * ms * seconds
	createDatabaseTable: true // if it doesn't exist
});


// Use a Different Session Middleware
// app.set('trust proxy', 1); // trust first proxy

app.use(
	session({
		secret: 'veltpunchVandals',
		cookie: { maxAge: 60000 },
		store: sessionStore,
		resave: false,
		saveUninitialized: false
	})
);


// Baseline Security
app.use( helmet() );
app.disable('x-powered-by');


// Routing
requireFu(__dirname + '/routes')(app);
requireFu(__dirname + '/routes/api')(app);

var defaultRedirect = function(response){
	response.redirect('http://localhost:' + config['PORT_FRONTEND']);
};

app.listen(config['PORT_APP'], function () {
	console.log('Example app listening on port ' + config['PORT_APP']);
})