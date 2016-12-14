var reps = require("../reps");

var express = require("express");
var app = module.exports = express();

const NodeCache = require( "node-cache" );

// Define a Cache object in this sub-app (default TTL of 5 mins, checking to delete keys every 30 sec)
app.locals.cache = new NodeCache({ stdTTL: 300, checkperiod: 30 });


app.post('/', function(req, res, next) {
	console.log("REP API: hello from the /api/reps route");
	console.log("REP API: you sent this request " + JSON.stringify(req.body) );
    // users.create(req.body, function(err, user) {
    //     if(err) return next(err); // do something on error
    //     res.json(user); // return user json if ok
    // });
});

app.post('/check', function(req,res,next){
	console.log("REP API: HELLO FROM REP CHECK ");

	reps.checkIfAvailable(req,function(result){
    	console.log("are there reps online now? " + result);
    	res.send(result);
    });
}); // reps may have multiple users waiting to chat at a time

//app.post('/getChatQueue', function(req,res,next){}); // reps may have multiple users waiting to chat at a time

app.get('/getRatings', function(req,res,next){
	// gets all ratings where User Id is the same as the actively logged-in [Rep] user
});

//app.post('/joinChat', function(req,res,next){}); // reps choose a chat from their queue and jump in to one of 'em
app.post('/login', function(req,res,next){
	// impacts chat availability status
	// given the basic auth, switches the active flag to True
	// compare hashed, salted input with hashed, salted pw
});
app.post('/logout', function(req,res,next){
	// impacts chat availability status
	// switches active flag to False


});
