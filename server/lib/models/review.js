var Promise    = require('bluebird');
var base       = require('./base'); 

var Review = base.Model.extend({
    
  tableName: 'review',
  
}, {
  
  findOrCreate: function(data) {
    var model = this.forge(data);
    return model.fetch().then(function(fetched){
      return fetched ? Promise.resolve(fetched) : model.save();
    });
  }

});

module.exports = {
  Review: base.model('Review', Review)
};



