var mongoose = require('mongoose');

// Initiate schema
var gatherSchema = new mongoose.Schema({
    name: String,
    startingTime: String,
    currentPlayers: Number,
    maxPlayers: Number,
    skill: String,
    user: mongoose.Schema.ObjectId,
    status: String,
    dateCreated : Date,
    dateUpdated : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gather', gatherSchema);