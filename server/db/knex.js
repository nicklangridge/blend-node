var config  = require('../../config.js');
var knex    = require('knex')(config.knex);

module.exports = knex;