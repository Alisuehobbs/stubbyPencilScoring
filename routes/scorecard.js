'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../db/knex')


const authorize = (req, res, next) => {
    if (!req.session.userInfo) {
        res.render('error', {
            message: "You need to be signed in to access the game page.",
            image: "http://www.findmysoft.com/img/news/inside/Error-401_1460548854.jpg"
        });
    }
    next();
}



//     }
//     return Promise.all(allPromises);
// }

// function roundsLoop(rounds, req) {
//     let allPromises = [];
//     allPromises.push(knex('user_rounds')
//         .returning('*')
//         .where('games_id', req.session.gameInfo.id)
//         .then((roundsInfo) => {
//             console.log('roundsInfo is:', roundsInfo);
//             return roundsInfo
//         }))
//     return Promise.all(allPromises)
// }

router.get('/:id', authorize, (req, res, next) => {
  const roundNumber = req.session.roundInfo.number_of_rounds
    console.log('req.session.gameInfo.id is ', req.session.gameInfo.id);
    knex('users')
      .join('game_players', 'users.id', 'game_players.users_id')
      .join('rounds', 'game_players.games_id', 'rounds.games_id')
        .where('game_players.games_id', req.session.gameInfo.id)
        .then((scorecard) => {
                  console.log('scorecard', scorecard);
                  res.render('scorecard', {
                          scorecard: scorecard,
                          game_name: req.session.gameInfo.game_name,
                          first_name: scorecard.first_name,
                          image: scorecard.image
                      })
                  })
})



module.exports = router;
