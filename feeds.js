var extend   = require('util')._extend;
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
          url:     trim(article.link),
          content: trim(article.content)
        }
      });
      cb(reviews);
    });
  },

  parseReview: function(review) {
    var t = this.parseTitle(review.title);
    review.artist = trim(t[0]);
    review.album  = trim(t[1]);
    delete review.title;
    return review;
  },

  parseTitle: function(title) {
    title.replace(/\s+/g, ' ');
    return title.match(/(.+?)\s+(?:\x{2013}|\x{2014}|-)\s+(.+)/).slice(1,3);
  },
  
  wantReview: function(review) {
    return (!review.artist || review.artist.match(/^various artists/i) || !review.album) ? 0 : 1;
  },

  expandReview: function(review) {
    // stub for override
    return review;
  }
};

var feeds = {

  //---------------------------------------------------------------------------
  // TapeFear
  //---------------------------------------------------------------------------

  tape_fear: function(cb) {
    Feed.fetch('http://feeds.feedburner.com/TapeFear', cb);
  },

  //---------------------------------------------------------------------------
  // Pitchfork
  //---------------------------------------------------------------------------

  pitchfork: function(cb) {
    var feed = extend(Feed, {
      parseTitle: function(title) {
        title.replace(/\s+/g, ' ');
        return title.match(/(.+?)\s*\:\s+(.+)/);
      }
    });
    feed.fetch('http://feeds2.feedburner.com/PitchforkAlbumReviews', cb);
  }

};

feeds.tape_fear(function(reviews){
  console.log(reviews);
});
