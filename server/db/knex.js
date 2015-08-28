// set up a knex instance

var config     = require('../config');
var knexConfig = require('./knexfile'); 
var knex       = require('knex')(knexConfig[config.environment]);

module.exports = knex;