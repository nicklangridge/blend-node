var _    = require('lodash');
var knex = require('./knex');

var db = _.assign({}, 
  require('./models/album.js'),
  require('./models/artist.js'),
  require('./models/feed.js'),
  require('./models/review.js')
);

db = _.extend(db, {
  
  findOrCreateArtist: function(name) {
    return db.Artist.forge({name: name}).findOrCreate();
  },
  
  findOrCreateAlbum: function(name, artist_id) {
    return db.Album.forge({name: name, artist_id: artist_id}).findOrCreate();
  },
  
  findOrCreateReview: function(url, text, album_id, feed_id) {
    return db.Album.forge({url: url, text: text, album_id: album_id, feed_id: feed_id}).findOrCreate();
  },
  
  done: function() {
    return knex.destroy();
  }
  
});

module.exports = db;