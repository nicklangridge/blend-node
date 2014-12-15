var cheerio = require('cheerio');
var Feed    = require('./feed.js');

module.exports = {
  clash: function() {
    var feed = new Feed();
    feed.expandReview = function(r) {
      var $ = cheerio.load(r.content);
      r.content = $('.field-name-field-article-subtitle').text();
      return r;
    }
    return feed.fetch('http://www.clashmusic.com/feed/reviews');
  }
};
