// bookshelf base file - all models are based off this

var _          = require('lodash');
var knex       = require('./knex');
var bookshelf  = require('bookshelf')(knex);
var createSlug = require('../utils/createSlug');

bookshelf.plugin('registry');

bookshelf.Model = bookshelf.Model.extend({
  
  initialize: function() {
    // default event handlers
    this.on('creating', this.creating, this);
  }
  
}, {  
  
  // class-level helper methods for all models
  
  creating: function() {
    // create slug on insert (where applicable)
    if (this.has('name')) this.setSlug();
  },
  
  findById: function(id) {
    return this.forge({id: id}).fetch({require: true});
  },
  
  findAll: function(data) {
    return this.forge(data).fetchAll();
  },
  
  findOrCreate: function(options) {
    var cloned = this.clone();
    return this.fetch(_.extend(options, {require: true})).then(null, function() {
       return cloned.save();
    });
  },

  setSlug: function() {
    this.set('slug', createSlug(this.get('name')));
  }

});

module.exports = bookshelf;