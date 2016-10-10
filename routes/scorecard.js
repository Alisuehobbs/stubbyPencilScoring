'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {

  knex('users')
  .join('games', 'user_id', 'games.user_id')
  // .join('rounds','user_id', 'rounds.user_id')
  .where('user_id', 1)
  // .where('user_id', req.session.user_id)
  .then(scorecard => {
      res.render('scorecard',{
        scorecard: scorecard,
        game_name: scorecard[0].game_name,
        image: scorecard.image
        })
      console.log("scorecard", scorecard);
      })
    })



module.exports = router;
