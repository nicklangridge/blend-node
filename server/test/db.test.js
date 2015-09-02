"use strict";

process.env.NODE_ENV = 'test'

var Promise = require('bluebird');
var test    = require('tape');

function setup(x){
  console.log('setup', x);
  // return db.knex.migrate.latest().then(function() {
 	// 	return db.knex.seed.run();
 	// });
 	return Promise.resolve();
}

function teardown(){
  console.log('teardown');
  // return db.knex.migrate.rollback();
  return Promise.resolve();
}

test("t1", function(t){
  setup(1).then(function t1(){
      
      t.equal(1, 1, '1 is 1');
      t.equal(2, 2, '2 is 2');
      t.end();
      
  }).then(teardown);
});

test("t2", function(t){
  setup(2).then(function t2(){
      
      t.equal(1, 1, '1 is 1');
      t.equal(2, 2, '2 is 2');
      t.end();
  
  }).then(teardown);
});