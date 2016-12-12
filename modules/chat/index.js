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
    	var model = chatModel({db: db});

    	console.log("chat/index :: startNewSession() : running...");
    }
};