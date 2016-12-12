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
    list: function(cb) {
    	db.query('SELECT * FROM users WHERE typeID = (SELECT typeID from usertypes WHERE typeName = \'rep\')',cb);
    },
    update: function(cb) {
    	// db.query('UPDATE ...', cb);
    },
    delete: function(cb) {
    	// db.query('DELETE ...', cb);
    },
    listActiveReps: function(cb) {
      db.getConnection(function(err, connection) {
        // Use the connection 
        connection.query( 'SELECT * FROM users WHERE active = true AND typeID = (SELECT typeID from usertypes WHERE typeName = \'rep\');', function(err, rows) {
          if (err) throw err;

          cb(rows);

          // And done with the connection. 
          connection.release();

          // Don't use the connection here, it has been returned to the pool. 
        });
      });
    },
    login: function(cb) {
      //flips the active bool, we prep the rep's login in the API
      db.query('UPDATE users SET active = true WHERE id = ' + options.repID + ' AND 1 = (SELECT 1 FROM replogins WHERE userID = '+ options.repID +' AND pass = '+ options.pw +');', cb);
    },
    logout: function(cb) {
      db.query('UPDATE users SET active = false WHERE id = ' + options.repID + ';', cb);  
    }
  };
}

module.exports = repModel;  