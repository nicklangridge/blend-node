'use strict';

function feed(v) {
  return { feed_id:v[0], name:v[1], homepage_url:v[2], slug:v[3], active:1, public:1 }
}

exports.seed = function(knex, Promise) {
  return Promise.join(
        
    knex('feed').del(), 
    knex('feed').insert(feed([ '1', 'Audiocred', 'http://www.audiocred.com', 'audiocred' ])),
    knex('feed').insert(feed([ '2', 'Clash', 'http://www.clashmusic.com', 'clash' ])),
    knex('feed').insert(feed([ '3', 'Hippopotamusic', 'http://www.hippopotamusic.com', 'hippopotamusic' ])),
    knex('feed').insert(feed([ '4', 'TapeFear', 'http://www.tapefear.com', 'tapefear' ])),
    knex('feed').insert(feed([ '5', 'Pitchfork', 'http://www.pitchfork.com', 'pitchfork' ]))

  );
};