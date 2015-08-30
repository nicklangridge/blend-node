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
    
    return db.Feed.findById(feedId).then(function(feed) {
      
      log.info('Importing reviews from feed', feed.get('slug'));
  
      var created = {
        artists:0, 
        albums:0, 
        reviews: 0
      };
    
      return api.getFeedReviews(feedId).then(function(reviews){

        log.info('Found %s reviews', reviews.length);

        return Promise.map(reviews, function(data){
          return db.findOrCreateArtist(data.artist).then(function(artist){  
            if (artist._isNew) {
              log.info('+++ Added artist', artist.get('slug'));
              created.artists++;
            }
            return db.findOrCreateAlbum(data.album, artist.id).then(function(album){
              if (album._isNew) {
                log.info('+++ Added album %s by %s', album.get('slug'), artist.get('slug'));
                created.albums++;
              }
              return db.findOrCreateReview(data.url, data.content, album.id, feedId).then(function(review){
                if (review._isNew) {
                  log.info('+++ Added review %s of %s by %s', review.get('url'), album.get('slug'), artist.get('slug') );  
                  created.reviews++;
                }
              });
            });
          });
          
        });
      }).then(function(){
      
        log.info(
          'Feed %s; created %s artists, %s albums, %s reviews', 
          feed.get('slug'), 
          created.artists, 
          created.albums,
          created.reviews
        );
      
      });
    });
  },
  
  done: function() {
    return db.done();
  }
};

module.exports = api;
