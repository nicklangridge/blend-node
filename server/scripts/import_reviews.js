var api = require("../api");

api.importAllFeeds()
   .then(api.done)
   .catch(function(e){
     console.log('Oops', e);
     api.done();
   });