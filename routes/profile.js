'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const authorize = (req, res, next) => {
    if (!req.session.userInfo) {
        res.send('Unauthorized');
    }
    next();
}

router.get('/', function(req, res, next) {
    knex('users')
        .join('games', 'user_id', 'games.user_id')
        // .join('rounds','games_id', 'rounds.games_id')
        .where('user_id', 1)
        .then(profile => {
            res.render('profile', {
                profile
            })
            console.log('profile', profile);
        })
})


module.exports = router;
