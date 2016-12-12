function chatModel (options) {  
    var db;

    if (!options.db) {
    throw new Error('Options needs property `db` to retrieve the Rep Model');
    }

    db = options.db;
    return {
        createChat: function (cb) {
          db.query('INSERT ...', cb);
        },
        list: function(cb) {
            db.query('SELECT * FROM users WHERE typeID = (SELECT typeID from usertypes WHERE typeName = \'rep\')',cb);
        }
    };

}

module.exports = chatModel;
