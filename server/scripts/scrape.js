var db            = require('../lib/db.js');
var feeds         = require('../lib/feeds.js');

db.Feed.getActive().then(function(feeds){
  feeds.forEach(function(feed){
    return feeds.fetch(feed.method).each(function(review){
        console.log(feed.method, feed.feed_id, review);
        return db.Review.add(feed.feed_id, r.artist, r.album, r.url, r.content);
      });
  });
})
.then(db.done)
.catch(db.error);