'use strict';

process.env.NODE_ENV = 'test';

var Promise = require('bluebird'),
    test    = require('blue-tape'),
    db      = require('../db'),
    after   = test;

function setup(){
  return db.knex.migrate.latest().then(function seed(){ return db.knex.seed.run() });
}

function teardown(){
  return db.knex.migrate.rollback();
}

function dbTest(name, func){
  test(name, function wrapper(t){
    return setup().then(function runTest(){ return func(t) }).then(teardown);
  });
}


dbTest('findById', function findById(t){
  return db.Feed.findById(2).then(function(feed){
    t.equal(feed.get('slug'), 'clash', 'fetches expected model');
  });  
});

dbTest('findAll', function findAll(t){
  return db.Feed.findAll().then(function(feeds){
    t.equal(feeds.size(), 5, 'fetches 5 models');
    'audiocred clash hippopotamusic tapefear pitchfork'.split(' ').forEach(function(slug){
      t.ok(feeds.where({slug: slug}).length === 1, 'got ' + slug);
    });
  });
});

dbTest('findOrCreate', function findOrCreate(t){
  var testName = 'Some feed',
      testSlug = 'some-feed';
      
  return Promise.resolve()
    .then(function checkCreate(){
      return db.Feed.forge({name: testName}).findOrCreate().then(function(feed){
        t.equal(feed.get('name'), testName, 'got feed of expected name');
        t.equal(feed.get('slug'), testSlug, 'expected slug was generated');
        t.ok(feed._isNew, 'feed is marked as new');
      });
    })
    .then(function checkCount(){
      return db.Feed.query().count('id AS count').then(function(total){
        t.equal(total[0].count, 6, 'count confirms 1 feed created');
      });
    })
    .then(function checkFind(){
      return db.Feed.forge({name: testName}).findOrCreate().then(function(feed){
        t.equal(feed.get('name'), testName, 'got feed of expected name');
        t.ok(!feed._isNew, 'feed is not marked as new');
      });
    })
    .then(function checkCount(){
      return db.Feed.query().count('id AS count').then(function(total){
        t.equal(total[0].count, 6, 'count confirms no new feed created');
      });
    });
});



after('done', function done(t){
  return db.done();
});