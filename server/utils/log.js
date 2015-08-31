// general purpose logger

"use strict";

var winston = require('winston');

module.exports = function(filename){

  filename = filename || '../app.log'; 
  
  var logger = new winston.Logger({transports: [
    
    new winston.transports.Console({
      prettyPrint: true, 
      colorize:    true
    }),
    
    new winston.transports.File({
      filename:  filename,
      timestamp: true,  
      json:      false
    })

  ]});
  
  return logger;
};