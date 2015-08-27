var _ = require('lodash');

module.exports = _.assign({}, 
  require('./album.js'),
  require('./artist.js'),
  require('./feed.js'),
  require('./review.js')
);