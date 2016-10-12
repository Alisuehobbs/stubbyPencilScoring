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
//

router.get('/', authorize, function(req, res, next) {
    // knex('users')
    //     .join('games', 'users_id', 'games.users_id')
    //     .join('rounds', 'games.id', 'rounds.games_id')
    //     .join('user_rounds', 'games.users_id', 'user_rounds.users_id')
    //     .select('users.id', 'users.id as users_id', 'users.image as image')
    //     .select('games.id', 'games.id as games_id', 'games.game_name as game_name')
    //     .select('user_rounds.round_number', 'round_number as round_number')
    //     .where('users.id', req.session.userInfo.id)
    //     .where('games.id', req.session.gameInfo.id)
    // .where('user_id', req.session.user_id)

    // .then(scorecard => {
    console.log('req.session is', req.session.userInfo);
    console.log('game info', req.session.gameInfo);
    knex('user_rounds')
        .where('games_id', req.session.gameInfo.id)
        // .first()
        .then((scorecard) => {

            res.render('scorecard', {
                scorecard: scorecard,
                first_name: req.session.userInfo.first_name,
                game_name: req.session.gameInfo.game_name,
                image: req.session.userInfo.image,
                rounds_id: scorecard.round_number
            })
            console.log('scorecard', scorecard);
        })
})

module.exports = router;
