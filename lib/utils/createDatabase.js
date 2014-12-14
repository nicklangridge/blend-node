var _ = require('lodash');

function createDatabase(knexConfig) {
  var conn = _.cloneDeep(knexConfig);
  delete conn.connection.database; // connect with no db selected

  var knex = require('knex')(conn);
  var sql  = 'CREATE DATABASE IF NOT EXISTS ' + knexConfig.connection.database;

  return knex.raw(sql).then(function(){
    return knex.destroy();
  })
}

module.exports = createDatabase;