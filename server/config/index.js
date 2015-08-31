// application settings

"use strict";

var config = {
  port:        parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development' 
}

module.exports = config;