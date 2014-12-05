var assert = require('chai').assert
var utils  = require("../lib/utils.js");

 
describe("Utils", function(){

  it('is an object', function(){
    assert.isObject(utils);
  });
  
  describe('createSlug', function(){
    var source = ' I (l0vè) tests  -- Yåy!!  ';
    var slug   = 'i-l0ve-tests-yay';

    it('creates a valid slug', function(){
      assert.equal(utils.createSlug(source), slug);
    });
    
    it('does not modify a valid slug', function(){
      assert.equal(utils.createSlug(slug), slug);
    });
  });

});