var _        = require('lodash');
var trim     = require('trim');
var feedRead = require('feed-read');

var Feed = {
  fetch: function(url, cb) {
    var self = this;
    this.parseFeed(url, function(reviews) {
      reviews = reviews.map(self.parseReview, self);
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
          url:     trim(article.link)
          //content: trim(article.content)
        }
      });
      cb(reviews);
    });
  },

  parseReview: function(review) {
    _.assign(review, this.extractArtistAlbum(review.title))
    delete review.title;
    return review;
  },

  extractArtistAlbum: function(title) {
    title.replace(/\s+/g, ' ');
    var m = title.match(/(.+?)\s+(?:\x{2013}|\x{2014}|-)\s+(.+)/);
    return m ? { artist: m[1], album: m[2] } : {};
  },
  
  wantReview: function(review) {
    return (!review.artist || review.artist.match(/^various artists/i) || !review.album) ? 0 : 1;
  },

  expandReview: function(review) {
    // stub for override
    return review;
  }
};

module.exports = {

  //---------------------------------------------------------------------------
  // TapeFear
  //---------------------------------------------------------------------------

  tape_fear: function(cb) {
    var feed = _.clone(Feed, true);
    feed.fetch('http://feeds.feedburner.com/TapeFear', cb);
  },

  //---------------------------------------------------------------------------
  // Pitchfork
  //---------------------------------------------------------------------------

  pitchfork: function(cb) {
    var feed = _.assign(_.clone(Feed, true), {
      extractArtistAlbum: function(title) {
        title.replace(/\s+/g, ' ');
        var m = title.match(/(.+?)\s*\:\s+(.+)/);
        return m ? { artist: m[1], album: m[2] } : {};
      }
    });
    feed.fetch('http://feeds2.feedburner.com/PitchforkAlbumReviews', cb);
  }

};