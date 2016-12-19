var chat = require("../chat");
// var listener = require("../chat/listener").create();
var reps = require("../reps");
var user = require("../users");

var express = require("express");
var app = module.exports = express();
var dateFormat = require('dateformat');


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

	console.info("chat-api/start :: Opening Chat for " + req.body.name + " (email: " + req.body.email + " )");

	var resData = {}, data = {};

	req.session.name = req.body.name;
	req.session.email = req.body.email;

	//save the user's name & email into Users OR just get their Id if user already existed
	console.log("chat-api/start :: saving user into DB!");
	user.saveUserInfo(req.session, startNewSession);


	function startNewSession(userId){
		console.log("chat-api/start :: starting new chat session!");
		data["userId"] = userId;
		resData["userId"] = userId;
		req.session.userId = userId;

		//assert: userId is the legit Id matching req.body.email, and is not undefined here

		//save the user's name & email into ChatSessions & hookup to ChatSessionUsers
		chat.startNewSession(data, chatCreated);
	}

	function chatCreated(chatData){
		resData["chatData"] = chatData;

		// listenForMessages();

		// send back the "we're set up" signal
		res.send(resData);
		next();
	}

});

app.post("/message/", function(req, res, next) {
	reconnectSession(req, messageHandler);

	function messageHandler() {
		console.info("chat-api/message :: RECV Message => " + req.session.name + ": " + req.body.msg + " (user " + req.session.userId + ", in Chat " + req.body.chatId + ")");
		//console.info("chat-api/message :: " + JSON.stringify(req.body) );// we should have msg and chatId

		//send the message to the other chatroom members!
		/*listener.broadcast({
			"message" : req.body.msg,
			"from": req.session.name,
			"fromId" : req.session.userId,
			"timestamp" : dateFormat(),
		});*/

		//save the message into the DB

		// res.send("message recd at " + dateFormat());	
	}
});

app.post("/status/", function(req, res, next) {

	//pass in "reconnect" as a boolean value and we'll send a backfill of messages

	if(req.body.chatId && req.body.userId) {
		// console.info("chat-api/status :: Checking status of chat " + req.body.chatId);
		chat.getStatus(req.body.chatId, handleStatus);
	}


	function handleStatus(chatStatus){
		var data = {
			status: chatStatus
		};

		reconnectSession(req, function(){
			if(["ongoing","inprogress"].indexOf(chatStatus) >= 0 && req.body.reconnect) {
				data.reconnected = reconnectToChat();
			} else {
				res.send(data);
			}
		});
	}

	function reconnectToChat() {
		var rv = false;

		//to reconnect, we: fetch a message log & subscribe the user to the chatroom listener
		chat.getMessages(req.body.chatid,req.body.userId, function(transcript){
			data.messageLog = transcript;
			// listenForMessages();
			res.send(data);
		});
	}

});


function reconnectSession(req, cb) {
	// console.log("Session Reconnect :: req = " + JSON.stringify(req.body));
	if(req.body && req.body.userId) {
		user.get(req.body.userId, function(userObj){
			console.log("Session Reconnect :: userObj = " + JSON.stringify(userObj));
			if (userObj) {
				req.session.name = userObj.name;
				req.session.email = userObj.email;
				req.session.userId = userObj.id;
			}
			cb();
		});
	}else {
		cb();
	}
};

function listenForMessages() {
	listener.on('message', function (data) {  
		console.log(req.session.name + "(user " + req.session.userId + ") got a new message!" + JSON.stringify(data) );
		res.send(data);
	});
};