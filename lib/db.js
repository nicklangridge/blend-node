var _       = require('lodash');
var Promise = require('bluebird');
var config  = require('../config.js');
var knex    = require('knex')(config.knex);
var models  = require('./models');

var db = {
  models:    models,

  addReview: function(feedId, artistName, albumName, url, content) {
    return models.Artist.findOrCreate({ name: artistName })
      .then(function(artist) {
        return models.Album.findOrCreate({ 
          name:      albumName, 
          artist_id: artist.get('artist_id')
        });
      })
      .then(function(album) {
        return models.Review.findOrCreate({
          album_id: album.get('album_id'),
          feed_id:  feedId,
          url:      url,
          text:     content
        });
      });
  },

  // utility methods for build and test

  execSqlFile: function(filename) {
    return readFile(filename, 'utf8').then(function(sql){
      var commands = sql.split(';');
      return Promise.all(commands.map(function(cmd){ return knex.raw(cmd) }));
    });
  },

  createTables: function() {
    return db.execSqlFile(config.sql_files.tables);
  },

  populateFeeds: function() {
    return db.execSqlFile(config.sql_files.feeds);
  },

  done: function() {
    return knex.destroy();
  },

  error: function(error) {
    db.done();
    throw error;
  }
};

module.exports = db;



