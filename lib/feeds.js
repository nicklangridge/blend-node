var cheerio = require('cheerio'); 
var Feed    = require('./feed.js');

var methods = {
  
  //---------------------------------------------------------------------------
  // Audiocred
  //---------------------------------------------------------------------------

  audiocred: function() {
    var feed = new Feed();
    feed.extractArtistAlbum = function(title) {
      title = title.replace(/[“”‘’\u0201c\u0201c]/g, '');
      var m = title.match(/(.+?)\s+(?:\u02013|\u02014|-|–)\s+(.+)\s+Album Review/i);
      if (m && m[2].match(/self[ -]*titled/i)) m[2] = m[1];
      return m ? { artist: m[1], album: m[2] } : {};
    }
    return feed.fetch('http://feeds.feedburner.com/Audiocred');
  },

  //---------------------------------------------------------------------------
  // Clash
  //---------------------------------------------------------------------------

  clash: function() {
    var feed = new Feed();
    feed.expandReview = function(r) {
      var $ = cheerio.load(r.content);
      r.content = $('.field-name-field-article-subtitle').text();
      return r;
    }
    return feed.fetch('http://www.clashmusic.com/feed/reviews');
  },

  //---------------------------------------------------------------------------
  // Hippopotamusic
  //---------------------------------------------------------------------------

  hippopotamusic: function() {
    var feed = new Feed();
    return feed.fetch('http://hippopotamusic.com/feed');
  },

  //---------------------------------------------------------------------------
  // TapeFear
  //---------------------------------------------------------------------------

  tapefear: function() {
    var feed = new Feed();
    return feed.fetch('http://feeds.feedburner.com/TapeFear');
  },

  //---------------------------------------------------------------------------
  // Pitchfork
  //---------------------------------------------------------------------------

  pitchfork: function() {
    var feed = new Feed();
    feed.extractArtistAlbum = function(title) {
      var m = title.match(/(.+?)\s*\:\s+(.+)/);
      return m ? { artist: m[1], album: m[2] } : {};
    }
    return feed.fetch('http://feeds2.feedburner.com/PitchforkAlbumReviews');
  }
}

//---------------------------------------------------------------------------
// Export
//---------------------------------------------------------------------------

var feeds = {
  
  methods: methods,
  
  fetch: function(method) {
    return this.methods[method]();
  }, 

  list: function() {
    return Object.getOwnPropertyNames(this.methods).sort();
  }
}

module.exports = feeds;