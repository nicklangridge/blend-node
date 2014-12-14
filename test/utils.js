var assert = require('chai').assert
 
describe("Utils", function(){
 
  describe('createSlug', function(){
    var createSlug = require("../lib/utils/createSlug.js");
    var source     = ' I (l0vè) tests  -- Yåy!!  ';
    var slug       = 'i-l0ve-tests-yay';

    it('creates a valid slug', function(){
      assert.equal(createSlug(source), slug);
    });
    
    it('does not modify a valid slug', function(){
      assert.equal(createSlug(slug), slug);
    });
  });

});