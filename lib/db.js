var config = require('../config.js');

var knex = require('knex')({
  client: 'mysql',
  connection: config.mysql,
  debug: false
});

var bookshelf = require('bookshelf')(knex);

var models = {};

models.Feed = bookshelf.Model.extend({
  tableName: 'feed'
});

module.exports = {
  knex:      knex,
  bookshelf: bookshelf,
  models:    models
}



