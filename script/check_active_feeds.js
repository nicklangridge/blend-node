var db = require("../lib/db.js");

db.getActiveFeeds().then(function(x){ console.log(x) });