var express = require('express');
var router = express.Router();
//var ObjectID = require('mongodb').ObjectID;

var srv = require('../lib/serverManagement.js');


/* GET create page. */
router.get('/servers', function(req, res, next) {
    srv.get_servers(function(err, data){
        res.render('admin/servers', { 'servers': data })
    })
})

router.get('/api/servers', function(req, res, next){
    srv.get_servers(function(err, data){
        res.json(data)
    })
})

router.get('/api/servers/:server/restart', function(req, res, next){
    srv.restart(req.params.server, function(err, data){
        console.log(data)
    })
})

module.exports = router
