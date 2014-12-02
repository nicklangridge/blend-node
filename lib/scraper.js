var Promise = require('bluebird');
var db      = require('./db.js');
var feeds   = require('./feeds.js');

function process(collection) {
  collection.forEach(function(feed) {
    var name = feed.get('method');
    feeds.fetch(name).then(function(reviews){
      console.log(name, reviews.length);
    });
  });
}

db.feeds.fetchActive()
  .then(process)
  .then(db.disconnect)
  .catch(function(e){ console.log(e) });