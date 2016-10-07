'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('admin', (table) => {
    table.increments();
    table.integer('games_id')
    .notNullable()
    .references('id')
    .inTable('games')
    .onDelete('CASCADE')
    .index();
    table.integer('users_id').notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .index();
    table.string('admin').notNullable().defaultTo('');
    table.timestamps(true, true);

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin');
};
