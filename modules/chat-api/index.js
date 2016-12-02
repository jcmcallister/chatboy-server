var users = require("../users");

var express = require("express");
var app = module.exports = express();


app.post("/availableStatus/", function(req, res, next) {
	//get the rep model and see if any are active!
	//send back a simple bool in our res
});

app.post("/emailTranscript/", function(req, res, next) {
	//use nodemailer with mailgun
});

app.post("/end/", function(req, res, next) {});

app.post("/start/", function(req, res, next) {

	// packet validation
	if(typeof req.body.name === "undefined" || 
		typeof req.body.email === "undefined") {
		return res.send(400);
	}

	console.info("Opening Chat for " + req.body.name + " (email: " + req.body.email + " )");

	//upsert a session for this user!
		//happens automatically at the end of the request if we do anything with "req.session"

	var data = {};

	req.session.name = req.body.name;
	req.session.email = req.body.email;

	//save the user's name & email into Users


	//save the user's name & email into ChatSessions

	//save the user's name & email into ChatSessionUsers

	data["chatID"] = "";


	res.send(data);
});

app.post("/sendMessage/", function(req, res, next) {});
