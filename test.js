var feeds = require('./lib/feeds.js');

feeds.tape_fear(function(reviews){
  console.log(reviews);
});

feeds.pitchfork(function(reviews){
  console.log(reviews);
});