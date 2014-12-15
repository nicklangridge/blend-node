var Feed = require('./feed.js');

module.exports = {
  tapefear: function() {
    var feed = new Feed();
    return feed.fetch('http://feeds.feedburner.com/TapeFear');
  }
};
