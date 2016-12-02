var config = {};

config.mysql = {};
config.mysql.host = process.env.MYSQL_HOST;
config.mysql.port = process.env.MYSQL_PORT;
config.mysql.user = process.env.MYSQL_USER;
config.mysql.pass = process.env.MYSQL_PASS;

config.web = {};
config.web.port = process.env.WEB_PORT;

module.exports = config;