var test  = require('tape');
var _     = require('lodash');
var feeds = require("../feeds");

function isValidReview(r) {
  return ( r.artist  && r.artist.length  > 0 &&
           r.album   && r.album.length   > 0 &&
           r.content && r.content.length > 0 &&
           r.url     && r.url.length     > 0 ); 
}
 
test("Feeds", function(t){

  t.equal(typeof feeds, 'object', 'is an object');

  var list = feeds.list();
  t.equal(typeof list, 'object', 'has list object');
  t.ok(list.length > 0, 'list is populated');

  list.forEach(function(feedName) {
    t.test(feedName, function(st){
      st.plan(2);
      feeds.fetch(feedName).then(function(reviews){
        st.ok(reviews.length > 0, 'fetches reviews');
        var valid = _.filter(reviews, function(review) { return isValidReview(review) });
        st.equal(valid.length, reviews.length, 'all reviews are valid');
      });
    });
  });

  t.end();
});