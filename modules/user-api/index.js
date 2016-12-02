var users = require("../users");

var express = require("express");
var app = module.exports = express();

app.post('/', function(req, res, next) {
	console.log("USER API: hello from the /api/users route");
	console.log("USER API: you sent this request " + JSON.stringify(req.body) );
    // users.create(req.body, function(err, user) {
    //     if(err) return next(err); // do something on error
    //     res.json(user); // return user json if ok
    // });
});

app.post('/startChat', function(req, res, next) {});
app.post('/endChat', function(req, res, next) {});

app.post('/getTranscript', function(req, res, next) {});

app.post('/rateRep', function(req, res, next) {});
