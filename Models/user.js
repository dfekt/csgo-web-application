// load the things we need
var bcrypt   = require('bcrypt-nodejs');
var mongo = require('mongoskin');
var config = require("../config");
var db = mongo.db(config.dbpath, {native_parser:true});
var ObjectID = require('mongodb').ObjectID;



// define the schema for our user model
var userSchema = {
        email        : String,
        password     : String,
        nick         : String
};

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.findById = function(id,callback){
    db.collection('userlist').find({_id: new ObjectID(id)}).toArray(function (err, items) {
        if (items.length == 1) {
            callback(null,items[0]);
        }
    });
};

// create the model for users and expose it to our app
module.exports = userSchema;