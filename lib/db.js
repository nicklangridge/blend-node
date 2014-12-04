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

// keep models as light as possible

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
    data.slug = utils.createSlug(data.name);
    var artist = models.Artist.forge(data);
    return artist.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : artist.save();
    });
  },

  findOrCreateAlbum: function(data) {
    data.slug = utils.createSlug(data.name);
    var album = models.Album.forge(data);
    return album.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : album.save();
    });
  },

  findOrCreateReview: function(data) {
    var review = models.Artist.forge(review);
    return review.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : review.save();
    });
  },

  done: function() {
    return knex.destroy();
  }
};

module.exports = db;



