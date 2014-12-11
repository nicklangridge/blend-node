var _      = require('lodash');
var config = require('../config.js')

var conn = _.assign({}, config.mysql, {database: null}); // connect without db
var knex = require('knex')({ client: 'mysql', connection: conn});

knex.raw('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database)
  .then(function setup() {
    knex.destroy();
    
    var db = require('../lib/db.js');
    db.createTables()
      .then(db.populateFeeds)
      .then(db.done);
  });