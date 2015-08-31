// api
// all methods return plain old JS objects - no models returned here

var _       = require('lodash');
var Promise = require('bluebird');
var db      = require('../db');
var feeds   = require('../feeds');
var log     = require('../utils/log');
var Buffer  = require('../utils/buffer');

var api = {
  
  getFeedReviews: function(feedId) {
    return db.Feed.findById(feedId).then(function(model) {
      return Promise.resolve(feeds.fetch(model.get('slug')));
    });
  }, 
  
  importAllFeeds: function(feedId) {
    return db.Feed.findAll({active: 1}).then(function(collection) {
      return Promise.map(collection.models, function(feed) {
        return api.importFeed(feed.id);
      }).then(function(){
        log.info('all imports done');
      });
    });
  },
  
  importFeed: function(feedId) {
    
    return db.Feed.findById(feedId).then(function(feed) {
      var msgs = new Buffer();
      
      msgs.add(['Importing reviews from feed', feed.get('slug')]);
  
      var counts = {
        artists: 0, 
        albums: 0, 
        reviews: 0
      };
    
      return api.getFeedReviews(feedId).then(function(reviews){

        msgs.add(['Found %s reviews', reviews.length]);

        return Promise.map(reviews, function(data){
          return db.findOrCreateArtist(data.artist).then(function(artist){  
            if (artist._isNew) {
              msgs.add(['+++ Added artist', artist.get('slug')]);
              counts.artists++;
            }
            return db.findOrCreateAlbum(data.album, artist.id).then(function(album){
              if (album._isNew) {
                msgs.add(['+++ Added album %s by %s', album.get('slug'), artist.get('slug')]);
                counts.albums++;
              }
              return db.findOrCreateReview(data.url, data.content, album.id, feedId).then(function(review){
                if (review._isNew) {
                  msgs.add(['+++ Added review %s of %s by %s', review.get('url'), album.get('slug'), artist.get('slug')]);  
                  counts.reviews++;
                }
              });
            });
          });
          
        });
      }).then(function(){
        
        msgs.add([
          'Feed %s; created %s artists, %s albums, %s reviews', 
          feed.get('slug'), 
          counts.artists, 
          counts.albums,
          counts.reviews
        ]);
        
        msgs.flush(log.info);
        
      });
    });
  },
  
  done: function() {
    return db.done();
  }
};

module.exports = api;
