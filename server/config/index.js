// application settings

"use strict";
var path = require('path');

var config = {
  rootPath:    path.normalize(__dirname + '/..'),
  port:        parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development' 
}

module.exports = config;