var _        = require('lodash');
var Promise  = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var knex     = require('./knex.js');
var models   = require('../models');

function dbApi(config) {
  return {
    models: models,

    getActiveFeeds: function() {
      return models.Feed.getActive().then(function(collection) {
        return Promise.resolve(collection.toJSON());
      });
    },

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

    execSql: function(file) {
      var filename = config.sql_dir + '/' + file + '.sql'; 
      return readFile(filename, 'utf8').then(function(sql){
        var commands = sql.split(';');
        return Promise.all(commands.map(function(cmd){ return knex.raw(cmd) }));
      });
    },

    done: function() {
      return knex.destroy();
    },

    error: function(error) {
      db.done();
      throw error;
    }
  };
}

module.exports = dbApi;



