"use strict";

var bookshelf = require('../bookshelf');

var Feed = bookshelf.Model.extend({
  
  tableName: 'feed'
  
});

module.exports = {
  Feed: bookshelf.model('Feed', Feed)
};



