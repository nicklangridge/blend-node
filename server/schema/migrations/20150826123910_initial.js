'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    
    knex.schema.createTable('album', function(t) {
      t.increments('album_id').primary();
      t.string('slug').notNull().unique();
      t.string('name').notNull();
      t.integer('artist_id').notNull();
      t.string('spotify_url').notNull();
      t.string('spotfiy_cover_url').nullable();
      t.dateTime('created').notNull();
      t.dateTime('crawled').notNull();
    }),
    
    knex.schema.createTable('album_region', function(t) {
      t.integer('album_id').notNull();
      t.string('region', 9).notNull();
      t.enu('status', ['active', 'inactive']).notNull().defaultTo('active');
      t.dateTime('created').notNull();
      t.unique(['album_id', 'region']);
    }),
    
    knex.schema.createTable('album_review', function(t) {
      t.increments('review_id').primary();
      t.integer('album_id').notNull();
      t.integer('feed_id').notNull();
      t.string('url').notNull();
      t.string('text').notNull();
      t.dateTime('created').notNull();
      t.dateTime('active').notNull();
    }),    
    
    knex.schema.createTable('album_tag', function(t) {
      t.integer('album_id').notNull();
      t.string('tag', 40).notNull();
      t.unique(['album_id', 'tag']);
    }),
    
    knex.schema.createTable('artist', function(t) {
      t.increments('artist_id').primary();
      t.string('slug').notNull().unique();
      t.string('name').notNull();
      t.string('bio').notNull();
      t.string('bio_url').notNull();
      t.string('bio_site', 40).notNull();
      t.string('spotify_url').nullable();
      t.dateTime('created').notNull();
      t.dateTime('crawled').notNull();
    }),

    knex.schema.createTable('feed', function(t) {
      t.integer('feed_id').notNull();
      t.string('slug').notNull().unique();
      t.string('name').notNull();
      t.string('homepage_url').notNull();
      t.boolean('active').notNull();
      t.boolean('public').notNull();
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('album'),
    knex.schema.dropTable('album_region'),
    knex.schema.dropTable('album_review'),
    knex.schema.dropTable('album_tag'),
    knex.schema.dropTable('artist'),
    knex.schema.dropTable('feed')
  ]);
};
