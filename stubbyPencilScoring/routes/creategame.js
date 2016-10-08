const express = require('express');
const router = express.Router();
const knex = require('../db/knex')


router.get('/', ((req, res, next) => {
    res.render('createGame')
}))

// insert game criteria into database
router.post('/', (req, res) => {
    // console.log('you hit the post route');
    // console.log('req.body is', req.body);
    knex('games')
        .insert({
            game_name: req.body.game_name,
            status_id: 1,
            user_id: 1
                //         user_id: //hard code for now(req.session.id) or localStorage.getItem('id')
        }, '*')
        .then((createdGame) => {
            let game = createdGame[0]
            console.log('the game is', game);
            console.log('the req.session is', req.session);
            return knex('rounds')
                .insert({
                    games_id: 1, //harcode for now use req.session...
                    label: req.body.label
                })
                // res.render('scorecard')
        })
        // .returning('*')
        //     .then(gameInsertion => {
        //         var gameThign = gameInsertion
        //         console.log('id', gameInsertion);
        //         // knex('rounds')
        //         .insert({
        //             games_id: gameInsertion.id,
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
