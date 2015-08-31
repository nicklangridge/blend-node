"use strict";

var feed = require('./feed.js')('http://feeds2.feedburner.com/PitchforkAlbumReviews');

feed.extractArtistAlbum = function(title) {
  var m = title.match(/(.+?)\s*\:\s+(.+)/);
  return m ? { artist: m[1], album: m[2] } : {};
}

module.exports = feed;
