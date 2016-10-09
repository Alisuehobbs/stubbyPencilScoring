'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {
  knex('users')
  .join('games', 'user_id', 'games.user_id')
  // .join('rounds','user_id', 'rounds.user_id')
  .where('user_id', 1)
  .then(scorecard => {
      res.render('scorecard',{scorecard})
      console.log("scorecard", scorecard);
      })
})


module.exports = router;
