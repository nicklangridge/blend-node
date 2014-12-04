var db = require('./db');

module.exports = function(feedId, reviews) {

  reviews.forEach(function createArtist(review) {

    db.findOrCreateArtist({ name: review.artist })
      .then(function createAlbum(artist){
        return db.findOrCreateAlbum({ 
          name: review.album, 
          artist_id: artist.artist_id 
        });
      })
      .then(function createReview(album){
        return db.findOrCreateReview({
          album_id: album.album_id,
          feed_id:  feedId,
          url:      review.url,
          text:     review.content
        });
      })
      .catch(function(error){
        console.log('Error adding review:', review, error);
      });
      
  });

};