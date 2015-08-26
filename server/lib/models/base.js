var knex      = require('../db/knex.js');
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

// can extend base objects here if needed

module.exports = bookshelf;



