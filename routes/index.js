var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CS:GO Gather system' });
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.jade');//, { message: req.flash('loginMessage') });
});

// process the login form
// router.post('/login', do all our passport stuff here);

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

// process the signup form
// router.post('/signup', do all our passport stuff here);

module.exports = router;
