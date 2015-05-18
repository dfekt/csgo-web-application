var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET create page. */
router.get('/create', function(req, res, next) {
    res.render('createGather', { now: new Date() });
});

/*
 * POST add gather.
 */
router.post('/add', function(req, res) {
    var db = req.db;
    console.log(req.body);
    db.collection('gatherlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: result[0]._id } : { msg: err }
        );
    });
});

/*
 * GET gatherlist.
 */
router.get('/gatherlist', function(req, res) {
    var db = req.db;
    db.collection('gatherlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/* GET gather x page. */
router.get('/:gatherid', function(req, res, next) {
    var db = req.db;
    console.log(req.params.gatherid);
    if(ObjectID.isValid(req.params.gatherid)) {
        db.collection('gatherlist').find({_id: new ObjectID(req.params.gatherid)}).toArray(function (err, items) {
            console.log(items.length);
            if (items.length == 1) {
                res.render('gather', items[0]);
            }
            else
                res.render('gather', {name: 'Gather not found'});
        });
    }
    //check if it is trying to find gather by its name, this works if the name is unique
    else{
        db.collection('gatherlist').find({name:req.params.gatherid}).toArray(function(err,items){
            console.log(items.length);
            if(items.length == 1) {
                res.render('gather', items[0]);
            }
            else
                res.render('gather', { name: 'Gather not found'});
        })
    }
});



module.exports = router;