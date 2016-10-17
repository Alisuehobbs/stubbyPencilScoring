var express = require('express');
var router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
