// general purpose buffer

"use strict";

var _ = require('lodash');

function Buffer(){
  this.storage = [];
  this.debug = null;
}

Buffer.prototype.add = function(value){
  this.storage.push(value);
  if (typeof this.debug === 'function') this.debug(value);
  return this;
}

Buffer.prototype.flush = function(func, thisObj){
  this.storage.forEach(function(value){
    func.apply(thisObj, value);
  })
  return this;
}

module.exports = Buffer;