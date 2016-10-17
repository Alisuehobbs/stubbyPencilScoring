'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('games', (table) => {
        table.increments();
        table.integer('users_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
        table.string('game_name').notNullable().defaultTo('');
        table.integer('status_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
        table.timestamps(true, true);

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('games');
};
