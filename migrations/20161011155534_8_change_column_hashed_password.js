'use strict'

exports.up = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.specificType('hashed_password', 'char(60)');
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable('users')
    table.specificType('hashed_password', 'char(60)').notNullable();
}
