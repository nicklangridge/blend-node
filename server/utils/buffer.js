// general purpose buffer
var _ = require('lodash');

function Buffer() {
  this.storage = [];
}

Buffer.prototype.add = function(value) {
  this.storage.push(value)
}

Buffer.prototype.flush = function(func, thisObj) {
  _.each(this.storage, function(value){
    func.apply(thisObj, value);
  })
}

module.exports = Buffer;