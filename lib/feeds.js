var cheerio = require('cheerio'); 
var Feed    = require('./feed.js');

var feeds = module.exports = {};

//---------------------------------------------------------------------------
// Audiocred
//---------------------------------------------------------------------------

feeds.audiocred = function(cb) {
  var feed = new Feed();
  feed.extractArtistAlbum = function(title) {
    title = title.replace(/[“”‘’\u0201c\u0201c]/g, '');
    var m = title.match(/(.+?)\s+(?:\u02013|\u02014|-|–)\s+(.+)\s+Album Review/i);
    if (m && m[2].match(/self[ -]*titled/i)) m[2] = m[1];
    return m ? { artist: m[1], album: m[2] } : {};
  }
  feed.fetch('http://feeds.feedburner.com/Audiocred', cb);
}

//---------------------------------------------------------------------------
// Clash
//---------------------------------------------------------------------------

feeds.clash = function(cb) {
  var feed = new Feed();
  feed.expandReview = function(r) {
    var $ = cheerio.load(r.content);
    r.content = $('.field-name-field-article-subtitle').text();
    return r;
  }
  feed.fetch('http://www.clashmusic.com/feed/reviews', cb);
}

//---------------------------------------------------------------------------
// Hippopotamusic
//---------------------------------------------------------------------------

feeds.hippopotamusic = function(cb) {
  var feed = new Feed();
  feed.fetch('http://hippopotamusic.com/feed', cb);
}

//---------------------------------------------------------------------------
// Insound
//---------------------------------------------------------------------------

/*
Feeds.insound = function(cb) {
  var feed = new Feed();
  feed.parseFeed = function() {

  }
  feed.fetch('http://www.insound.com/new-releases/cds', cb);
}
*/

//---------------------------------------------------------------------------
// TapeFear
//---------------------------------------------------------------------------

feeds.tapefear = function(cb) {
  var feed = new Feed();
  feed.fetch('http://feeds.feedburner.com/TapeFear', cb);
}

//---------------------------------------------------------------------------
// Pitchfork
//---------------------------------------------------------------------------

feeds.pitchfork = function(cb) {
  var feed = new Feed();
  feed.extractArtistAlbum = function(title) {
    var m = title.match(/(.+?)\s*\:\s+(.+)/);
    return m ? { artist: m[1], album: m[2] } : {};
  }
  feed.fetch('http://feeds2.feedburner.com/PitchforkAlbumReviews', cb);
}
