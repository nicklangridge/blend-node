var Promise    = require('bluebird');
var base       = require('./base'); 
var createSlug = require('../utils.js').createSlug; 

var Album = base.Model.extend({
    
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
  Album: base.model('Album', Album)
};



