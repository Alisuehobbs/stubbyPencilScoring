const express = require('express');
const router = express.Router();
const knex = require('../db/knex')


router.get('/', ((req, res, next) => {
    res.render('createGame')
}))

// insert game criteria into database
router.post('/', (req, res) => {
    knex('games')
        .insert({
            game_name: req.body.game_name,
            status_id: 1,
            user_id: req.session.userInfo.id
        }, '*')
        .then((createdGameInfo) => {
            let game = createdGameInfo[0]
            return knex('rounds')
                .insert({
                    games_id: game.id,
                    label: req.body.label
                })
                // res.render('scorecard')
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

module.exports = router;
