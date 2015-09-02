// knex connection details

"use strict";

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'blend',
      user:     'blend',
      password: 'blend'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      database: 'blend_test',
      user:     'blend',
      password: 'blend'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'blend',
      user:     'blend',
      password: 'blend'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
