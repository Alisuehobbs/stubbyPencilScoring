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
  res.send('You made it to the profile page')
    // knex('users')
    //     .join('games', 'users.id', 'games.users_id')
    //     // .join('rounds','games_id', 'rounds.games_id')
    //     .where('users.id', 1)
    //     .then(profile => {
    //         res.render('profile', {
    //             profile: profile,
    //             game_name: profile[0].game_name,
    //             image: profile[0].image
    //         })
    //         console.log('profile', profile);
    //     })
})


module.exports = router;
