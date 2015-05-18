var express = require('express');
var router = express.Router();

/* GET create page. */
router.get('/create', function(req, res, next) {
    res.render('createGather', { now: new Date() });
});

/* GET gather x page. */
router.get('/:gatherid', function(req, res, next) {
    res.render('gather', { title: 'Gather',gatherid: req.params.gatherid });
});

module.exports = router;