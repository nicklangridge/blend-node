var db = require("../lib/db");

db.getActiveFeeds()
  .then(function(x){ 
    console.log("X", x);
    db.done();
  });