var db = require('../lib/db.js');

var data = [ 
  { 
    feed_id: 1,
    name: 'Audiocred',
    method: 'audiocred',
    homepage_url: 'http://www.audiocred.com',
    active: 1,
    public: 1 
  },
  { 
    feed_id: 2,
    name: 'Clash',
    method: 'clash',
    homepage_url: 'http://www.clashmusic.com',
    active: 1,
    public: 1 
  },
  { 
    feed_id: 3,
    name: 'Hippopotamusic',
    method: 'hippopotamusic',
    homepage_url: 'http://www.hippopotamusic.com',
    active: 1,
    public: 1 
  },
  { 
    feed_id: 4,
    name: 'TapeFear',
    method: 'tapefear',
    homepage_url: 'http://www.tapefear.com',
    active: 1,
    public: 1 
  },
  { 
    feed_id: 5,
    name: 'Pitchfork',
    method: 'pitchfork',
    homepage_url: 'http://www.pitchfork.com',
    active: 1,
    public: 1 
  } 
];

function truncate(){
  console.log('Truncate...');
  return db.knex('feed').truncate();
}

function insert(){
  console.log('Insert...');
  return db.knex('feed').insert(data);
}

truncate()
  .then(insert)
  .then(db.done)
  .then(function(){ console.log('Done') })
  .catch(function(e){ console.log(e) });