// knex connection details

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

  staging: {
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
