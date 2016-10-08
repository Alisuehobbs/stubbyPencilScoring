'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const authorize = (req, res, next) => {
    if (!req.session.userInfo) {
        res.send('Unauthorized');
    }
    next();
}

router.get('/', authorize, (req, res, next) => {
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
