var Promise    = require('bluebird');
var bookshelf  = require('../db/bookshelf');

var Review = bookshelf.Model.extend({
    
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
  Review: bookshelf.model('Review', Review)
};



