var db = require('../lib/db.js');

db.populateFeedsTable()
  .then(db.done)
  .catch(db.error);