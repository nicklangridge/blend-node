var base = require('./base'); 

var Feed = base.Model.extend({
    
  tableName: 'feed'

}, {

  getActive: function() {
    return Feed.forge({active: 1}).fetchAll();
  }

});

module.exports = {
  Feed: base.model('Feed', Feed)
};



