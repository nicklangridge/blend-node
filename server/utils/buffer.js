// general purpose buffer

var _ = require('lodash');

function Buffer(){
  this.storage = [];
}

Buffer.prototype.add = function(value){
  this.storage.push(value);
  return this;
}

Buffer.prototype.flush = function(func, thisObj){
  _.each(this.storage, function(value){
    func.apply(thisObj, value);
  })
  return this;
}

module.exports = Buffer;