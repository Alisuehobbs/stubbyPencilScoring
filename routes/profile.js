'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const authorize = (req, res, next) => {
  console.log('req.session.userInfo =', req.session.userInfo);
    if (!req.session.userInfo) {
        res.render('error', {
          message: "You need to be signed in to access the profile page.",
          image: "http://www.findmysoft.com/img/news/inside/Error-401_1460548854.jpg"
        });
    }
    next();
}

router.get('/', authorize, (req, res, next) => {
    knex('users')
        .join('games', 'users_id', 'games.users_id')
        // .join('rounds','games_id', 'rounds.games_id')
        .where('users_id', 1)
        .then(profile => {
            res.render('profile', {
                profile
            })
            console.log('profile', profile);
        })
})


module.exports = router;
