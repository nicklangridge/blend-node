var Feed = require('./feed.js');

module.exports = {
  audiocred: function() {
    var feed = new Feed();
    feed.extractArtistAlbum = function(title) {
      title = title.replace(/[“”‘’\u0201c\u0201c]/g, '');
      var m = title.match(/(.+?)\s+(?:\u02013|\u02014|-|–)\s+(.+)\s+Album Review/i);
      if (m && m[2].match(/self[ -]*titled/i)) m[2] = m[1];
      return m ? { artist: m[1], album: m[2] } : {};
    }
    return feed.fetch('http://feeds.feedburner.com/Audiocred');
  }
};
