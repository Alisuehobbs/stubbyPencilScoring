'use strict';

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/stubbypencilscoring_dev'
    },

    test: {
        client: 'pg',
        connection: 'postgres://localhost/stubbypencilscoring_test'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
