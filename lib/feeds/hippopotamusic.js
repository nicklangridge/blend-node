var Feed = require('./feed.js');

module.exports = {
  hippopotamusic: function() {
    var feed = new Feed();
    return feed.fetch('http://hippopotamusic.com/feed');
  }
};
