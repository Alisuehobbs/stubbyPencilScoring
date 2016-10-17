'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')


const authorize = (req, res, next) => {
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to access the game page.",
            image: "http://www.findmysoft.com/img/news/inside/Error-401_1460548854.jpg"
        });
    }
    next();
}

router.get('/:id', authorize, (req, res, next) => {
    knex('users')
      .join('game_players', 'users.id', 'game_players.users_id')
        .where('game_players.games_id', req.params.id)
        .then((scorecard) => {
                  console.log('scorecard', scorecard);
                  res.render('scorecard', {
                          scorecard: scorecard,
                          game_name: scorecard.game_name,
                          first_name: scorecard.first_name,
                          image: scorecard.image
                      })
                  })
})

module.exports = router;
