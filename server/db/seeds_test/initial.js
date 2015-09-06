'use strict';

function feed(v) {
  return { id:v[0], name:v[1], homepage_url:v[2], slug:v[3], active:1, public:1 }
}

exports.seed = function(knex, Promise) {
  return Promise.join(
        
    knex('feed').del(), 
    knex('feed').insert(feed([ '1', 'Clash', 'http://www.clashmusic.com', 'clash' ])),
    knex('feed').insert(feed([ '2', 'TapeFear', 'http://www.tapefear.com', 'tapefear' ])),
    knex('feed').insert(feed([ '3', 'Pitchfork', 'http://www.pitchfork.com', 'pitchfork' ])),

    knex('artist').del(), 
    knex('artist').insert({ id: 1, name: 'Odd Nosdam', slug: 'odd-nosdam' }),

    knex('album').del(), 
    knex('album').insert({ id: 1, name: 'T.I.M.E. Soundtrack', slug: 't-i-m-e-soundtrack' }),
    
    knex('review').del(), 
    knex('review').insert({ id: 1, album_id: 1, feed_id: 1, url: 'http://blah.com', text: 'great!' })
    
  );
};