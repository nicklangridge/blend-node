var assert = require('chai').assert
var feeds  = require("../lib/feeds.js");

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

  var methods = Object.getOwnPropertyNames(feeds).sort();
  it('has methods', function(){
    assert.ok(methods.length > 0);
  });
  
  methods.forEach(function(method){
    describe(method,function(){
      it('fetches valid reviews', function(done){
        feeds[method](function(reviews){
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