// run series of promises

"use strict";

var Promise = require('bluebird');

function promiseSeries(){
  var fns = Array.prototype.slice.call(arguments);
  return Promise.each(fns, function(fn){ return fn() });
}

module.exports = promiseSeries;