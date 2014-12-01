var db = require('./db.js');

function print(collection) {
  collection.forEach(function(model) {
    console.log(model.get('name'));
  });
}

db.feeds.fetchActive()
  .then(print)
  .then(db.disconnect)
  .catch(function(e){ console.log(e) });