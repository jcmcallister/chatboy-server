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
        },
        getChat: function(chatId, cb) {
            console.log("Chat/Model :: getChat() : chatId is " + chatId);
            db.query('SELECT * FROM ChatSessions WHERE chatID = '+ db.escape(chatId) +';', function(err, rows) {
                console.log("Chat/Model :: getChat() : " + JSON.stringify(rows) );
                cb(rows);
            });
        },
        getChatState: function(chatId, cb) {

            var state = 'void';

            //does the chat exist?
            db.query('SELECT * FROM ChatSessions WHERE chatID = '+ db.escape(chatId) +';', function(err, chatResult) {
                if(chatResult.length > 0){
                    console.log(JSON.stringify(chatResult) );
                    //if so, were there any reps in the room?
                    db.query('SELECT * FROM ChatSessionUsers where chatid = '+db.escape(chatId)+ ' and userID IN (select id from users where users.typeid = (select typeId FROM usertypes WHERE typeName = \'rep\'));', 
                        function(err, repCheckResult){
                            if (err) throw err;
                            if(repCheckResult.length == 0) {
                                // there were no reps, and this user is waiting on a rep
                                state = 'waiting';
                            } else {
                                // a rep was present!
                                if(chatResult[0].timeEnded == null) {
                                    // chat is still ongoing
                                    state = 'ongoing';
                                } else {
                                    state = 'ended';
                                }
                            }
                            cb(state);
                        }
                    );
                } else {
                    cb(state);
                }
            });

            

        },
        getChatTranscript: function(chatId, cb) {
            var buffersize = 100; //TODO: pass through a buffersize, where -1 means 'no buffer'
            var limitClause = (buffersize == -1) ? '' : ' LIMIT' + buffersize;
            db.query('SELECT * FROM ChatMessages WHERE chatID = '+ db.escape(chatId) +' ORDER BY timesent ASC'+ limitClause + ';', function(err, messages) {
                cb(messages);
            });

        }
    };

}

module.exports = chatModel;
