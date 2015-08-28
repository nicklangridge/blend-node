// this is the interface to the review feeds on the web

var _ = require('lodash');

module.exports = {
  
  feeds: {
    audiocred:      require('./audiocred.js'),
    clash:          require('./clash.js'),
    hippopotamusic: require('./hippopotamusic.js'),
    pitchfork:      require('./pitchfork.js'),
    tapefear:       require('./tapefear.js')
  },
  
  fetch: function(name) {
    return this.feeds[name].fetch();
  }, 

  list: function() {
    return Object.getOwnPropertyNames(this.feeds).sort();
  }

};