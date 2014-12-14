var feeds  = require("../lib/feeds");

var feedName = process.argv[2] || 'tapefear';

feeds.fetch(feedName).then(function(reviews){ console.log(reviews) });