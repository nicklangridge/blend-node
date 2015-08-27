var Promise    = require('bluebird');
var bookshelf  = require('../db/bookshelf');
var createSlug = require('../utils/createSlug'); 

var Artist = bookshelf.Model.extend({
    
  tableName: 'artist',
  
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
  Artist: bookshelf.model('Artist', Artist)
};



