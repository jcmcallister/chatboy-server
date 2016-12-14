var db = require("../db");
var userModel = require("./model");

module.exports = {
    saveUserInfo: function(data, cb) {
    	if(typeof data.name !== undefined && typeof data.email !== undefined) {

    		var options = {
    			db: db,
    			name: data.name,
    			email: data.email	
    		};
    		var user = userModel(options),
    			userId = -1;

    		//does this user exist already?
    		user.get(function(rows){

		        if(rows.length == 0) {
		        	//no user found
					var userType = "2";// the value it started with when the DB was designed

					user.getUserType(function(type){
				        userType = type;
				        options.usertype = userType;
					});

					user.create(userType, function(rows){
						user.get(function(userRow){
							userId = userRow[0]['id'];
						});
		    			cb(userId);
		    		});

				} else {
					// found this user's email!
					cb(rows[0]["id"]);
				}
    		});

    		
    	}
    },
    get: function(id, cb) {

    },
    update: function(data, cb) {

    },
    delete: function(data, cb) {

    },
    startNewChat: function(data,cb) {
    	var model = userModel({db: db});


    }
};