var bookshelf  = require('../bookshelf');

var Artist = bookshelf.Model.extend({
    
  tableName: 'artist',
  hasTimestamps: true,

});

module.exports = {
  Artist: bookshelf.model('Artist', Artist)
};



