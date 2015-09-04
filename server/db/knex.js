// set up a knex instance

"use strict";

var config     = require('../config'),
    knexConfig = require('./knexfile'), 
    knex       = require('knex')(knexConfig[config.environment]);

module.exports = knex;