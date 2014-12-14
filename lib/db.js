var config = require('../config.js');
var db     = require('./dbApi.js')(config); 

module.exports = db;



