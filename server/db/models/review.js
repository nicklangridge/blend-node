var bookshelf  = require('../bookshelf');

var Review = bookshelf.Model.extend({
    
  tableName: 'review',
  hasTimestamps: true
  
});

module.exports = {
  Review: bookshelf.model('Review', Review)
};



