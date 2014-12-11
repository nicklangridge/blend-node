var db = require('../lib/db.js');

db.populateFeeds()
  .then(db.done);