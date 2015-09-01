// api

"use strict";

var Promise = require('bluebird');
var db      = require('../db');
var feeds   = require('../feeds');
var log     = require('../utils/log')('../import.log');
var Buffer  = require('../utils/buffer');

var api = {
  
  // import reviews from all feeds
  
  importAllFeeds: function() {
    
    log.info('Starting import of all feeds');
    
    return db.Feed.findAll({active: 1})
      .then(function gotFeeds(feeds) {
        return Promise.map(feeds.models, function eachFeed(feed) {
          return api.importFeed(feed.id);
        })
        .then(function logResults(result){
          var totals = result.reduce(function(a, b){
            return {
              artists: a.artists + b.artists,
              albums:  a.albums  + b.albums,
              reviews: a.reviews + b.reviews
            };
          }); 
          log.info(
            'Finished import; created %s artists, %s albums, %s reviews',
            totals.artists, totals.albums, totals.reviews
          );
        });
      });
  },
  
  // import reviews from a given feed
  
  importFeed: function(feedId) {
    
    var counts   = { artists: 0, albums: 0, reviews: 0 };
    
    return db.Feed.findById(feedId).then(function gotFeed(feed) {

      var feedName = feed.get('slug');      
      var msgs     = new Buffer();
      
      msgs.add(['Importing reviews from feed', feedName]);
  
      return feeds.fetch(feedName).then(function gotReviews(reviews){

        msgs.add(['Found %s reviews', reviews.length]);

        return Promise.map(reviews, function eachReview(data){
          
          return db.findOrCreateArtist(data.artist)
            .then(function gotArtist(artist){  
              if (artist._isNew) {
                msgs.add(['+++ Added artist', artist.get('slug')]);
                counts.artists++;
              }
            
              return db.findOrCreateAlbum(data.album, artist.id)
                .then(function gotAlbum(album){
                  if (album._isNew) {
                    msgs.add([
                      '+++ Added album %s by %s', 
                      album.get('slug'), artist.get('slug')
                    ]);
                    counts.albums++;
                  }
                  
                  return db.findOrCreateReview(data.url, data.content, album.id, feedId)
                    .then(function gotReview(review){
                      if (review._isNew) {
                        msgs.add([
                          '+++ Added review %s of %s by %s', 
                          review.get('url'), album.get('slug'), artist.get('slug')
                        ]);  
                        counts.reviews++;
                      }
                    });
                });
            });          
        });
      })
      .then(function logCounts(){

        msgs.add([
          'Feed %s; created %s artists, %s albums, %s reviews', 
          feedName, counts.artists, counts.albums, counts.reviews
        ])
        .flush(log.info);

      });
    })
    .then(function returnCounts(){

      return Promise.resolve(counts);    

    });
  },
  
  // disconnect
  
  done: function() {
    return db.done();
  }
};

module.exports = api;
