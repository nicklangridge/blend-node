var test  = require('tape');
 
test('createSlug', function(t){
  var createSlug = require("../utils/createSlug.js");
  var source     = ' I (l0vè) tests  -- Yåy!!  ';
  var slug       = 'i-l0ve-tests-yay';
  
  t.plan(2);
  t.equal(createSlug(source), slug, 'creates a valid slug');
  t.equal(createSlug(slug), slug,  'does not modify a valid slug');
});
