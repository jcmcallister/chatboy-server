var util = require('util');  
var EventEmitter = require('events').EventEmitter;


module.exports = {
    create: function() {
    	function ChatListener() {  
			EventEmitter.call(this);
		}
		ChatListener.prototype.broadcast = function (msgData) {
			this.emit('message', msgData);
			// save the message to DB
		};

		util.inherits(ChatListener, EventEmitter);  
    }
};



