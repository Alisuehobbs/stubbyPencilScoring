'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

// const authorize = (req, res, next) => {
//     if (!req.session.userInfo) {
//         res.render('error', {
//           message: "You need to be signed in to access the game page.",
//           image: "http://www.findmysoft.com/img/news/inside/Error-401_1460548854.jpg"
//         });
//     }
//     next();
// }

//

router.get('/', function(req, res, next) {
  // let numRounds = Number.parseInt (req.body.number_of_rounds)
  // console.log(numRounds);
  // function insertRows(numRounds) {
  //     for (var i = 0; i <= numRounds; i++) {
  //         knex('user_rounds')
  //             .where('games.users_id', 1)
  //             .catch((err) => {
  //                 return err
  //             })
  //     }
  // }

  knex('users')
  .join('games', 'users_id', 'games.users_id')
  .join('rounds', 'games.users_id', 'rounds.users_id')
  // .join('user_rounds','games.users_id', 'user_rounds.users_id')
  .select('user_id as userId')
  .where('games.users_id', 1)
  // .where('user_id', req.session.user_id)

  .then(scorecard => {

      res.render('scorecard',{
        scorecard: scorecard,
        // game_name: scorecard[0].game_name,
        // image: scorecard[0].image,
        // label: scorecard[0].label,
        // rounds_id: scorecard[0].rounds_id

        })
      console.log('scorecard', scorecard);
      })
    })

module.exports = router;
