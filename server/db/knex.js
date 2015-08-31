// set up a knex instance

"use strict";

var config     = require('../config');
var knexConfig = require('./knexfile'); 
var knex       = require('knex')(knexConfig[config.environment]);

module.exports = knex;