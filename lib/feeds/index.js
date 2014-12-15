var _ = require('lodash');

module.exports = {
  
  methods: _.assign({}, 
    require('./audiocred.js'),
    require('./clash.js'),
    require('./hippopotamusic.js'),
    require('./pitchfork.js'),
    require('./tapefear.js')
  ),
  
  fetch: function(method) {
    return this.methods[method]();
  }, 

  list: function() {
    return Object.getOwnPropertyNames(this.methods).sort();
  }

};