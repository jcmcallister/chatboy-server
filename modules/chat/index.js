var db = require("../db");
var chatModel = require("./model");

module.exports = {
    create: function(data, cb) {

    },
    get: function(id, cb) {

    },
    update: function(data, cb) {

    },
    delete: function(data, cb) {

    },
    startNewSession: function(data,cb) {
    	var options = {
    		db: db
    	};
    	var model = chatModel({db: db}),
    		returnData = {};

    	console.log("chat/index :: startNewSession() : running...");
		
    	//assert: data has userId that is numeric

		model.createChat( addMeToChat );

		function addMeToChat(chatId) {
			//assert: chatId is numeric, not falsey
			
			console.log("chat/index :: startNewSession() : adding current user to chat...");

			returnData["chatId"] = chatId;
			model.createChatUser(chatId, data.userId, reelInARep);
		}

		function reelInARep(){
			console.log("chat/index :: startNewSession() : looking for a rep...");
			// now we get the available rep's attention...
			model.requestRep(returnData.chatId, addRepToChat);
		}

		function addRepToChat(repId) {
			//assert: repName is not empty, not falsey

			console.log("chat/index :: startNewSession() : adding our rep user to chat...");

			// if repName is falsey, no rep is available right now. TODO: user & rep queuing?
			if(!repId || repId == ''){
		        throw new Error('No Reps were available!');
		    }

			returnData["repId"] = repId;
			model.createChatUser(returnData.chatId, repId, sendBack);

		}

		function sendBack() {
			//notify our users that "you're now in a chat with <foo>! (Chat Id: <chatId>)"

			// our original callback to send us back
			cb(returnData);
		}
    	
    }
};