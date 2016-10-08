
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rounds').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('rounds').insert({
          games_id: '1',
          label: 'quarter'

        }),
        knex('rounds').insert({
          games_id: '2',
          label: 'half'

        })
      ]);
    });
};