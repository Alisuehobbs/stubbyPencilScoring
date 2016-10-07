'use strict'

exports.up = function(knex) {
    return knex.schema.createTable('games_status', (table) => {
        table.increments();
        table.string('status').notNullable().defaultTo('');
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('games_status')
}
