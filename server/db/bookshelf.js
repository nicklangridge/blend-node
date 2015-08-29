// bookshelf base file - all models are based off this

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
    return this.fetch(_.extend(options)).then(function(found){
      return found ? Promise.resolve(found) : cloned.save();
    });
  },

  setSlug: function(options) {
    this.set('slug', createSlug(this.get('name')));
  }
  
});


module.exports = bookshelf;