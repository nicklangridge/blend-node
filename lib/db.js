var config = require('../config.js');

var db = {};

var knex = db.knex = require('knex')({
  client: 'mysql',
  connection: config.mysql,
  debug: false
});

var bookshelf = db.bookshelf = require('bookshelf')(knex);

//-----------------------------------------------------------------------------
// Models
//-----------------------------------------------------------------------------

var models = db.models = {};

models.Feed = bookshelf.Model.extend({
  tableName: 'feed'
});

//-----------------------------------------------------------------------------
// Helper methods
//-----------------------------------------------------------------------------

db.feeds = {};
db.feeds.fetchActive = function() {
  return new models.Feed({active: 1}).fetchAll();
}

db.disconnect = function() {
  return db.knex.destroy();
}

module.exports = db;



