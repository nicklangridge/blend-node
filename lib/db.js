var _          = require('lodash');
var Promise    = require('bluebird');
var readFile   = Promise.promisify(require("fs").readFile);
var config     = require('../config.js');
var createSlug = require('./utils').createSlug;

var knex = knex = require('knex')({
  client: 'mysql',
  connection: config.mysql,
  debug: false
});

var bookshelf = require('bookshelf')(knex);

//-----------------------------------------------------------------------------
// Models
//-----------------------------------------------------------------------------

var models = {

  //---------------------------------------------------------------------------
  // Feed
  //---------------------------------------------------------------------------
  
  Feed: Model.extend({
    
    tableName: 'feed'
  
  }, {
  
    getActive: function() {
      return this.forge({active: 1}).fetchAll();
    }
  
  }),

  //---------------------------------------------------------------------------
  // Artist
  //---------------------------------------------------------------------------

  Artist: Model.extend({
    
    tableName: 'artist',
  
  }, {
    
    findOrCreate: function(data) {
      data.slug = createSlug(data.name);
      var model = this.forge(data);
      return model.fetch().then(function(fetched){
        return fetched ? Promise.resolve(fetched) : model.save();
      });
    }
  
  }),

  //---------------------------------------------------------------------------
  // Album
  //---------------------------------------------------------------------------

  Album: Model.extend({
    
    tableName: 'album',
  
  }, {
    
    findOrCreate: function(data) {
      data.slug = createSlug(data.name);
      var model = this.forge(data);
      return model.fetch().then(function(fetched){
        return fetched ? Promise.resolve(fetched) : model.save();
      });
    }
  
  }),

  //---------------------------------------------------------------------------
  // Review
  //---------------------------------------------------------------------------

  Review: Model.extend({
    
    tableName: 'review',
  
  }, {
    
    findOrCreate: function(data) {
      var model = this.forge(data);
      return model.fetch().then(function(fetched){
        return fetched ? Promise.resolve(fetched) : model.save();
      });
    }
  
  }),
}

//-----------------------------------------------------------------------------
// API
//-----------------------------------------------------------------------------

var db = {
  knex:      knex,
  bookshelf: bookshelf,
  models:    models,

  addReview: function(feedId, artistName, albumName, url, content) {
    return models.Artist.findOrCreate({ name: artistName })
      .then(function(artist) {
        return models.Album.findOrCreate({ 
          name:      albumName, 
          artist_id: artist.get('artist_id')
        });
      })
      .then(function(album) {
        return models.Review.findOrCreate({
          album_id: album.get('album_id'),
          feed_id:  feedId,
          url:      url,
          text:     content
        });
      });
  },

  // utility methods for build and test

  execSqlFile: function(filename) {
    return readFile(filename, 'utf8').then(function(sql){
      var commands = sql.split(';');
      return Promise.all(commands.map(function(cmd){ return knex.raw(cmd) }));
    });
  },

  createTables: function() {
    return db.execSqlFile(config.sql_files.tables);
  },

  populateFeeds: function() {
    return db.execSqlFile(config.sql_files.feeds);
  },

  done: function() {
    return knex.destroy();
  },

  error: function(error) {
    db.done();
    throw error;
  }
};

module.exports = db;



