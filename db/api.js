'use strict'

var knex = require('./knex')

module.exports = {
    createOrLogin: (profile, callback) => {
        knex('users')
            .where('email', profile.emails[0].value)
            .first()
            .then((user) => {
                if (user) {
                    console.log('There is a user with this email.');
                    knex('users')
                        .where('email', profile.emails[0].value)
                        .first()
                        .then((user) => {
                            callback(null, user);
                        })
                } else {
                    knex('users')
                        .insert({
                            first_name: profile._json.first_name,
                            last_name: profile._json.last_name,
                            email: profile.emails[0].value,
                            user_name: profile._json.name,
                            image: profile._json.link
                        }, '*')
                        .then((user) => {
                            knex('users')
                                .where('email', profile.emails[0].value)
                                .first()
                                .then((user) => {
                                    callback(null, user);
                                })
                        })
                }
            })
    }
}
