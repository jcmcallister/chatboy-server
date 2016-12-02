var config = require("../config");
var mysql = require("mysql");

// DB Config
var dbOptions = ({
	host 			: config.mysql.host,
	port 			: config.mysql.port,
	user 			: config.mysql.user,
	password 		: config.mysql.pass,
	database 		: 'chatboy',
	connectionLimit	: 10
});

var dbPool = mysql.createPool(dbOptions);

module.exports = dbPool;
