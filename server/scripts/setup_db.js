'use strict';

var db = require('../db');

db.knex.migrate.latest()
  .then(function seed(){ 
    return db.knex.seed.run() 
  })
  .then(db.done)
  .catch(function(e){ 
    console.log('Error:', e);
    db.done();
  });