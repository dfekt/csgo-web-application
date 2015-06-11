var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Initiate schema
var gatherSchema = new mongoose.Schema({
    name: String,
    startingTime: String,
    currentPlayers: Number,
    teamSize: Number,
    skill: String,
    owner: {_id: ObjectId, nick: String},
    status: String,//open,full,started,finished
    team1: [{_id: ObjectId, nick:String}],
    team2: [{_id: ObjectId, nick:String}],
    dateCreated : Date,
    dateUpdated : { type: Date, default: Date.now }
});

gatherSchema.methods.addPlayer = function(player,team, callback){

    if(player.currentGather != null){
        callback({message: "you have already joined an unfinished gather"})
        return;
    }

    if(this.status == 'open') {
        if (team == 'team1' && this.team1.length < this.teamSize) {
            this.team1.push(player);
        }
        else if (team == 'team2' && this.team2.length < this.teamSize) {
            this.team2.push(player);
        }
        else {
            callback({message: "team full"})
            return;
        }

        if (this.team1.length == this.teamSize && this.team2.length == this.teamSize) {
            this.status = 'full';
        }

        this.save(function (error, data) {
            if (error) {
                callback({message:"error",error:error});
            }
            else {
                callback({message:"success", data: data});
            }

        });
    }
    else{
        callback({message: "gather full"})
    }
}



module.exports = mongoose.model('Gather', gatherSchema);
