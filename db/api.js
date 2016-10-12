'use strict'

var knex = require('./knex')

module.exports = {
    findOrCreate: (profile, callback) => {
        console.log('You made it to the findOrCreate function');
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
                    console.log('There is no user with the email. You are prepared to enter stuff into the database');
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
