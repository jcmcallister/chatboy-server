//how do i get data from a config object, or must i require them explicitly?
//TODO: use app.get('foo')
var db = app.get('DB');

var conn = db.createConnection({
	host 		: app.get('DB_HOST'),
	user 		: app.get('DB_USER'),
	password	: app.get('DB_PASS')
});

var User = {
	name	: true,
	email	: false,
	active	: (true ? true : false)
};

module.exports = mongoose.model('user', User);