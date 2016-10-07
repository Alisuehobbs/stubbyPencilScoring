'use strict';

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/stubbyPencilScoring_dev'
    },

    test: {
        client: 'pg',
        connection: 'postgres://localhost/stubbyPencilScoring_test'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
