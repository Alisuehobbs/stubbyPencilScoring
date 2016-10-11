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

function insertUserNames(userArr, game, req) {
    for (var i = 0; i < userArr.length; i++) {
        knex('users')
            .where('user_name', userArr[i])
            .first()
            .then((user) => {
                console.log('session is', req.session);
                // console.log('game info is ', game);
                // console.log('this is the type', user);
                if (!user) {
                    console.log('this is the if');
                    throw boom.create(400, 'Cannot find that user. Try another username')
                }
                console.log('user id is', user.id);
                return user.id
                let userId = user.id[i]
                knex('game_players')
                    .insert({
                        users_id: userId,
                        games_id: game.id,
                        // admin:
                    })
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
        // console.log('req.body is ', req.body);
        // console.log('req.session is ', req.session);
        // console.log('username is ', req.session.userInfo.user_name);
    knex('games')
        .insert({
            game_name: req.body.game_name,
            status_id: 1,
            users_id: userId
        }, '*')
        .then((createdGameInfo) => {
            let game = createdGameInfo[0]
            return knex('rounds')
                .insert({
                    games_id: game.id,
                    users_id: userId,
                    label: req.body.label,
                    number_of_rounds: parseInt(req.body.number_of_rounds),
                }, '*')
                .then((info) => {
                    // console.log('game is', game);
                    console.log('im getting here');
                    let roundNumber = Number.parseInt(req.body.number_of_rounds)
                    let roundId = info[0].id
                    let gameId = game.id
                    insertRows(roundNumber, userId, roundId, gameId);
                    let userArr = req.body.user_name
                    insertUserNames(userArr, game, req)
                }, '*')


            .then(() => {
                    console.log(req.body.user_name);
                    res.redirect('/login')
                })
                .catch((err) => {
                    next(err)
                })
        })
})

module.exports = router;
router;;;
