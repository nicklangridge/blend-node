var _          = require('lodash');
var Promise    = require('bluebird');
var readFile   = Promise.promisify(require("fs").readFile);
var config     = require('../config.js');
var createSlug = require('./utils').createSlug;

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

function execSqlFile(filename) {
  return readFile(filename, 'utf8').then(function(sql){
    var commands = sql.split(';');
    return Promise.all(commands.map(function(cmd){ return knex.raw(cmd) }));
  });
}

var db = {
  knex:      knex,
  bookshelf: bookshelf,
  models:    models,

  getActiveFeeds: function() {
    return new models.Feed({active: 1}).fetchAll();
  },

  findOrCreateArtist: function(data) {
    data.slug = createSlug(data.name);
    var artist = models.Artist.forge(data);
    return artist.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : artist.save();
    });
  },

  findOrCreateAlbum: function(data) {
    data.slug = createSlug(data.name);
    var album = models.Album.forge(data);
    return album.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : album.save();
    });
  },

  findOrCreateReview: function(data) {
    var review = models.Artist.forge(data);
    return review.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : review.save();
    });
  },

  addReview: function(feedId, artistName, albumName, url, content) {
    return db.findOrCreateArtist({ name: artistName })
      .then(function focAlbum(artist){
        return db.findOrCreateAlbum({ 
          name:      albumName, 
          artist_id: artist.get('artist_id')
        });
      })
      .then(function focReview(album){
        return db.findOrCreateReview({
          album_id: album.get('album_id'),
          feed_id:  feedId,
          url:      url,
          text:     content
        });
      });
  },

  // utility methods for build and test

  createTables: function() {
    return execSqlFile(config.sql_files.tables);
  },

  populateFeedsTable: function() {
    return execSqlFile(config.sql_files.feeds);
  },

  done: function() {
    return knex.destroy();
  },

  error: function(error) {
    console.log(error)
  }
};

module.exports = db;



