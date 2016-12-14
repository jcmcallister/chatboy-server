function chatModel (options) {  
    var db;

    if (!options.db) {
        throw new Error('Options needs property `db` to retrieve the Chat Model');
    }

    db = options.db;
    return {
        createChat: function (cb) {
            db.query('INSERT INTO ChatSessions VALUES (NULL, NOW(), NULL);', function(err,result){
                if(err) throw err;
                console.log("Chat/Model :: createChat() : Empty Chat Session Created!");

                // console.log("Chat/Model :: createChat() : Result of INSERT:" + JSON.stringify(result) );

                //get the new chat's Id
                cb(result.insertId);
                
            });
        },
        createChatUser: function (chatId, userId, cb) {
            db.query('INSERT INTO ChatSessionUsers VALUES ('+ chatId +','+ userId +');', function(rows){
                console.log("Chat/Model :: createChatUser() : User (Id: "+ userId +") now Related to Chat Id " + chatId + "!");
                cb();
            });
        },
        requestRep: function(chatId, cb) {
            db.query( 'SELECT * FROM users WHERE active = true AND typeId = (SELECT typeId from usertypes WHERE typeName = \'rep\') LIMIT 1;', function(err, repRow) {
                if (err) throw err;

                var rv = "";

                if(repRow.length == 0) {
                    // throw new Error("no available reps were found!");

                }else {
                    // console.log("Chat/Model :: requestRep() : rep row is " + JSON.stringify(repRow));
                    rv = repRow[0];
                }

                cb(rv);
            });
        },

        saveMessage: function(chatId, userId, msg, cb) {
            db.query('INSERT INTO ChatMessages VALUES ('+ chatId +','+ userId +', "'+ db.escape(msg) +'", NOW());',cb);
        }
    };

}

module.exports = chatModel;
