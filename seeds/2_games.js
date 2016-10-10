exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('games').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('games').insert({
                    users_id: '1',
                    game_name: 'backgammon',
                    status_id: '1',
                }),
                knex('games').insert({
                    users_id: '3',
                    game_name: 'checkers',
                    status_id: '2',
                })
            ]);
        });
};
