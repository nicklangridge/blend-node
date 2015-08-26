process.env.NODE_ENV = 'test';
var config = {};

config.knex = {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'blend',
    password : 'blend',
    database : process.env.NODE_ENV === 'test' ? 'blend' : 'blend_test',
    charset  : 'utf8'
  },
  debug: false
}

config.sql_dir = __dirname + '/sql/';

module.exports = config;

