var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Initiate schema
var gatherSchema = new mongoose.Schema({
    name: String,
    startingTime: String,
    currentPlayers: Number,
    teamSize: Number,
    skill: String,
    user: ObjectId,
    status: String,//open,full,started,finished
    team1: [{_id: ObjectId,nick:String}],
    team2: [{_id: ObjectId,nick:String}],
    dateCreated : Date,
    dateUpdated : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gather', gatherSchema);