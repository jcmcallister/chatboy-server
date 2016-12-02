var reps = require("../reps");

var express = require("express");
var app = module.exports = express();

app.post('/', function(req, res, next) {
	console.log("REP API: hello from the /api/reps route");
	console.log("REP API: you sent this request " + JSON.stringify(req.body) );
    // users.create(req.body, function(err, user) {
    //     if(err) return next(err); // do something on error
    //     res.json(user); // return user json if ok
    // });
});
