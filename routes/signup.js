const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

router.get('/auth/facebook',
    passport.authenticate('facebook', {
            scope: ['email']
        }
    ));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook',
    {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }
));

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('signup', {
        profilePic: 'https://unsplash.it/200/?random'
    });
});

router.post('/', (req, res, next) => {

    const hashed_password = bcrypt.hashSync(req.body.password, 8)

    const newUserObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        image: req.body.image,
        hashed_password: hashed_password
    }

    knex('users')
        .insert(newUserObj, 'id')
        .then((users) => {
            const id = users[0]
            knex('users')
                .where('id', id)
                .first()
                .then((returnUserObject) => {
                    req.session.userInfo = returnUserObject;
                    res.redirect('profile')
                })
        })
})

module.exports = router;
