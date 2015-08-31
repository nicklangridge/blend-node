"use strict";

var cheerio = require('cheerio');
var feed    = require('./feed.js')('http://www.clashmusic.com/feed/reviews');

feed.expandReview = function(r) {
  var $ = cheerio.load(r.content);
  r.content = $('.field-name-field-article-subtitle').text();
  return r;
}

module.exports = feed;