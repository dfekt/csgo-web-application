var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Gather = require('../models/gather');


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
        user: req.user._id,
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
                res.render('gather.jade', {gather: gather});
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
    Gather.findById(req.params.gatherid,function(err,gather){
        if (err) {
            res.send(err);
        }
        else{
            gather.addPlayer({_id:req.user._id,nick:req.user.nick},req.params.team,function(result){
                if(result.err){
                    res.send(result.err);
                }
                else{
                    res.redirect("/gathers/"+req.params.gatherid);
                }
            })
        }
    })
})



module.exports = router;