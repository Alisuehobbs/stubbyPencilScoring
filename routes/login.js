const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
// const FacebookStrategy = require('passport-facebook').Strategy;
//
// router.get('/auth/facebook',
//     passport.authenticate('facebook', {
//             scope: ['email']
//         }
//     ));
//
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook',
//     {
//         successRedirect: '/profile',
//         failureRedirect: '/login'
//     }
// ));

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('login')
});

router.post('/', (req, res, next) => {
    knex('users')
        .where('email', req.body.email)
        .first()
        .then((user) => {
            var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password)
            if (passwordMatch == false) {
                res.send('Bad email or password')
            } else {
                req.session.userInfo = user
                console.log(req.session.userInfo);
                res.redirect('/profile')
            }
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;
