var express = require('express');
var app = express();
var helmet = require('helmet');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var requireFu = require('require-fu');


var config = {
	'PORT_FRONTEND' : 3000,
	'PORT_APP' 		: 9001,
	'DB_HOST' 		: 'localhost',
	'DB_PORT' 		: 3306,
	'DB_USER' 		: 'dbuser',
	'DB_PASS' 		: 'foobar'
};


// Session Config
var sessionStore = new MySQLStore({
	host 			: config['DB_HOST'],
	port 			: config['DB_PORT'],
	user 			: config['DB_USER'],
	password 		: config['DB_PASS'],
	database 		: 'chatboy-sessions'
});


// Use a Different Session Middleware
app.set('trust proxy', 1); // trust first proxy

app.use(
	session({
		secret: 'veltpunchVandals',
		cookie: { maxAge: 60000 },
		store: sessionStore
	})
);


// Baseline Security
app.use( helmet() );
app.disable('x-powered-by');


// START -- Database setup
	var mysql = require('mysql');

	//connection pool for any concurrent users
	var pool = mysql.createPool({
		connectionLimit	: 10,
		host 			: config['DB_HOST'],
		user 			: config['DB_USER'],
		password 		: config['DB_PASS'],
		database 		: 'chatboy-db'
	});


	// connection.connect();
	// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
		// 	if (err) throw err
		// 	console.log('The solution is: ', rows[0].solution)
	// })
	// connection.end();


//  END  -- Database setup


// Routing
requireFu(__dirname + '/routes')(app);
requireFu(__dirname + '/routes/api')(app,session,db);

var defaultRedirect = function(response){
	response.redirect('http://localhost:' + config['PORT_FRONTEND']);
};

var sessionCheck = function(req,res,next) {
	//any API request needs an auth token,
	//	EXCEPT for entry-point requests to get an auth token
	if( req.hasOwnProperty(params) ){
		if(typeof params.token !== 'string') {
			defaultRedirect(res);
		}else {
			next();
		}
	}
};

var methodCheck = function(req,res,next) {
	// check if the user is hitting an entry point that is OK with no auth token
	var methods = ['openChatSession', 'closeChatSession', 'sendMessage', 'repLogin', 'repLogout', 'repViewRatings', 'sendTranscript', 'rateRep'];
	//do stuff here
	next();
};

var methodRun = function(req,res){};

app.get('/', function(req,res){
	// direct hits and unauth'd stuff gets kicked to the homepage
	defaultRedirect(res);
});

app.all('/api/:method', [sessionCheck, methodCheck, methodRun]);

app.listen(config['PORT_APP'], function () {
	console.log('Example app listening on port ' + config['PORT_APP']);
})