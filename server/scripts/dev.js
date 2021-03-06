"use strict";

var Promise = require('bluebird');
var api     = require("../api");

Promise.all([
  //api.getActiveFeeds().then(function(feeds){ console.log('FEEDS', feeds) }),
  //api.getFeed(1).then(function(feed){ console.log('FEED1', feed) }),
  //api.getFeedReviews(1).then(function(reviews){ console.log('REVIEWS1', reviews) }),
  api.importFeed(1)
  //api.importAllFeeds()
])
.then(api.done)
.catch(function(e){
  console.log('Oops', e);
  api.done();
});