'use strict';

exports.up = function(knex, Promise) {
  return Promise.join(
    
    knex.schema.createTable('album', function(t) {
      t.increments('id').primary();
      t.string('slug').notNull().unique();
      t.string('name').notNull();
      t.integer('artist_id').notNull();
      t.string('spotify_url').notNull();
      t.string('spotfiy_cover_url').nullable();
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').notNull();
      t.dateTime('crawled_at').notNull();
    }),
    
    knex.schema.createTable('album_region', function(t) {
      t.increments('id').primary();
      t.integer('album_id').notNull();
      t.string('region', 9).notNull();
      t.enu('status', ['active', 'inactive']).notNull().defaultTo('active');
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').notNull();
      t.unique(['album_id', 'region']);
    }),
    
    knex.schema.createTable('review', function(t) {
      t.increments('id').primary();
      t.integer('album_id').notNull();
      t.integer('feed_id').notNull();
      t.string('url').notNull();
      t.string('text').notNull();
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').notNull();
      t.dateTime('active').notNull();
    }),    
    
    knex.schema.createTable('album_tag', function(t) {
      t.increments('id').primary();
      t.integer('album_id').notNull();
      t.string('tag', 40).notNull();
      t.unique(['album_id', 'tag']);
    }),
    
    knex.schema.createTable('artist', function(t) {
      t.increments('id').primary();
      t.string('slug').notNull().unique();
      t.string('name').notNull();
      t.string('bio').notNull();
      t.string('bio_url').notNull();
      t.string('bio_site', 40).notNull();
      t.string('spotify_url').nullable();
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').notNull();
      t.dateTime('crawled').notNull();
    }),

    knex.schema.createTable('feed', function(t) {
      t.integer('id').notNull();
      t.string('slug').notNull().unique();
      t.string('name').notNull();
      t.string('homepage_url').notNull();
      t.boolean('active').notNull();
      t.boolean('public').notNull();
    })

  );
};

exports.down = function(knex, Promise) {
  return Promise.join(
    knex.schema.dropTable('album'),
    knex.schema.dropTable('album_region'),
    knex.schema.dropTable('review'),
    knex.schema.dropTable('album_tag'),
    knex.schema.dropTable('artist'),
    knex.schema.dropTable('feed')
  );
};
