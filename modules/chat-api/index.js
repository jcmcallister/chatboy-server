var user = require("../users");
var chat = require("../chat");

var express = require("express");
var app = module.exports = express();


app.post("/availableStatus/", function(req, res, next) {
	//get the rep model and see if any are active!
	//send back a simple bool in our res
});

app.post("/emailTranscript/", function(req, res, next) {
	//use nodemailer with mailgun
});

/*	A chat should not end itself, but the question is instead of access and how we think of a route in this app.
	A route should be treated similar to an object, with behaviors. thus, a chat can't start or end itself, a rep or user must instead do that
	Ex: User is on our site, wants to start a chat. our Angular service pings /api/chat/start. this makes logical sense to me.
	Behavioral routes get messy, i think.... 
	Our Chat is a service, and thus our routes need to be service oriented. 
	So, the User API deals with CRUD for users, the Rep API deals with CRUD + list + login/out, and the Chat API deals with comms & status */
app.post("/end/", function(req, res, next) {});

app.post("/start/", function(req, res, next) {

	// packet validation
	if(typeof req.body.name === "undefined" || 
		typeof req.body.email === "undefined") {
		return res.send(400);
	}

	console.info("Opening Chat for " + req.body.name + " (email: " + req.body.email + " )");

	var resData = {}, data = {};

	req.session.name = req.body.name;
	req.session.email = req.body.email;

	//save the user's name & email into Users OR just get it if user already existed
	user.create(req.session,function(userID){
		console.log("chat-api/start :: user created in DB!");
		data["userID"] = userID;
		req.session.userID = userID;
	});

	//save the user's name & email into ChatSessions & hookup to ChatSessionUsers
	chat.startNewSession();
	

	resData["chatID"] = "";


	res.send(resData);
});

app.post("/message/", function(req, res, next) {});
