var _      = require('lodash');
var config = require('../config.js')

]
var conn = _.assign({}, config.mysql, {database: null}); // connect without db
var knex = require('knex')({ client: 'mysql', connection: conn});

knex.raw('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database)
  .then(function(){
    knex.destroy();
    
    var db = require('../lib/db.js');
    db.createTables()
      .then(db.done)
      .catch(db.error);
  });