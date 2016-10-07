'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {
  // knex('games')
  //   .then(games => {
  //     res.render('profile',{games})
  //     })
  knex('users')
    .then(users => {
    res.render('profile',{users})
  // knex('rounds')
  // .then(rounds =>{
  //   res.render('profile',{rounds})
  //
  //   })

  })
})

module.exports = router;
