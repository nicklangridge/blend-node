var config = require('../config.js');

// make sure we use test db
config.knex.connection.database += '_test';

var db = require('../../lib/dbApi.js')(config); 

module.exports = db;



