var bookshelf  = require('../bookshelf'); 

var Album = bookshelf.Model.extend({
    
  tableName: 'album',
  hasTimestamps: true
  
});

module.exports = {
  Album: bookshelf.model('Album', Album)
};



