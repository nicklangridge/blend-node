// knex connection details

"use strict";

var config  = require('../config');

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
      tableName: 'knex_migrations',
      directory: config.rootPath + '/db/migrations'
    },
    seeds: {
      directory: config.rootPath + '/db/seeds'
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
      tableName: 'knex_migrations',
      directory: config.rootPath + '/db/migrations'
    },
    seeds: {
      directory: config.rootPath + '/db/seeds_test'
    }
  }

};
