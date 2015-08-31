// bookshelf base file - all models are based off this

"use strict";
var _          = require('lodash');
var Promise    = require('bluebird');
//var moment     = require('moment');
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
  
  // class helper methods
  
  findById: function(id) {
    return this.forge({id: id}).fetch({require: true});
  },
  
  findAll: function(data) {
    return this.forge(data).fetchAll();
  }

});

// instance helper methods

bookshelf.Model.prototype = _.extend(bookshelf.Model.prototype, {

  creating: function() {
    // create slug on insert (where applicable)
    if (this.has('name')) this.setSlug();
  },

  findOrCreate: function(options) {
    var cloned = this.clone();
    return this.fetch(options).then(function(found){
      if (found) { 
        return Promise.resolve(found);
      } else {
        cloned._isNew = true;
        return cloned.save();
      }
    });
  },

  setSlug: function() {
    this.set('slug', createSlug(this.get('name')));
  }
  
});


module.exports = bookshelf;