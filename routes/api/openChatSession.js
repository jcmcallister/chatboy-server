module.exports = function(app) {

	app.get("/api/openChatSession", function(req, res) {
		// res.send("Wrong HTTP method, expected POST");
		return res.send(400);
	});

	app.post("/api/openChatSession", function(req, res, next) {

		// packet validation
		if(typeof req.body.name === "undefined" || 
			typeof req.body.email === "undefined") {
			return res.send(400);
		}

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
};
