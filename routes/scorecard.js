'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {
  knex('games')
  .join('users', 'user_id',"=", 'games.user.id')
    .then(games => {
      res.render('scorecard',{games, users})
      })
  // knex('users')
  //   .then(users => {
  //   res.render('scorecard',{users})
  //
  // })
})
// router.get('/', function(req, res, next) {
// knex('rounds')
// .then(rounds =>{
//   res.render('scorecard',{rounds})
//     })
//   })

module.exports = router;
