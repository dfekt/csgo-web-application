var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var db = require('mongoose');

// Initiate schema
var GatherSchema = new db.Schema({
    name: String,
    startingTime: String,
    currentPlayers: Number,
    maxPlayers: Number,
    skill: String,
    user: String,
    dateCreated : Date,
    dateUpdated : { type: Date, default: Date.now }
});
var Gather = db.model('Gather',GatherSchema);


/* GET create page. */
router.get('/create', function(req, res, next) {
    res.render('createGather', { now: new Date() });
});

/*
 * POST add gather.
 */
router.post('/add', function(req, res) {
    Gather.create(req.body, function(err, gather){
        res.send(
            (err === null) ? { msg: gather._id } : { msg: err }
        );
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
                res.render('gather', gather);
            }
            else
                res.render('gather', {name: 'Gather not found'});
        });
    }
    //check if it is trying to find gather by its name, this works if the name is unique
    else{
        Gather.findOne({name:req.params.gatherid},function(err,gather){
            if(!err) {
                res.render('gather', gather);
            }
            else
                res.render('gather', { name: 'Gather not found'});
        })
    }
});



module.exports = router;