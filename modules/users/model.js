function userModel (options) {  
  var db;

  if (!options.db) {
    throw new Error('Options needs property `db` to retrieve the User Model');
  }

  db = options.db;

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
    }
  }
}

module.exports = userModel;  