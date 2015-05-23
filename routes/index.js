var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Gather = require('../models/gather');


/* GET home page. */
router.get('/', function(req, res, next) {
    Gather.find().where('status').in(['open','full']).exec(function(err, gathers){
        res.render('index.jade', { gathers: gathers });
    })
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.jade', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.jade', { message: req.flash('signupMessage') });
});
// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the front page
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =====================================
// PROFILE SECTION =====================
// =====================================
router.get('/profile/:userid', function(req, res) {
    User.findById(req.params.userid,function (err,user){
        if (!err) {
            res.render('profile.jade', {owner: user});
        }
        else
            res.render('profile.jade');
    });
});

module.exports = router;
