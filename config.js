var config = {};

config.knex {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'blend',
    password : 'blend',
    database : 'blend',
    charset  : 'utf8'
  },
  debug: false
}

config.sql_files = {
  tables : __dirname + '/sql/tables.sql',
  feeds  : __dirname + '/sql/feeds.sql'
}

module.exports = config;

