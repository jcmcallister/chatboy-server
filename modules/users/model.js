function userModel (options) {  
    var db;

    if (!options.db) {
        throw new Error('Options needs property `db` to retrieve the User Model');
    }

    db = options.db;

    return {

        create: function (typeId, cb) {
            if(typeof options.email === undefined || typeof options.name === undefined) {
                throw new Error('Users/Model :: create() : Missing `email` or `name` from options object');
            }

            //no email found, create the new non-rep customer user
            db.query('INSERT INTO users VALUES (NULL,"'+ options.name +'","'+ options.email +'", 1, '+ typeId +')', function(err, result){
                console.log("Users/Model :: create() : Record Inserted for new user!");
                cb(result.insertId);
            });

        },
        get: function(cb) {
            if(typeof options.id === undefined) {
                throw new Error('Users/Model :: get() : Missing `id` from options object');
            }
                db.query('SELECT * FROM users WHERE id = "'+ options.id + '";', function(err, rows) {
                if (err) throw err;

                cb(rows);
            });
        },
        getByEmail: function(cb) {
            if(typeof options.email === undefined) {
                throw new Error('Users/Model :: getByEmail() : Missing `email` from options object');
            }
                db.query('SELECT * FROM users WHERE email = "'+ options.email + '";', function(err, rows) {
                if (err) throw err;

                cb(rows);
            });
        },

        getUserType: function(cb) {
            db.query('SELECT typeId FROM chatboy.usertypes WHERE typeName = \'customer\';', function(err, rows){
                if (err) throw err;
                try{
                    userType = rows[0]['typeId'];
                }catch(err){
                    throw new Error("Users/Model :: getUserType() : Error with getting the right userType Id");
                }
                
                cb(userType);

            });
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