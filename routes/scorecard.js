'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {

  knex('users')
  .join('games', 'users_id', 'games.users_id')
  .join('rounds', 'games.users_id', 'rounds.users_id')
  .join('user_rounds','games.users_id', 'user_rounds.users_id')
  .where('games.users_id', 4)
  // .where('user_id', req.session.user_id)

  .then(scorecard => {
      res.render('scorecard',{
        scorecard: scorecard,
        game_name: scorecard[0].game_name,
        image: scorecard[0].image,
        label: scorecard[0].label,
        rounds_id: scorecard[0].rounds_id
        })
      console.log("scorecard", scorecard);
      })
    })

module.exports = router;
