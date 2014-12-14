var config    = require('../../config.js');
var knex      = require('../knex.js');
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

// can extend base objects here if needed

module.exports = bookshelf;



