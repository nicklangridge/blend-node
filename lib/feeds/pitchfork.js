var Feed = require('./feed.js');

module.exports = {
  pitchfork: function() {
    var feed = new Feed();
    feed.extractArtistAlbum = function(title) {
      var m = title.match(/(.+?)\s*\:\s+(.+)/);
      return m ? { artist: m[1], album: m[2] } : {};
    }
    return feed.fetch('http://feeds2.feedburner.com/PitchforkAlbumReviews');
  }
};
