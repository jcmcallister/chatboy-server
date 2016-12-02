var util = require('util');
var EventEmitter = require('events').EventEmitter;

function ChatObservable() {
	EventEmitter.call(this);
}

util.inherits(ChatObservable, EventEmitter);

ChatObservable.prototype.message = function(chatID, message) {
	this.emit('newMessage', message);
};