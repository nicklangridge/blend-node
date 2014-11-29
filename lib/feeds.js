var _        = require('lodash');
var trim     = require('trim');
var feedRead = require('feed-read');

function Feed() {}
_.assign(Feed.prototype, {
  fetch: function(url, cb) {
    var self = this;
    this.parseFeed(url, function(reviews) {
      reviews = reviews.map(self.parseReview, self);
      reviews = reviews.filter(self.validReview, self);
      reviews = reviews.filter(self.wantReview, self);
      reviews = reviews.map(self.expandReview, self);
      cb(reviews);
    });
  },

  parseFeed: function(url, cb) {
    feedRead(url, function(err, articles) {
      if (err) return console.error(err);
      var reviews = articles.map(function(article) {
        return {
          title:   trim(article.title),
          url:     trim(article.link),
          content: trim(article.content)
        }
      });
      cb(reviews);
    });
  },

  parseReview: function(r) {
    _.assign(r, this.extractArtistAlbum(r.title))
    delete r.title;
    return r;
  },

  extractArtistAlbum: function(title) {
    title.replace(/\s+/g, ' ');
    var m = title.match(/(.+?)\s+(?:\x{2013}|\x{2014}|-|–)\s+(.+)/);
    return m ? { artist: m[1], album: m[2] } : {};
  },
  
  validReview: function(r) {
    return ( r.artist  && r.artist.length  > 0 &&
             r.album   && r.album.length   > 0 &&
             r.content && r.content.length > 0 &&
             r.url     && r.url.length     > 0 ); 
  },

  wantReview: function(r) {
    return !r.artist.match(/^various artists/i);
  },

  expandReview: function(r) {
    return r;
  }
});

module.exports = {

  //---------------------------------------------------------------------------
  // TapeFear
  //---------------------------------------------------------------------------

  hippopotamusic: function(cb) {
    var feed = new Feed();
    feed.fetch('http://hippopotamusic.com/feed', cb);
  },

  //---------------------------------------------------------------------------
  // TapeFear
  //---------------------------------------------------------------------------

  tape_fear: function(cb) {
    var feed = new Feed();
    feed.fetch('http://feeds.feedburner.com/TapeFear', cb);
  },

  //---------------------------------------------------------------------------
  // Pitchfork
  //---------------------------------------------------------------------------

  pitchfork: function(cb) {
    var feed = new Feed();
    feed.extractArtistAlbum = function(title) {
      title.replace(/\s+/g, ' ');
      var m = title.match(/(.+?)\s*\:\s+(.+)/);
      return m ? { artist: m[1], album: m[2] } : {};
    }
    feed.fetch('http://feeds2.feedburner.com/PitchforkAlbumReviews', cb);
  }

};