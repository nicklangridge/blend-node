var _       = require('lodash');
var Promise = require('bluebird');
var db      = require('../db');
var feeds   = require('../feeds');

var api = {
  
  getFeed: function(id) {
    return db.Feed.findById(id).then(function(model) {
      return Promise.resolve(model.toJSON());
    });
  },
  
  getFeedReviews: function(id) {
    return db.Feed.findById(id).then(function(model) {
      return Promise.resolve(feeds.fetch(model.get('slug')));
    });
  },
  
  getActiveFeeds: function() {
    return db.Feed.findAll({active: 1}).then(function(collection) {
      return Promise.resolve(collection.toJSON());
    });
  },
  
  importFeed: function(id) {
    return db.Feed.findById(id).then(function(feed) {
      return feed.fetchReviews().then(function(review){
        return db.findOrCreateArtist(review.artist).then(function(artist){
          return db.findOrCreateAlbum(review.album, artist.id).then(function(album){
            return db.findOrCreateAlbum(review.url, review.content, album.id, feed.id).then(function(){
              return Promise.resolve(true);
            })
          });
        });
      });
    });
  },
  
  done: function() {
    return db.done();
  }
};

module.exports = api;
