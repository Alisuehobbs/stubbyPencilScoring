var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('signup');
});

router.post('/', (req, res, next) => {

  const newUserObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    image: req.body.image,
    email: req.body.email,
    hashed_password: req.body.password
  }

    knex('users')
      .insert(newUserObj)
      .then(() => {
        res.redirect('profile')
      })
})

module.exports = router;
