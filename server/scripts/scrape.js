var api = require('../api');

api.getFeeds().then(function(feeds){
  feeds.forEach(function(feed){
    api.processFeed(feed, function(review){
        console.log(feed, review);
        api.addReview(feed.feed_id, review);
    });
  });
})
.then(db.done)
.catch(db.error);