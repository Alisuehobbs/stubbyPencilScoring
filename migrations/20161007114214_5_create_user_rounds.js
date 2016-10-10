'use strict';

exports.up = function(knex) {

    return knex.schema.createTable('user_rounds', (table) => {
        table.increments();
        table.integer('rounds_id').notNullable().references('id').inTable('rounds').onDelete('CASCADE').index();
        table.integer('round_number').notNullable();
        table.integer('users_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
        table.integer('games_id').notNullable().references('id').inTable('games').onDelete('CASCADE').index();
        table.integer('score');
        table.timestamps(true, true);
    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('user_rounds');
};
