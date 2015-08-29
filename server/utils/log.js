// general purpose logger

var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    
    new winston.transports.Console({
      prettyPrint: true, 
      colorize:    true
    }),
    
    new winston.transports.File({
      filename:  '../server.log',
      timestamp: true,  
      json:      false
    })

  ]
});

module.exports = logger;