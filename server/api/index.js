// api
// all methods return plain old JS objects - no models returned here

var _       = require('lodash');
var Promise = require('bluebird');
var db      = require('../db');
var feeds   = require('../feeds');
var log     = require('../utils/log');

var api = {
  
  getFeed: function(feedId) {
    return db.Feed.findById(feedId).then(function(model) {
      return Promise.resolve(model.toJSON());
    });
  },
  
  getFeedReviews: function(feedId) {
    return db.Feed.findById(feedId).then(function(model) {
      return Promise.resolve(feeds.fetch(model.get('slug')));
    });
  },
  
  getActiveFeeds: function() {
    return db.Feed.findAll({active: 1}).then(function(collection) {
      return Promise.resolve(collection.toJSON());
    });
  },
  
  importFeed: function(feedId) {
    return api.getFeedReviews(feedId).then(function(reviews){
      return Promise.map(reviews, function(review){

        return db.findOrCreateArtist(review.artist).then(function(artist){
          log.info('ARTIST', artist);
          
          return db.findOrCreateAlbum(review.album, artist.id).then(function(album){
            log.info('ALBUM', album);
          
            return db.findOrCreateReview(review.url, review.content, album.id, feedId).then(function(){
              log.info('REVIEW', review);
              
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
