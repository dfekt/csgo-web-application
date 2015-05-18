var express = require('express');
var router = express.Router();

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
    res.render('gather', { title: 'Gather',gatherid: req.params.gatherid });
});



module.exports = router;