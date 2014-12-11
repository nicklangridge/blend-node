var Promise       = require('bluebird');
var db            = require('../lib/db.js');
var feeds         = require('../lib/feeds.js');

db.getActiveFeeds()
  .each(function processFeed(feed) {
    var feedId     = feed.get('feed_id');
    var feedMethod = feed.get('method');
    return feeds.fetch(feedMethod)
      .each(function addReview(r){
        console.log(feedMethod, feedId, r);
        return db.addReview(feedId, r.artist, r.album, r.url, r.content);
      });
  })
  .then(db.done)
  .catch(db.error);


db.Feed.getActive().then(function(feeds){
  return Promise.all(feeds.toJSON().map(function(feed){
    return feeds.fetch(feed.method).each(function(review){
        console.log(feed.method, feed.feed_id, review);
        return db.Review.add(feed.feed_id, r.artist, r.album, r.url, r.content);
      });
  });
})