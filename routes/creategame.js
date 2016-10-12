'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const boom = require('boom')

function insertRows(numRows, idInfo, roundId, gameId) {
    for (var i = 1; i <= numRows; i++) {
        knex('user_rounds')
            .insert({
                rounds_id: roundId,
                round_number: i,
                users_id: idInfo,
                games_id: gameId,
            })
            .catch((err) => {
                return err
            })
    }
}

function insertUserNames(userNameArr, game, sessionId) {
    for (var i = 0; i < userNameArr.length; i++) {
        knex('users')
            .where('user_name', userNameArr[i])
            .first()
            .then((user) => {
                if (!user) {
                    throw boom.create(400, 'Cannot find that user. Try another username')
                }
                // var sessionId = req.session.userInfo.id
                let userId = user.id
                let gameId = game.id
                let isAdmin = function() {
                    if (sessionId == userId) {
                        // console.log('true');
                        return true
                    } else {
                        // console.log('false');
                        return false
                    }

                }
                knex('game_players')
                    .insert({
                        users_id: userId,
                        games_id: gameId,
                        admin: isAdmin()
                    }, 'id')
                    .then((id) => {
                        // console.log('the id is', id);
                    })
            })
    }
}

router.get('/', (req, res, next) => {
        res.render('createGame', {
            username: req.session.userInfo.user_name
        })
    })
    // insert game criteria into database
router.post('/', (req, res, next) => {
    let number
    let sessionId = Number.parseInt(req.session.userInfo.id)
    knex('games')
        .insert({
            game_name: req.body.game_name,
            status_id: 1,
            users_id: sessionId
        }, '*')
        .then((createdGameInfo) => {
            let game = createdGameInfo[0]
            return knex('rounds')
                .insert({
                    games_id: game.id,
                    users_id: sessionId,
                    label: req.body.label,
                    number_of_rounds: parseInt(req.body.number_of_rounds),
                }, '*')
                .then((info) => {
                    let roundNumber = Number.parseInt(req.body.number_of_rounds)
                    let roundId = info[0].id
                    let gameId = game.id
                    insertRows(roundNumber, sessionId, roundId, gameId);
                    let userNameArr = req.body.user_name
                    insertUserNames(userNameArr, game, sessionId)
                }, '*')


            .then(() => {
                    // console.log(req.body.user_name);
                    res.redirect('/scorecard')
                })
                .catch((err) => {
                    next(err)
                })
        })
})

module.exports = router;;
