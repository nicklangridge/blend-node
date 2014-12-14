var assert = require('chai').assert
var feeds  = require("../lib/feeds");

function isValidReview(r) {
  return ( r.artist  && r.artist.length  > 0 &&
           r.album   && r.album.length   > 0 &&
           r.content && r.content.length > 0 &&
           r.url     && r.url.length     > 0 ); 
}
 
describe("Feeds", function(){
  this.timeout(30000);

  it('is an object', function(){
    assert.isObject(feeds);
  });
  
  var list = feeds.list();

  it('has a list of feeds', function(){
    assert.isArray(list) && assert.ok(list.length > 0);
  });

  list.forEach(function(feedName) {
    describe(feedName, function(){
      it('fetches valid reviews', function(done){
        feeds.fetch(feedName).then(function(reviews){
          if (!reviews.length > 0) throw(new Error('no reviews'));
          reviews.forEach(function(review){
            if (!isValidReview(review)) throw(new Error('invalid review'));
          });
          done();
        });
      });
    });
  });

});