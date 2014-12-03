var _       = require('lodash');
var Promise = require('lodash');
var config  = require('../config.js');

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
  }),

  Artist: bookshelf.Model.extend({
    tableName: 'artist'
  }),

  Album: bookshelf.Model.extend({
    tableName: 'album'
  }),

  Review: bookshelf.Model.extend({
    tableName: 'review'
  })
}

//-----------------------------------------------------------------------------
// API
//-----------------------------------------------------------------------------

var db = {
  knex:      knex,
  bookshelf: bookshelf,
  models:    models,

  getActiveFeeds: function() {
    return new models.Feed({active: 1}).fetchAll();
  },

  findOrCreateArtist: function(data) {
    return models.Artist.forge(data).fetch().then(function(model){
      if (!model) {
        return models.Artist.forge(data).save()
      } else {
        return Promise.resolve(model);
      }
    });
  },

  findOrCreateAlbum: function(data) {
  },

  findOrCreateReview: function(data) {
  },

  done: function() {
    return knex.destroy();
  }
};

module.exports = db;



