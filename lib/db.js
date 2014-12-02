var config = require('../config.js');

var knex = knex = require('knex')({
  client: 'mysql',
  connection: config.mysql,
  debug: false
});

var bookshelf = require('bookshelf')(knex);

//-----------------------------------------------------------------------------
// Models
//-----------------------------------------------------------------------------

var models = {
  Feed: bookshelf.Model.extend({
    tableName: 'feed'
  })
}

//-----------------------------------------------------------------------------
// Helper methods
//-----------------------------------------------------------------------------

var feeds = {
  fetchActive: function() {
    return new models.Feed({active: 1}).fetchAll();
  }
}

//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------

var db = {
  knex:      knex,
  bookshelf: bookshelf,
  models:    models,
  feeds:     feeds,
  
  done: function() {
    return knex.destroy();
  }
};

module.exports = db;



