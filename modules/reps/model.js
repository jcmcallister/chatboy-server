function repModel (options) {  
  var db;

  if (!options.db) {
    throw new Error('Options needs property `db` to retrieve the Rep Model');
  }

  db = options.db;

  //A Rep is a different type of user

  return {
    create: function (cb) {
      // db.query('INSERT ...', cb);
    },
    get: function(cb) {
    	// db.query('SELECT ...', cb);
    },
    update: function(cb) {
    	// db.query('UPDATE ...', cb);
    },
    delete: function(cb) {
    	// db.query('DELETE ...', cb);
    },
    list: function(cb) {
    	//gets active reps
    	// db.query('SELECT users.* FROM users, usertypes WHERE users.active = 1 AND users.usertypeID == (SELECT typeID from usertypes WHERE typeName = 'rep' LIMIT 1);', cb);	
    }
  }
}

module.exports = repModel;  