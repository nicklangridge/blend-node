var Promise    = require('bluebird');
var base       = require('./base'); 
var createSlug = require('../utils.js').createSlug; 

var Artist = base.Model.extend({
    
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
  Artist: base.model('Artist', Artist)
};



