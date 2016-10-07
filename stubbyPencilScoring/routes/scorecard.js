'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

router.get('/', function(req, res, next) {
  knex('games')
    .then(games => {
      res.render('scorecard',{games})
      })
  knex('users')
    .then(users => {
    res.render('scorecard',{users})
  knex('rounds')
  .then(rounds =>{
    res.render('scorecard',{rounds})

    })

  })
})

module.exports = router;
 
