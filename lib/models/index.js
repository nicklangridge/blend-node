var _ = require('lodash');

var files  = ['album', 'artist', 'feed', 'review'];
var models = {};

files.foreach(function(file) {
  _.assign(models, require('./' + file + '.js')) 
});

module.exports = models;