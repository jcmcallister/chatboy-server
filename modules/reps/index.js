var db = require("../db");
var repModel = require("./model");

module.exports = {
    create: function(data, cb) {},
    get: function(id, cb) {},
    update: function(data, cb) {},
    delete: function(data, cb) {},
    list: function(cb) {

    },
    checkIfAvailable: function(req, cb) {
        var model = repModel({ db: db }),
            rv = false,
            cacheVar = req.app.locals.cache.get("chatAvailable");
        
        console.log("Rep/index :: getting list of active reps!");
        
        // we cache if Reps are available, since we don't want to pummel the DB more than once every 30 seconds
        if(cacheVar == undefined || cacheVar == false) {
            model.listActiveReps(function(rows){
                console.log("Rep/index :: our active reps => " + JSON.stringify(rows));
                rv = rows.length > 0;
                cb(rv);
                req.app.locals.cache.set("chatAvailable",rv,30);
            });
        }else {
            //cache hit, baby!
            rv = cacheVar;
            cb(cacheVar);
        }
    }
};