var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Gather = require('../models/gather');
var User = require('../models/user');


//handles generic db callbacks
var callback = function (err, raw) {
    if (err) {
        res.send(err);
    }
}

//checks that the sessions user is the owner of the gather, callbacks the gather if it is true
var getGatherIfOwner = function (gatherId, userId, callback) {
    Gather.findById(gatherId, function (err, gather) {
        if(err){
            callback(err,gather);
        }
        else if(gather.owner._id.equals(userId)){
            callback(err,gather);
        }
        else{
            callback(err,null);
        }
    })
}

/* GET create page. */
router.get('/create', function(req, res, next) {
    res.render('createGather.jade', { now: new Date() });
});

/*
 * POST add gather.
 */
router.post('/add', function(req, res) {

    var gather = {
        name: req.body.name,
        startingTime: req.body.startingDate + " " + req.body.startingTime,
        currentPlayers: 0,
        teamSize: parseInt(req.body.teamSize),
        skill: req.body.skill,
        owner: {_id:req.user._id, nick: req.user.nick},
        status: "open",
        dateCreated : new Date()
    }
    Gather.create(gather, function(err, gather){
        if(!err){
            res.redirect("/gathers/"+gather._id);
        }
        else{
            res.send(err);
        }
    });
});

/*
 * GET gatherlist.
 */
router.get('/gatherlist', function(req, res) {
    Gather.find(function (err, gathers) {
        if (err)
            return res.send(err);
        else
            res.json(gathers);
    });
});

/* GET gather x page. */
router.get('/:gatherid', function(req, res, next) {
    if(ObjectID.isValid(req.params.gatherid)) {
        Gather.findById(req.params.gatherid,function (err,gather){
            if (!err) {
                res.render('gather.jade', {gather: gather, message: req.flash('statusMessage')});
            }
            else
                res.send(err);
        });
    }
    //check if it is trying to find gather by its name, this works if the name is unique
    else{
        Gather.findOne({name:req.params.gatherid},function(err,gather){
            if (!err) {
                res.render('gather.jade', {gather: gather});
            }
            else
                res.send(err);
        })
    }
});

/* GET Join gather*/
router.get('/:gatherid/:team/join', function(req,res){
    if(!req.user){
        req.flash('statusMessage','You must be logged in to join a gather');
        res.redirect("/gathers/"+req.params.gatherid);
    }
    else {
        Gather.findById(req.params.gatherid, function (err, gather) {
            if (err) {
                res.send(err);
            }
            else {
                gather.addPlayer(req.user, req.params.team, function (result) {
                    if (result.err) {
                        res.send(result.err);
                    }
                    else {
                        req.flash('statusMessage',result.message);
                        //if success update current gather on the user
                        if (result.message == "success") {
                            User.update({_id: req.user._id}, {$set: {currentGather: gather._id}}, callback);
                        }
                        res.redirect("/gathers/" + gather._id);
                    }
                })
            }
        })
    }
})

router.get('/:gatherid/start', function (req, res) {
    getGatherIfOwner(req.params.gatherid,req.user._id, function (err, gather) {
        if(err){
            res.send(err);
        }
        else if (gather == null){
            req.flash('statusMessage',"You do not have permission to this");
            res.redirect("/gathers/" + gather._id);
        }
        else{
            //do stuff
        }
    });
});router.get('/:gatherid/finish', function (req, res) {
    getGatherIfOwner(req.params.gatherid,req.user._id, function (err, gather) {
        if(err){
            res.send(err);
        }
        else if (gather == null){
            req.flash('statusMessage',"You do not have permission to this");
            res.redirect("/gathers/" + gather._id);
        }
        else{
            //do stuff
        }
    });
});router.get('/:gatherid/cancel', function (req, res) {
    getGatherIfOwner(req.params.gatherid,req.user._id, function (err, gather) {
        if(err){
            res.send(err);
        }
        else if (gather == null){
            req.flash('statusMessage',"You do not have permission to this");
            res.redirect("/gathers/" + gather._id);
        }
        else{
            //do stuff
        }
    });
});

/*POST Leave gather*/
router.post('/:gatherid/leave', function(req, res) {
    Gather.findById(req.params.gatherid, function (err, gather) {
        if (err) {
            res.send(err);
        }
        else {
            var n = -1;
            for(var i = 0; i < gather[req.body.team].length;i++) {
                console.log(gather[req.body.team][i]._id);
                if(gather[req.body.team][i]._id.equals(req.body.playerid)){
                    n = i;
                }
            }
            if(n != -1) {
                gather[req.body.team].splice(n,1);
                User.update({_id: req.user._id}, {$set: {currentGather: null}}, callback);
                gather.save(function (err) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.redirect("/gathers/" + gather._id);
                    }
                });
            }
        }
    })

});



module.exports = router;