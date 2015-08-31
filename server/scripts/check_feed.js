"use strict";

var feeds  = require("../feeds");

var feedName = process.argv[2] || 'tapefear';

feeds.fetch(feedName).then(function(reviews){ console.log(reviews) });