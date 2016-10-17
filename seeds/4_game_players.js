
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game_players').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('game_players').insert({
          games_id: '1',
          game_name: 'backgammon',
          users_id: '1',
          admin: "true"
        }),
        knex('game_players').insert({
          games_id: '1',
          game_name: 'backgammon',
          users_id: '2',
          admin: "false"
        }),
        knex('game_players').insert({
          games_id: '1',
          game_name: 'backgammon',
          users_id: '3',
          admin: "false"
        }),
        knex('game_players').insert({
          games_id: '2',
          game_name: 'checkers',
          users_id: '3',
          admin: "true"
        }),
        knex('game_players').insert({
          games_id: '2',
          game_name: 'checkers',
          users_id: '1',
          admin: "false"
        }),
        knex('game_players').insert({
          games_id: '2',
          game_name: 'checkers',
          users_id: '2',
          admin: "false"
        })

      ]);
    });
};
