var db = require('../lib/db.js');

db.execSql('feeds_data').then(db.done);