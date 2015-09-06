// this is the interface to the database 

"use strict";

var _    = require('lodash');
var knex = require('./knex');

// set up the models

var db = _.assign({}, 
  require('./models/album.js'),
  require('./models/artist.js'),
  require('./models/feed.js'),
  require('./models/review.js')
);

// add some helper methods

db = _.extend(db, {
  
  findOrCreateArtist: function(name) {
    return db.Artist.forge({name: name}).findOrCreate();
  },
  
  findOrCreateAlbum: function(artist_id, name) {
    return db.Album.forge({artist_id: artist_id, name: name}).findOrCreate();
  },
  
  findOrCreateReview: function(album_id, feed_id, url, text) {
    return db.Review.forge({album_id: album_id, feed_id: feed_id})
      .findOrCreate()
      .then(function(review){
        return review.set('url', url)
                     .set('text', text)
                     .save(); 
      });    
  },
  
  done: function() {
    return knex.destroy(); // shutdown knex pooling and disconnect
  },
  
  knex: knex
});

module.exports = db;
