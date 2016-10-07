'use strict'

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('status').notNullable().defaultTo('');
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users')
}
