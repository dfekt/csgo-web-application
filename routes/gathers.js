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
    console.log("BODY: ", req.body);
    console.log("USER: ", req.user);

    var gather = {
        name: req.body.name,
        startingTime: req.body.startingDate + " " + req.body.startingTime,
        currentPlayers: 0,
        maxPlayers: parseInt(req.body.teamSize)*2,
        skill: req.body.skill,
        user: req.user._id,
        status: "open",
        dateCreated : new Date()
    }
    Gather.create(gather, function(err, gather){
        if(!err){
            res.redirect("/");
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
                res.render('gather.jade');
        });
    }
    //check if it is trying to find gather by its name, this works if the name is unique
    else{
        Gather.findOne({name:req.params.gatherid},function(err,gather){
            if (!err) {
                res.render('gather.jade', {gather: gather});
            }
            else
                res.render('gather.jade');
        })
    }
});



module.exports = router;