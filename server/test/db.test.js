'use strict';

process.env.NODE_ENV = 'test';

var Promise = require('bluebird'),
    test    = require('blue-tape'),
    db      = require('../db'),
    series  = require('../utils/promiseSeries'),
    after   = test;

function setup(){
  return db.knex.migrate.latest().then(function seed(){ return db.knex.seed.run() });
}

function teardown(){
  return db.knex.migrate.rollback();
}

function dbTest(name, func){
  test(name, function wrapper(t){
    function run(){ return func(t) }
    return series(setup, run, teardown);
  });
}


dbTest('findById', function findById(t){
  return db.Feed.findById(2).then(function(feed){
    t.equal(feed.get('slug'), 'tapefear', 'fetches expected model');
  });  
});

dbTest('findAll', function findAll(t){
  return db.Feed.findAll().then(function(feeds){
    t.equal(feeds.size(), 3, 'fetches 5 models');
    'clash tapefear pitchfork'.split(' ').forEach(function(slug){
      t.ok(feeds.where({slug: slug}).length === 1, 'got ' + slug);
    });
  });
});

dbTest('findOrCreate', function findOrCreate(t){
  var testName = 'Some feed',
      testSlug = 'some-feed';
  
  function checkCreate(){
    return db.Feed.forge({name: testName}).findOrCreate().then(function(feed){
      t.equal(feed.get('name'), testName, 'got feed of expected name');
      t.equal(feed.get('slug'), testSlug, 'expected slug was generated');
      t.ok(feed._isNew, 'feed is marked as new');
    });
  }
  function checkCount(){
    return db.Feed.query().count('id AS count').then(function(total){
      t.equal(total[0].count, 4, 'count is correct');
    });
  }
  function checkFind(){
    return db.Feed.forge({name: testName}).findOrCreate().then(function(feed){
      t.equal(feed.get('name'), testName, 'got feed of expected name');
      t.ok(!feed._isNew, 'feed is not marked as new');
    });
  }    
  
  return series(checkCreate, checkCount, checkFind, checkCount);
});

dbTest('findOrCreateReview', function findOrCreate(t){
  var testAlbumId = 1, 
      testFeedId  = 2, 
      testUrl     = 'http://example.com';
    
  function checkCreate(){    
    return db.findOrCreateReview(testAlbumId, testFeedId, testUrl, 'example text').then(function(review){
      t.equal(review.get('url'), testUrl, 'got review with expected url');
      t.ok(review._isNew, 'review is marked as new');
    });
  }
  function checkCount(){
    return db.Review.query().count('id AS count').then(function(total){
      t.equal(total[0].count, 2, 'count is correct');
    });
  }
  function checkFind(){
    return db.findOrCreateReview(testAlbumId, testFeedId, testUrl, 'example text2').then(function(review){
      t.equal(review.get('text'), 'example text2', 'review text was updated');
      t.ok(!review._isNew, 'review is not marked new');
    });
  }    
  
  return series(checkCreate, checkCount, checkFind, checkCount);
});


after('done', function done(t){
  return db.done();
});