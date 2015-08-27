var Promise    = require('bluebird');
var bookshelf  = require('../db/bookshelf'); 
var createSlug = require('../utils/createSlug'); 

var Album = bookshelf.Model.extend({
    
  tableName: 'album',
  
}, {
  
  findOrCreate: function(data) {
    data.slug = createSlug(data.name);
    var model = this.forge(data);
    return model.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : model.save();
    });
  }

});

module.exports = {
  Album: bookshelf.model('Album', Album)
};



