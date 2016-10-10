'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {

  knex('users')
  .join('games', 'users_id', 'games.users_id')
  // .join('user_rounds','games.id', 'user_rounds.games_id')
  .where('games.users_id', 1)
  // .where('user_id', req.session.user_id)

  .then(scorecard => {
      res.render('scorecard',{
        scorecard: scorecard,
        game_name: scorecard[0].game_name,
        image: scorecard.image,
        number_of_rounds: scorecard[0].number_of_rounds,
        label: scorecard[0].label
        })
      console.log("scorecard", scorecard);
      })
    })

module.exports = router;
