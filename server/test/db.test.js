'use strict';

process.env.NODE_ENV = 'test'

var Promise = require('bluebird');
var test    = require('blue-tape');
var db      = require('../db');
var after   = test;

function setup(){
  return db.knex.migrate.latest().then(function() {
 	 	return db.knex.seed.run();
 	});
}

function teardown(){
  return db.knex.migrate.rollback();
}

function dbTest(name, func){
  test(name, function wrapTest(t){
    return setup().then(function run(){ return func(t) }).then(teardown);
  });
}

dbTest('t1', function t1(t){
  t.equal(1, 1, '1 is 1');
  t.equal(2, 2, '2 is 2');
});

dbTest('t2', function t2(t){  
  t.equal(1, 1, '1 is 1');
  t.equal(2, 2, '2 is 2');
});

after('done', function done(t){
  return db.done();
});