'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')


router.get('/', ((req, res, next) => {
    res.render('createGame')
}))

// insert game criteria into database
router.post('/', (req, res) => {
    let number
    knex('games')
        .insert({
            game_name: req.body.game_name,
            status_id: 1,
            users_id: req.session.userInfo.id
        }, '*')
        .then((createdGameInfo) => {
            console.log('req.body is ', req.body);
            let game = createdGameInfo[0]
            return knex('rounds')
                .insert({
                    games_id: game.id,
                    users_id: req.session.userInfo.id,
                    label: req.body.label,
                    number_of_rounds: parseInt(req.body.number_of_rounds),
                }, '*')
                .then(() => {
                    console.log(game);
                    return knex('user_rounds')
                    number = parseInt(req.body.number_of_rounds)
                    for (var i = 1; i <= number; i++) {}
                    console.log('# is ', i);
                    // .insert({
                    //   round_id: user_id: req.session.userInfo.id
                    //   round_number: i
                    // })
                })
        })
        // .returning('*')
        //     .then(createdGameInfo => {
        //         var gameThign = createdGameInfo
        //         console.log('id', createdGameInfo);
        //         // knex('rounds')
        //         .insert({
        //             games_id: createdGameInfo.id,
        //
        //         })
        //
        // })

})

/* GET scorecard page. */
// router.post('/', function(req, res, next) {
//   res.render('scorecard', { title: 'this is the scorecard page' });
// });

module.exports = router;;;;
