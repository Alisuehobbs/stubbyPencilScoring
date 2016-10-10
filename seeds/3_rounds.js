exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('rounds').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('rounds').insert({
                    games_id: '1',
                    label: 'quarter',
                    number_of_rounds: 4,
                    users_id: 1
                }),
                knex('rounds').insert({
                    games_id: '2',
                    label: 'half',
                    number_of_rounds: 2,
                    users_id: 3
                })
            ]);
        });
};
