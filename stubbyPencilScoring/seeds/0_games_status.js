'use strict';

exports.seed = function(knex) {
    return knex('games_status').del()
        .then(() => {
            return knex('games_status').insert([{
                id: 1,
                status: "ongoing"
              },
              {
                id: 2,
                status: "complete"
              }])
        });
};
