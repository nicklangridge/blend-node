var _        = require('lodash');
var trim     = require('trim');
var Promise  = require('bluebird');
var feedRead = Promise.promisify(require('feed-read'));

module.exports = function(url) {

  var feed = {
    url: url,

    fetch: function() {
      return this.parseFeed().then(function(reviews) {
        return Promise.resolve(
          reviews.map    (feed.parseReview,  feed)
                 .filter (feed.validReview,  feed)
                 .filter (feed.wantReview,   feed)
                 .map    (feed.expandReview, feed)
        );
      });
    },

    parseFeed: function() {
      return feedRead(feed.url).then(function(articles) {
        var reviews = articles.map(function(article) {
          return {
            title:   trim(article.title),
            url:     trim(article.link),
            content: trim(article.content)
          }
        });
        return Promise.resolve(reviews);
      });
    },

    parseReview: function(r) {
      _.assign(r, this.extractArtistAlbum(r.title.replace(/\s+/g, ' ')));
      delete r.title;
      return r;
    },

    extractArtistAlbum: function(title) {
      var m = title.match(/(.+?)\s+(?:\u02013|\u02014|-|–)\s+(.+)/);
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
  }

  return feed;
}