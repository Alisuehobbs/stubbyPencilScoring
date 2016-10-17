exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          first_name: 'Ali',
          last_name: 'hobbsie',
          email:'ali@email.com',
          user_name:'alibalie',
          image:'http://www.fillmurray.com/g/200/300',
          hashed_password:'alkjdfpaoeinveea390482',
          type: 'local'
        }),
        knex('users').insert({
          first_name: 'Kristin',
          last_name: 'hobbsie',
          email:'kristin@email.com',
          user_name:'Kristen',
          image:'http://www.fillmurray.com/g/200/299',
          hashed_password:'alkjdfpaoeinveea390482',
          type: 'local'
        }),
        knex('users').insert({
          first_name: 'Matt',
          last_name: 'Gardner',
          email:'matt@email.com',
          user_name:'Matt',
          image:'http://www.fillmurray.com/g/200/303',
          hashed_password:'alkjdfpaoeinveea390482',
          type: 'local'
        })
      ]);
    });
};
