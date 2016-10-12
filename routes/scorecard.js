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

function userLoop(input) {
    let allPromises = [];
    for (var i = 0; i < input.length; i++) {
        let usersID = input[i].users_id;
        allPromises.push(knex('users')
            .returning('*')
            .where('id', usersID)
            .then((userLoopScore) => {
              console.log('userLoopScore in userLoop: ', userLoopScore);
              return userLoopScore[0]
            }))
    }
    return Promise.all(allPromises);
}

router.get('/:id', authorize, (req, res, next) => {
    console.log('req.session.gameInfo.id is ', req.session.gameInfo.id);
    knex('games')
        .where('id', req.session.gameInfo.id)
        .then((oneGame) => {
            const id = oneGame[0].id;
            console.log('id is: ', id);
            console.log('oneGame is:', oneGame);
            knex('game_players')
                .where('games_id', id)
                .then((users) => {
                    console.log('users:', users);
                    let input = users;
                    userLoop(input)
                    .then ((scorecard) => {
                      console.log('final scorecard', scorecard);
                      res.render('scorecard', {
                        scorecard: scorecard,
                        first_name: scorecard.first_name,
                        game_name: req.session.gameInfo.game_name,
                        image: scorecard.image,
                        // rounds_id: scorecard.round_number,
                        // users: scorecard.users_id
                      })
                    })
                })
        })
})



module.exports = router;
