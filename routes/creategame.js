'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

function insertRows(numRows, idInfo) {

    for (var i = 0; i < numRows; i++) {
        knex('user_rounds')
            .insert({
                rounds_id: 1,
                round_number: i,
                users_id: idInfo,
            })
            .catch((err) => {
                return err
            })
    }
}


router.get('/', (req, res, next) => {
    res.render('createGame')
})

// insert game criteria into database
router.post('/', (req, res, next) => {
    let number
    let userId = Number.parseInt(req.session.userInfo.id)
    let roundNumber = Number.parseInt(req.body.number_of_rounds)
    console.log('req session user info id', userId);
    console.log(typeof userId);
    knex('games')
        .insert({
            game_name: req.body.game_name,
            status_id: 1,
            users_id: userId
        }, '*')
        .then((createdGameInfo) => {
            // console.log('req.body is ', req.body);
            let game = createdGameInfo[0]
            return knex('rounds')
                .insert({
                    games_id: game.id,
                    users_id: userId,
                    label: req.body.label,
                    number_of_rounds: parseInt(req.body.number_of_rounds),
                }, '*')
                .then((info) => {
                    insertRows(roundNumber, userId);
                })
                .then(() => {
                    res.redirect('/scorecard')
                })
                .catch((err) => {
                    next(err)
                })
        })
})

module.exports = router;
