const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('signup');
});

router.post('/', (req, res, next) => {

  const hashed_password = bcrypt.hashSync(req.body.password, 8)

  const newUserObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    user_name: req.body.user_name,
    image: req.body.image,
    hashed_password: hashed_password
  }

  console.log(newUserObj);

    knex('users')
      .insert(newUserObj)
      .then(() => {
        res.redirect('profile')
      })
})

module.exports = router;
