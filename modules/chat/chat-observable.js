var util = require('util');
var EventEmitter = require('events').EventEmitter;

function ChatObservable() {
	EventEmitter.call(this);
}

util.inherits(ChatObservable, EventEmitter);

ChatObservable.prototype.sendMessage = function(chatID, message) {
	this.emit('new-message', message);
};