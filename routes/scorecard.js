'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {
  knex('users')
  .join('games', 'users_id', 'games.users_id')
  // .join('rounds','user_id', 'rounds.user_id')
  .where('users_id', 1)
  .then(scorecard => {
      res.render('scorecard',{scorecard})
      console.log("scorecard", scorecard);
      })
})


module.exports = router;
