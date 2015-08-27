var bookshelf  = require('../db/bookshelf');

var Feed = bookshelf.Model.extend({
    
  tableName: 'feed'

}, {

  getActive: function() {
    return Feed.forge({active: 1}).fetchAll();
  }

});

module.exports = {
  Feed: bookshelf.model('Feed', Feed)
};



