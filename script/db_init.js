var _              = require('lodash');
var config         = require('../config.js')
var createDatabase = require('../lib/utils/createDatabase.js');

createDatabase(config.knex).then(function() {
    
  var db = require('../lib/db.js');
  db.execSql('schema')
    .then(function(){
      return db.execSql('feeds_data');
    })
    .then(db.done);

});
